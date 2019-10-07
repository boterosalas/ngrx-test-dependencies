import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { ResponseService } from "src/app/interfaces/response";
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { RemoveSpaceService } from 'src/app/services/remove-space.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: "app-loginform",
  templateUrl: "./loginform.component.html",
  styleUrls: ["./loginform.component.scss"]
})
export class LoginformComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private loading: LoaderService,
    private removeSpace: RemoveSpaceService,
    private utils: UtilsService
  ) {}

  private subscription: Subscription = new Subscription();

  loginForm: FormGroup;
  isSubmitted = false;
  emailPattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";

  ngOnInit() {
    this.loginForm = this.fb.group({
      Username: [
        "",
        [
          Validators.required,
          Validators.pattern(this.emailPattern),
          Validators.maxLength(64)
        ]
      ],
      Password: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
      ]
    });
  }

  public forgotpass(){
    this.router.navigate(['/olvido-contrasena']);
  }

  public login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    let loginData = {
      Password: btoa(this.loginForm.value.Password),
      Username: this.loginForm.value.Username
    };

  this.loading.show();

   this.subscription = this.authService.login(loginData).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === "Success") {
          localStorage.setItem("ACCESS_TOKEN", resp.objectResponse.token);
          this.utils.hideloginForm();
          this.router.navigate(['/inicio']);
        } else {
          Swal.fire({
            title: "Login invalido",
            text: resp.userMessage,
            type: "error",
            confirmButtonText: "Aceptar",
            confirmButtonClass: 'accept-login-alert-error'
          });
        }
      },
      error => {
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          text: error.error.userMessage,
          type: "error",
          confirmButtonText: "Aceptar",
          confirmButtonClass: 'accept-forgot-alert-invalid'
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public removewhiteSpace() {
    const inputValue = this.loginForm.controls.Password.value;
    const passwordControl = this.loginForm.controls.Password;
    this.removeSpace.removeSpace(inputValue, passwordControl)
  }

  public removewhiteSpaceEmail() {
    const inputValue = this.loginForm.controls.Username.value;
    const confirmPasswordControl = this.loginForm.controls.Username;
    this.removeSpace.removeSpace(inputValue, confirmPasswordControl);
  }


}
