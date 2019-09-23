import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ForgotpasswordService } from "src/app/services/forgotpassword.service";
import { ResponseService } from "src/app/interfaces/response";
import Swal from "sweetalert2";
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

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
    private loading: LoaderService
  ) {}
  
  private subscription: Subscription = new Subscription();
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
    this.loading.show();
    let userName = this.forgotPaswordForm.controls.Username.value;
    this.subscription = this.forgot.forgotPassword(userName).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === "Success") {
          Swal.fire({
            title: "Se ha enviado un email",
            text: resp.userMessage,
            type: "success",
            confirmButtonText: "Aceptar"
          }).then(()=> {
            this.router.navigate(['/']);
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
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          // text: error.error.userMessage,
          type: "error",
          confirmButtonText: "Aceptar"
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
