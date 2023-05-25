import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {SharedModule} from 'app/shared/shared.module';
import {VideosComponent} from './videos.component';
import {Route, RouterLink, RouterModule} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {FuseCardModule} from "../../../@fuse/components/card";
import {NgOptimizedImage} from "@angular/common";
import {FuseMasonryModule} from "../../../@fuse/components/masonry";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {FuseAlertModule} from "../../../@fuse/components/alert";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {VideosService} from "./videos.service";

export const routes: Route[] = [
    {
        path: '',
        component: VideosComponent
    },
];

@NgModule({
    declarations: [
        VideosComponent,
    ],
    providers: [VideosService],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatTabsModule,
        SharedModule,
        RouterLink,
        MatListModule,
        MatCardModule,
        FuseCardModule,
        NgOptimizedImage,
        FuseMasonryModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        FuseAlertModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTableModule,
        MatProgressBarModule
    ]
})
export class VideosModule {
}
