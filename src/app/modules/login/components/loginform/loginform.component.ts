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

@Component({
  selector: "app-loginform",
  templateUrl: "./loginform.component.html",
  styleUrls: ["./loginform.component.scss"]
})
export class LoginformComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

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

    this.authService.login(loginData).subscribe(
      (resp: ResponseService) => {
        if (resp.state === "Success") {
          const token = JSON.stringify(resp);
          localStorage.setItem("ACCESS_TOKEN", token);
          Swal.fire({
            title: "Login valido",
            text: "Has ingresado correctamente",
            type: "success",
            confirmButtonText: "Aceptar"
          });
        } else {
          Swal.fire({
            title: "Login invalido",
            text: resp.userMessage,
            type: "error",
            confirmButtonText: "Aceptar"
          });
        }
        // this.router.navigateByUrl('/admin');
      },
      error => {
        Swal.fire({
          title: error.statusText,
          text: error.error.userMessage,
          type: "error",
          confirmButtonText: "Aceptar"
        });
      }
    );
  }
}
