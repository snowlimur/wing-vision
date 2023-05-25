package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

var ErrNotFound = fmt.Errorf("not found")
var ErrInactive = fmt.Errorf("inactive")
var ErrServiceUnavailable = fmt.Errorf("service unavailable")

type StreamResolver interface {
	Resolve(key string) (Stream, error)
}

type Stream struct {
	ID       int64 `json:"id"`
	ClientID int64 `json:"ownerId"`
	Active   bool  `json:"active"`
}

func NewHttpStreamResolver(url string) *HttpStreamResolver {
	return &HttpStreamResolver{
		url: url,
	}
}

type HttpStreamResolver struct {
	url string
}

func (v *HttpStreamResolver) Resolve(key string) (Stream, error) {
	// @todo throttle requests

	url := fmt.Sprintf("%s/%s", v.url, key)
	res, err := http.Get(url)
	if err != nil {
		return Stream{}, fmt.Errorf("http request %s: %w\n", url, err)
	}

	if res.StatusCode != http.StatusOK {
		switch res.StatusCode {
		case http.StatusNotFound:
			return Stream{}, ErrNotFound
		default:
			return Stream{}, fmt.Errorf("%w: status: %s", ErrServiceUnavailable, res.Status)
		}
	}

	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return Stream{}, fmt.Errorf("read body: %w", err)
	}

	if len(body) == 0 {
		return Stream{}, fmt.Errorf("empty body")
	}

	stream := Stream{}
	if err := json.Unmarshal(body, &stream); err != nil {
		return Stream{}, fmt.Errorf("unmarshal: %w", err)
	}

	if !stream.Active {
		return Stream{}, ErrInactive
	}

	return stream, nil
}
