import {Component, ElementRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {StreamsService} from "../streams.service";
import Hls from 'hls.js';

@Component({
    selector: "view-stream",
    templateUrl: "./view.component.html",
    encapsulation: ViewEncapsulation.None
})
export class ViewComponent {
    @ViewChild('videoPlayer') videoElementRef!: ElementRef;
    // declare and inherit the HTML video methods and its properties
    videoElement!: HTMLVideoElement;

    id: number;
    stream: any;

    private hls: Hls;
    private sub: Subscription;

    constructor(private route: ActivatedRoute, private streamsService: StreamsService) {

    }

    ngAfterViewInit(): void {
        // // the element could be either a wrapped DOM element or a nativeElement
        this.videoElement = this.videoElementRef?.nativeElement;

        this.sub = this.route.params.subscribe(params => {
            this.id = +params["id"];
            if (this.id < 1) {
                return;
            }

            this.streamsService.one(this.id).subscribe((stream) => {
                this.stream = stream;
                console.log(stream);

                if (Hls.isSupported()) {
                    console.log("Video streaming supported by HLSjs")

                    this.hls = new Hls();
                    this.hls.loadSource(`http://localhost:7002/live/${stream.key}.m3u8`);
                    this.hls.attachMedia(this.videoElement);
                    this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        console.log('MANIFEST_PARSED')
                        this.videoElement.play();
                    });
                }
            }, (response) => {
                console.log("err", response);
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.hls) {
            this.hls.destroy();
        }
    }
}
