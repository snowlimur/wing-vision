import {Component, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {VideosService} from "./videos.service";

@Component({
    selector: 'videos',
    templateUrl: './videos.component.html',
    styleUrls: ['./videos.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VideosComponent {
    videosDataSource: MatTableDataSource<any> = new MatTableDataSource();
    videosTableColumns: string[] = ["id", "name", "date", "duration"];

    constructor(private videoService: VideosService) {
        this.videoService.list().subscribe((videos) => {
            this.videosDataSource.data = videos;
        }, (response) => {
            console.log("err", response);
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    getRecord(video) {
        console.log('getRecord', video);
        let url = `http://localhost:8080/cdn/videos/${video.file}`;
        console.log('url', url);
        window.open(url, "_blank");
    }
}
