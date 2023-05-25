import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ErrorComponent } from "./error/error.component";
import { FuseAlertModule } from "../../@fuse/components/alert";

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FuseAlertModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
