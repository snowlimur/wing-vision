import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTabsModule } from "@angular/material/tabs";
import { SharedModule } from "app/shared/shared.module";
import { StreamsComponent } from "./streams.component";
import { Route, RouterLink, RouterModule } from "@angular/router";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { FuseCardModule } from "../../../@fuse/components/card";
import { CreateComponent } from "./create/create.component";
import { NgOptimizedImage } from "@angular/common";
import { FuseMasonryModule } from "../../../@fuse/components/masonry";
import { PushComponent } from "./create/push/push.component";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { FuseAlertModule } from "../../../@fuse/components/alert";
import { StreamsService } from "./streams.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ViewComponent } from "./view/view.component";
import { MatTableModule } from "@angular/material/table";
import { MatProgressBarModule } from "@angular/material/progress-bar";

export const routes: Route[] = [
  {
    path: "",
    component: StreamsComponent
  },
  {
    path: "create",
    component: CreateComponent,
  },
  {
    path: "create/push",
    component: PushComponent
  },
  {
    path: "view/:id",
    component: ViewComponent
  },
];

@NgModule({
  declarations: [
    StreamsComponent,
    CreateComponent,
    PushComponent,
    ViewComponent
  ],
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
  ],
  providers: [StreamsService]
})
export class StreamsModule {
}
