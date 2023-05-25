package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"net"
	"path"
	"runtime"
	"time"

	"github.com/gwuhaolin/livego/configure"
	"github.com/gwuhaolin/livego/protocol/api"
	"github.com/gwuhaolin/livego/protocol/hls"
	"github.com/gwuhaolin/livego/protocol/httpflv"
	"github.com/gwuhaolin/livego/protocol/rtmp"
	redis "github.com/redis/go-redis/v9"
	log "github.com/sirupsen/logrus"
)

const redisAddr = "redis:6379"
const streamResolverHost = "http://api:3000/api/ingester/on-publish"

func startHls() *hls.Server {
	hlsAddr := configure.Config.GetString("hls_addr")
	hlsListen, err := net.Listen("tcp", hlsAddr)
	if err != nil {
		log.Fatal(err)
	}

	hlsServer := hls.NewServer()
	go func() {
		defer func() {
			if r := recover(); r != nil {
				log.Error("HLS server panic: ", r)
			}
		}()
		log.Info("HLS listen On ", hlsAddr)
		hlsServer.Serve(hlsListen)
	}()
	return hlsServer
}

func startRtmp(stream *rtmp.RtmpStream, hlsServer *hls.Server) {
	rtmpAddr := configure.Config.GetString("rtmp_addr")
	isRtmps := configure.Config.GetBool("enable_rtmps")

	var rtmpListen net.Listener
	if isRtmps {
		certPath := configure.Config.GetString("rtmps_cert")
		keyPath := configure.Config.GetString("rtmps_key")
		cert, err := tls.LoadX509KeyPair(certPath, keyPath)
		if err != nil {
			log.Fatal(err)
		}

		rtmpListen, err = tls.Listen("tcp", rtmpAddr, &tls.Config{
			Certificates: []tls.Certificate{cert},
		})
		if err != nil {
			log.Fatal(err)
		}
	} else {
		var err error
		rtmpListen, err = net.Listen("tcp", rtmpAddr)
		if err != nil {
			log.Fatal(err)
		}
	}

	var rtmpServer *Server
	streamResolver := NewHttpStreamResolver(streamResolverHost)

	if hlsServer == nil {
		rtmpServer = NewRtmpServer(stream, nil, streamResolver)
		log.Info("HLS server disable....")
	} else {
		rtmpServer = NewRtmpServer(stream, hlsServer, streamResolver)
		log.Info("HLS server enable....")
	}

	defer func() {
		if r := recover(); r != nil {
			log.Error("RTMP server panic: ", r)
		}
	}()
	if isRtmps {
		log.Info("RTMPS Listen On ", rtmpAddr)
	} else {
		log.Info("RTMP Listen On ", rtmpAddr)
	}

	err := rtmpServer.Serve(rtmpListen)
	if err != nil {
		log.Fatal(err)
	} else {
		log.Info("RTMP server closed")
	}
}

func startHTTPFlv(stream *rtmp.RtmpStream) {
	httpflvAddr := configure.Config.GetString("httpflv_addr")

	flvListen, err := net.Listen("tcp", httpflvAddr)
	if err != nil {
		log.Fatal(err)
	}

	hdlServer := httpflv.NewServer(stream)
	go func() {
		defer func() {
			if r := recover(); r != nil {
				log.Error("HTTP-FLV server panic: ", r)
			}
		}()
		log.Info("HTTP-FLV listen On ", httpflvAddr)
		hdlServer.Serve(flvListen)
	}()
}

func startAPI(stream *rtmp.RtmpStream) {
	apiAddr := configure.Config.GetString("api_addr")
	rtmpAddr := configure.Config.GetString("rtmp_addr")

	if apiAddr != "" {
		opListen, err := net.Listen("tcp", apiAddr)
		if err != nil {
			log.Fatal(err)
		}
		opServer := api.NewServer(stream, rtmpAddr)
		go func() {
			defer func() {
				if r := recover(); r != nil {
					log.Error("HTTP-API server panic: ", r)
				}
			}()
			log.Info("HTTP-API listen On ", apiAddr)
			opServer.Serve(opListen)
		}()
	}
}

func init() {
	log.SetFormatter(&log.TextFormatter{
		FullTimestamp: true,
		CallerPrettyfier: func(f *runtime.Frame) (string, string) {
			filename := path.Base(f.File)
			return fmt.Sprintf("%s()", f.Function), fmt.Sprintf(" %s:%d", filename, f.Line)
		},
	})
}

func main() {
	defer func() {
		if r := recover(); r != nil {
			log.Error("panic: ", r)
			time.Sleep(1 * time.Second)
		}
	}()

	rdb := redis.NewClient(&redis.Options{
		Addr:     redisAddr,
		Password: "",
		DB:       0,
	})

	stream := rtmp.NewRtmpStream()
	hlsServer := startHls()

	ctx := context.Background()
	go func() {
		for {
			select {
			case <-time.After(time.Second):
				stream.GetStreams().Range(func(key, val interface{}) bool {
					if s, ok := val.(*rtmp.Stream); ok {
						value := s.GetReader().Info().Key
						streamKey := fmt.Sprintf("online:%s", value)
						err := rdb.Set(ctx, streamKey, value, time.Second).Err()
						if err != nil {
							log.Error("redis set ", streamKey)
						}
					}
					return true
				})
			}
		}
	}()

	startHTTPFlv(stream)
	//startAPI(stream)
	startRtmp(stream, hlsServer)
}
