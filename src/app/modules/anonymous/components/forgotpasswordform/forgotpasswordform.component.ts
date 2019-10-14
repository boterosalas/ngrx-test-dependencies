import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ForgotpasswordService } from "src/app/services/forgotpassword.service";
import { ResponseService } from "src/app/interfaces/response";
import Swal from "sweetalert2";
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { RemoveSpaceService } from 'src/app/services/remove-space.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: "app-forgotpasswordform",
  templateUrl: "./forgotpasswordform.component.html",
  styleUrls: ["./forgotpasswordform.component.scss"]
})
export class ForgotpasswordformComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private forgot: ForgotpasswordService,
    private loading: LoaderService,
    private removeSpace: RemoveSpaceService,
    private utils: UtilsService
  ) {}
  
  private subscription: Subscription = new Subscription();
  emailPattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
  forgotPaswordForm: FormGroup;
  text:any;

  swalOptSuccess: Object = {
      title: "Se ha enviado un email",
      text: this.text,
      confirmButtonText: "Aceptar",
      confirmButtonClass: 'accept-forgot-alert-success',
      type: "success"
  }

  swalOptError: Object = {
    title: "Ups algo salió mal",
    text: this.text,
    confirmButtonText: "Aceptar",
    confirmButtonClass: 'accept-forgot-alert-error',
    type: "error"
  }

  swalOptInvalid: Object = {
    title: this.text,
    confirmButtonText: "Aceptar",
    confirmButtonClass: 'accept-forgot-alert-invalid',
    type: "error"
  }

  ngOnInit() {
    this.forgotPaswordForm = this.fb.group({
      Username: [
        "",
        [
          Validators.required,
          Validators.pattern(this.emailPattern),
          Validators.maxLength(64)
        ]
      ]
    });
  }

  public forgotPassword() {
    this.loading.show();
    let userName = this.forgotPaswordForm.controls.Username.value;
    this.subscription = this.forgot.forgotPassword(userName).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === "Success") {
          this.swalOptSuccess = {...this.swalOptSuccess, text: resp.userMessage};
          Swal.fire(this.swalOptSuccess).then(()=> {
            this.utils.hideloginForm();
          });
        } else {
          Swal.fire(
            this.swalOptError = {...this.swalOptError, text: resp.userMessage}
          );
        }
      },
      error => {
        this.loading.hide();
        Swal.fire(
          this.swalOptInvalid = {...this.swalOptInvalid, text: error.statusText}
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public removewhiteSpaceEmailForgot() {
    const inputValue = this.forgotPaswordForm.controls.Username.value;
    const forgotControl = this.forgotPaswordForm.controls.Username;
    this.removeSpace.removeSpace(inputValue, forgotControl);
  }

}