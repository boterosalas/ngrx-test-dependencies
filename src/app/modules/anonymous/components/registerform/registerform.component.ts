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
import { startWith } from "rxjs/internal/operators/startWith";
import { map } from "rxjs/internal/operators/map";
import { MasterDataService } from 'src/app/services/master-data.service';
declare var dataLayer: any

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
    private utils: UtilsService,
    private personalInfo: MasterDataService
  ) {}

  private subscription: Subscription = new Subscription();
  registerForm: FormGroup;
  externalForm: FormGroup;
  showTerms: boolean;
  showRegisterForm: boolean;
  showRegisterFormExternal: boolean;
  showLoginForm: boolean;
  acceptTerms: boolean;
  validFormat: boolean;
  nameFileCed1: string;
  nameFileCed2: string;
  nameFileCert: string;
  showErrorCed1: boolean;
  showErrorCed2: boolean;
  showErrorCert: boolean;
  fileIdentificationCard1: any;
  fileIdentificationCard2: any;
  fileBankCertificate: any;
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  idUserType = [];
  departments = [];
  banks = [];
  typeAccount = [
    {id: 1, description: 'Ahorros'},
    {id: 2, description: 'Corriente'},
  ]

  cities: [];
  emailPattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
  namePattern = "[a-zA-Z0-9 àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+";
  numberPattern = "^(0|[0-9][0-9]*)$";
  // passwordPattern =
  //   "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[!#/_@#$%^&+-.*)(´}{><:;¡!})])";
  passwordPattern = "(?=.*[a-zA-Z])(?=.*[0-9])";
  filteredDepartments: Observable<any>;
  filteredCities: Observable<any>;
  disabledCity: boolean;
  departmentCode: string;
  cityCode: string;
  cityValue: string;
  msg:string;
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
        ]
      },
      {
        validator: [
          ConfirmPasswordValidator.MatchPassword,
          ConfirmEmailValidator.MatchEmail
        ]
      }
    );
    this.showTerms = false;
    this.showRegisterForm = true;
    this.acceptTerms = false;
    this.disabledCity = true;
    this.getidType();
    this.nameFileCed1 = '';
    this.nameFileCed2 = '';
    this.nameFileCert = '';
    this.externalClickerForm();
  }


  /**
   * Muestra los terminos y condiciones al dar clic en el boton siguiente del registro
   */

  public nextStep() {
    let idEmployee = this.registerForm.controls.id.value;
    let idTypeEmployee = this.registerForm.controls.idType.value;

    if (idTypeEmployee === "1") {
      idTypeEmployee = "CC";
    } else {
      if (idTypeEmployee === "2") {
        idTypeEmployee = "CE";
      } else {
        idTypeEmployee = "NIT";
      }
    }

    this.subscription = this.registerUser
      .validateEmployee(idEmployee, idTypeEmployee)
      .subscribe((employee: ResponseService) => {
        if (employee.objectResponse === true) {
          this.showTerms = true;
          this.showRegisterForm = false;
          this.acceptTerms = false;
        } else {
          this.showRegisterForm = false;
          this.showRegisterFormExternal = true;
          this.externalClickerForm();
        }
      });
  }

  private externalClickerForm() {
    this.externalForm = this.fb.group({
      department: [null, Validators.required],
      city: [null, Validators.required],
      address: [null, Validators.required],
      bank: [null, Validators.required],
      typeAccount: [null, Validators.required],
      numberAccount: [null, [Validators.required, Validators.pattern(this.numberPattern), Validators.minLength(5), Validators.maxLength(20)]],
      ced1: [null],
      ced2: [null],
      cert: [null],
    });
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
      IdType: this.registerForm.controls.idType.value,
      department: this.departmentCode,
      municipality: this.cityCode,
      bank: this.externalForm.controls.bank.value,
      fileIdentificationCard1: this.fileIdentificationCard1,
      fileIdentificationCard2: this.fileIdentificationCard2,
      fileBankCertificate: this.fileBankCertificate,
      bankAccountNumber: btoa(this.externalForm.controls.numberAccount.value),
      typeBankAccount: this.externalForm.controls.typeAccount.value,
      address: this.externalForm.controls.address.value,
      acceptHabeasData: true,
      acceptTerms: true
    };

    this.subscription = this.registerUser.registerUser(registerForm).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === "Success") {

          dataLayer.push({
            event: 'pushEventGA',
            categoria: 'Registro',
            accion: 'ClicLateralRegistro',
            etiqueta: 'RegistroExitoso'
          });
        
          Swal.fire({
              title:'Revisa tu correo',
              html: `
              Activa tu cuenta siguiendo el enlace </br> que enviamos a tu correo.
              `,
            confirmButtonText: "Volver al inicio",
            confirmButtonClass: "accept-register-alert-success gtmRegistroClicModalValidacion"
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
          }).then(() => {
            this.backStep();
            this.nameFileCed1 ="";
            this.nameFileCed2 ="";
            this.nameFileCert ="";
            this.externalForm.reset();
            this.showErrorCed1 = false;
            this.showErrorCed2 = false;
            this.showErrorCert = false;
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
        }).then(() => {
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

  onStrengthChanged(event){
   this.subscription = this.registerForm.controls.password.valueChanges.subscribe((resp) => {
     if(resp === '') {
       this.msg = '';
     }
   })
    if(event <= 20) {
      this.msg = 'Contraseña débil'
      this.classMsg = 'weak';
    } 
    if(event > 20 && event < 100) {
      this.msg = 'Contraseña aceptable'
      this.classMsg = 'normal';
    } 
      if(event >= 100) {
      this.msg = 'Contraseña segura';
      this.classMsg = 'acceptable';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
