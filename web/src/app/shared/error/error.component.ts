import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
  selector: "error-snack",
  templateUrl: "./error.component.html",
  encapsulation: ViewEncapsulation.None
})
export class ErrorComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {title: string; message: string}) {
  }
}
