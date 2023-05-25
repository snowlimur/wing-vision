import {Component, ViewEncapsulation} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {StreamsService} from "./streams.service";

@Component({
    selector: 'streams',
    templateUrl: './streams.component.html',
    styleUrls: ['./streams.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class StreamsComponent {
    streams: any;

    private sub: Subscription;

    constructor(private route: ActivatedRoute, private streamsService: StreamsService) {
        this.streamsService.list().subscribe((streams) => {
            this.streams = streams;
            console.log(streams);
        }, (response) => {
            console.log("err", response);
        });
    }
}
