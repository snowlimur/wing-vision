import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { StreamsService } from "../../streams.service";
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FuseAlertType } from "../../../../../@fuse/components/alert";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorComponent } from "../../../../shared/error/error.component";

@Component({
  selector: "push-stream",
  templateUrl: "./push.component.html",
  encapsulation: ViewEncapsulation.None
})
export class PushComponent {
  @ViewChild("streamNgForm") streamNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: ""
  };
  streamForm: UntypedFormGroup;
  showAlert: boolean = false;

  constructor(
    private streamsService: StreamsService,
    private _formBuilder: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router) {
  }

  ngOnInit(): void {
    this.streamForm = this._formBuilder.group({
      name: ["", [Validators.required]]
    });
  }

  create(): void {
    console.log(this.streamForm);
    if (this.streamForm.invalid) {
      return;
    }

    this.streamForm.disable();

    this.showAlert = false;

    const data = {
      name: this.streamForm.value.name,
      type: "PUSH",
      rtmp: ""
    };

    this.streamsService.createStream(data)
      .subscribe(
        (response) => {
          console.log(response)
          this._router.navigate(['/streams/view', response.id]);
        },
        (response) => {

          // Re-enable the form
          this.streamForm.enable();

          this._snackBar.openFromComponent(ErrorComponent, {
            data: {
              title: "Error",
              message: "File!!!"
            },
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: ["error-snackbar"]
          });
        }
      );
  }
}
