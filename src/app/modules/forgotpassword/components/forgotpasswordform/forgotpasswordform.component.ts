import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ForgotpasswordService } from "src/app/services/forgotpassword.service";
import { ResponseService } from "src/app/interfaces/response";
import Swal from "sweetalert2";

@Component({
  selector: "app-forgotpasswordform",
  templateUrl: "./forgotpasswordform.component.html",
  styleUrls: ["./forgotpasswordform.component.scss"]
})
export class ForgotpasswordformComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private forgot: ForgotpasswordService
  ) {}

  emailPattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
  forgotPaswordForm: FormGroup;

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
    let userName = this.forgotPaswordForm.controls.Username.value;
    this.forgot.forgotPassword(userName).subscribe(
      (resp: ResponseService) => {
        if (resp.state === "Success") {
          Swal.fire({
            title: "Se ha enviado un email",
            text: "Revisa tu bandeja de entrada en tú correo",
            type: "success",
            confirmButtonText: "Aceptar"
          });
        } else {
          Swal.fire({
            title: "Ups algo salió mal",
            text: resp.userMessage,
            type: "error",
            confirmButtonText: "Aceptar"
          });
        }
      },
      error => {
        Swal.fire({
          title: error.statusText,
          // text: error.error.userMessage,
          type: "error",
          confirmButtonText: "Aceptar"
        });
      }
    );
  }
}
