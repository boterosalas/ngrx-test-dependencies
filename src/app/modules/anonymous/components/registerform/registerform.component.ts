import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmPasswordValidator } from "src/app/validators/confirm-password.validator";
import { RegisterUserService } from "src/app/services/register-user.service";
import Swal from "sweetalert2";
import { ResponseService } from 'src/app/interfaces/response';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: "app-registerform",
  templateUrl: "./registerform.component.html",
  styleUrls: ["./registerform.component.scss"]
})
export class RegisterformComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private registerUser: RegisterUserService,
    private router: Router,
    private loading: LoaderService,
    private utils: UtilsService
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
  passwordPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[!#/_@#$%^&+-.*)(´}{><:;¡!})])";

  

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
            Validators.maxLength(20),
            Validators.pattern(new RegExp(this.passwordPattern))
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

  /**
   * Muestra los terminos y condiciones al dar clic en el boton siguiente del registro
   */

  public nextStep() {
    this.showTerms = true;
    this.showRegisterForm = false;
    this.acceptTerms = false;
  }

  /**
   * Oculta los terminos y condiciones y muestra el registro
   */

  public backStep() {
    this.showTerms = false;
    this.showRegisterForm = true;
  }

  /**
   * Metodo para registrar un usuario
   * @params Email, FirstNames, LastNames, Identification, Cellphone. Password, IdType
   */

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
            title: "Registro válido",
            text: "Se ha registrado satisfactoriamente. Por favor, revise su correo para activar su cuenta.",
            type: "success",
            confirmButtonText: "Aceptar",
            confirmButtonClass: 'accept-register-alert-success'
          }).then(()=> {
            this.utils.hideloginForm();
          });
        } else {
          Swal.fire({
            title: "Registro inválido",
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

  /**
   * check para aceptar terminos y condiciones
   */

  public acceptTermsCheck() {
    this.acceptTerms = !this.acceptTerms;
  }

  /**
   * Metodo para listar el tipo de identificacion del usuario
   */

  public getidType() {
   this.subscription = this.registerUser.idType().subscribe(res => {
      this.idUserType = res.objectResponse;
    });
  }

  /**
   * Remueve los espacios en blanco
   */

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
