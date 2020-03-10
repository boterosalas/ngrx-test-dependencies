import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmPasswordValidator } from "src/app/validators/confirm-password.validator";
import Swal from "sweetalert2";
import { ResponseService } from "src/app/interfaces/response";
import { Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { LoaderService } from "src/app/services/loader.service";
import { UtilsService } from "src/app/services/utils.service";
import { ConfirmEmailValidator } from "src/app/validators/confirm-email.validator";
import { UserService } from "src/app/services/user.service";
import { MasterDataService } from "src/app/services/master-data.service";
declare var dataLayer: any;

@Component({
  selector: "app-registerform",
  templateUrl: "./registerform.component.html",
  styleUrls: ["./registerform.component.scss"]
})
export class RegisterformComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private registerUser: UserService,
    private router: Router,
    private loading: LoaderService,
    private utils: UtilsService
  ) {}

  private subscription: Subscription = new Subscription();
  registerForm: FormGroup;
  showTerms: boolean;
  showRegisterForm: boolean;
  showLoginForm: boolean;
  acceptTerms: boolean = null;
  idUserType = [];

  emailPattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
  namePattern =
    "[a-zA-Z0-9 àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+";
  numberPattern = "^(0|[0-9][0-9]*)$";
  passwordPattern = "(?=.*[a-zA-Z])(?=.*[0-9])";
  msg: string;
  classMsg: string;

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
        confirmEmail: ["", []],
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
        ],
        acceptTerms: [null, Validators.required]
      },
      {
        validator: [
          ConfirmPasswordValidator.MatchPassword,
          ConfirmEmailValidator.MatchEmail
        ]
      }
    );
    // this.showTerms = false;
    this.showRegisterForm = true;
    // this.acceptTerms = false;
    this.getidType();
  }

  /**
   * Muestra los terminos y condiciones al dar clic en el boton siguiente del registro
   */

  // public nextStep() {
  //   let idEmployee = this.registerForm.controls.id.value;
  //   let idTypeEmployee = this.registerForm.controls.idType.value;

  //   if (idTypeEmployee === "1") {
  //     idTypeEmployee = "CC";
  //   } else {
  //     if (idTypeEmployee === "2") {
  //       idTypeEmployee = "CE";
  //     } else {
  //       idTypeEmployee = "NIT";
  //     }
  //   }

  //   this.showTerms = true;
  //   this.showRegisterForm = false;
  //   this.acceptTerms = false;
  // }

  /**
   * Oculta los terminos y condiciones y muestra el registro
   */

  // public backStep() {
  //   this.showTerms = false;
  //   this.showRegisterForm = true;
  // }

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
      IdType: this.registerForm.controls.idType.value,
      acceptHabeasData: true,
      acceptTerms: true
    };

    this.subscription = this.registerUser.registerUser(registerForm).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === "Success") {
          dataLayer.push({
            event: "pushEventGA",
            categoria: "Registro",
            accion: "ClicLateralRegistro",
            etiqueta: "RegistroExitoso"
          });

          Swal.fire({
            title: "Revisa tu correo",
            html: `
              Activa tu cuenta siguiendo el enlace </br> que enviamos a tu correo.
              `,
            confirmButtonText: "Volver al inicio",
            confirmButtonClass:
              "accept-register-alert-success gtmRegistroClicModalValidacion"
          }).then(() => {
            this.utils.hideloginForm();
          });
        } else {
          Swal.fire({
            title: "Registro inválido",
            text: resp.userMessage,
            type: "error",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "accept-register-alert-error"
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
          confirmButtonClass: "accept-register-alert-invalid"
        });
      }
    );
  }

  /**
   * check para aceptar terminos y condiciones
   */

  public acceptTermsCheck() {
    this.acceptTerms = !this.acceptTerms;
    if(this.acceptTerms === false) {
      this.registerForm.controls.acceptTerms.setValue(null);
    }
  }

  /**
   * Metodo para listar el tipo de identificacion del usuario
   */

  public getidType() {
    this.subscription = this.registerUser
      .idType()
      .subscribe((res: ResponseService) => {
        this.idUserType = res.objectResponse;
      });
  }

  /**
   * Metodo para validar la fuerza de la contraseña
   * @param event
   */

  onStrengthChanged(event) {
    this.subscription = this.registerForm.controls.password.valueChanges.subscribe(
      resp => {
        if (resp === "") {
          this.msg = "";
        }
      }
    );
    if (event <= 20) {
      this.msg = "Contraseña débil";
      this.classMsg = "weak";
    }
    if (event > 20 && event < 100) {
      this.msg = "Contraseña aceptable";
      this.classMsg = "normal";
    }
    if (event >= 100) {
      this.msg = "Contraseña segura";
      this.classMsg = "acceptable";
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
