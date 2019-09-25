import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmPasswordValidator } from "src/app/validators/confirm-password.validator";
import { RegisterUserService } from "src/app/services/register-user.service";
import Swal from "sweetalert2";
import { ResponseService } from 'src/app/interfaces/response';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: "app-registerform",
  templateUrl: "./registerform.component.html",
  styleUrls: ["./registerform.component.scss"]
})
export class RegisterformComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private registerUser: RegisterUserService,
    private router: Router,
    private loading: LoaderService
  ) {}

  private subscription: Subscription = new Subscription();
  registerForm: FormGroup;
  showTerms: boolean;
  showRegisterForm: boolean;
  showLoginForm: boolean;
  acceptTerms: boolean;
  idUserType = [];
  emailPattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
  namePattern = "[a-zA-Z0-9 ]+";
  numberPattern = "^(0|[0-9][0-9]*)$";

  

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: [
          "",
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(this.namePattern)
          ]
        ],
        lastName: [
          "",
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(this.namePattern)
          ]
        ],
        idType: ["", Validators.required],
        id: [
          "",
          [
            Validators.required,
            Validators.maxLength(11),
            Validators.pattern(this.numberPattern)
          ]
        ],
        phone: [
          "",
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(10),
            Validators.pattern(this.numberPattern)
          ]
        ],
        email: [
          "",
          [
            Validators.required,
            Validators.pattern(this.emailPattern),
            Validators.maxLength(64)
          ]
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        confirmPassword: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ]
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );
    this.showTerms = false;
    this.showRegisterForm = true;
    this.acceptTerms = false;
    this.getidType();
  }

  public nextStep() {
    this.showTerms = true;
    this.showRegisterForm = false;
    this.acceptTerms = false;
  }

  public backStep() {
    this.showTerms = false;
    this.showRegisterForm = true;
  }

  public showLogin() {
    this.router.navigate(['/']);
  }

  public register() {

    this.loading.show();

    let registerForm = {
      Email: this.registerForm.controls.email.value,
      FirstNames: this.registerForm.controls.name.value,
      LastNames: this.registerForm.controls.lastName.value,
      Identification: this.registerForm.controls.id.value,
      Cellphone: this.registerForm.controls.phone.value,
      Password: btoa(this.registerForm.controls.password.value),
      IdType: this.registerForm.controls.idType.value
    };

    this.subscription = this.registerUser.registerUser(registerForm).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === "Success") {
          Swal.fire({
            title: "Registro valido",
            text: "Te Has registrado correctamente",
            type: "success",
            confirmButtonText: "Aceptar",
            confirmButtonClass: 'accept-register-alert-success'
          }).then(()=> {
            this.showLogin();
          });
        } else {
          Swal.fire({
            title: "Registro invalido",
            text: resp.userMessage,
            type: "error",
            confirmButtonText: "Aceptar",
            confirmButtonClass: 'accept-register-alert-error'
          }).then(()=>{
            this.backStep();
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
          confirmButtonClass: 'accept-register-alert-invalid'
        }).then(()=>{
          this.backStep();
        });
      }
    );
  }

  public acceptTermsCheck() {
    this.acceptTerms = !this.acceptTerms;
  }

  public getidType() {
    this.registerUser.idType().subscribe(res => {
      this.idUserType = res.objectResponse;
    });
  }

  public removewhiteSpace() {
    const inputValue = this.registerForm.controls.password.value;
    let noSpace = inputValue.replace(/ /g, "");
    this.registerForm.controls.password.setValue(noSpace);
  }

  public removewhiteSpaceConfirm() {
    const inputValue = this.registerForm.controls.confirmPassword.value;
    let noSpace = inputValue.replace(/ /g, "");
    this.registerForm.controls.confirmPassword.setValue(noSpace);
  }

  public removewhiteSpaceEmail() {
    const inputValue = this.registerForm.controls.email.value;
    let noSpace = inputValue.replace(/ /g, "");
    this.registerForm.controls.email.setValue(noSpace);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
