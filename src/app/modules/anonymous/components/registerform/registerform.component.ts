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
  namePattern = "[a-zA-Z0-9 ]+";
  numberPattern = "^(0|[0-9][0-9]*)$";
  passwordPattern =
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[!#/_@#$%^&+-.*)(´}{><:;¡!})])";
  filteredDepartments: Observable<any>;
  filteredCities: Observable<any>;
  disabledCity: boolean;
  departmentCode: string;
  cityCode: string;
  cityValue: string;

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
  }

  public displayDepartment(departments?: any): string | undefined {
    return departments ? departments.description : undefined;
  }


  public filter() {
    this.filteredDepartments = this.externalForm.controls.department.valueChanges
    .pipe(
      map(department => typeof department === 'string' ? department : department.description),
      map(department => department ? this._filterDepartments(department) : this.departments.slice())
    );
  }

  public filterCities() {
    this.filteredCities = this.externalForm.controls.city.valueChanges.pipe(
      startWith(""),
      map(city => (city ? this._filterCities(city) : this.cities.slice()))
    );
  }

  private _filterDepartments(value: any) {
    
    const filterValue = value.toLowerCase();
    return this.departments.filter(
      department =>
        department.description.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterCities(value: string) {
    const filterValue = value.toLowerCase();
    return this.cities.filter(
      (city: any) => city.description.toLowerCase().indexOf(filterValue) === 0
    );
  }


  nextStepExternalClicker() {
    this.showTerms = true;
    this.showRegisterFormExternal = false;
    this.acceptTerms = false;
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

    this.registerUser
      .validateEmployee(idEmployee, idTypeEmployee)
      .subscribe((employee: ResponseService) => {
        if (employee.objectResponse === true) {
          this.showTerms = true;
          this.showRegisterForm = false;
          this.acceptTerms = false;
        } else {
          this.showRegisterForm = false;
          this.showRegisterFormExternal = true;
          this.getDepartments();
          this.getBanks();
          this.externalClickerForm();
          this.filter();
        }
      });
  }

  private externalClickerForm() {
    this.externalForm = this.fb.group({
      department: ["", Validators.required],
      city: ["", Validators.required],
      address: ["", Validators.required],
      bank: ["", Validators.required],
      typeAccount: ["", Validators.required],
      numberAccount: ["", [Validators.required, Validators.pattern(this.numberPattern), Validators.minLength(5), Validators.maxLength(20)]],
      ced1: [null],
      ced2: [null],
      cert: [null],
    });
  }

  private getExtension(nameFile: string) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[1].toLocaleLowerCase();
    this.validFormat = false;
    if (getExt === "jpg" ||  getExt === "jpeg" ||  getExt === "pdf") {
      this.validFormat = true;
    }
  }

  public onFileChange(event, param: string) {
    let nameFile = event.target.files[0].name;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let fileBlob = new Blob([file])
      let file2 = new File(([fileBlob]), nameFile);
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.getExtension(nameFile);
        if (this.validFormat === true) {
          if(param === 'ced1') {
            this.fileIdentificationCard1 = reader.result;
            this.nameFileCed1 = nameFile;
            this.showErrorCed1 = false;
          } else {
            if(param === 'ced2') {
              this.fileIdentificationCard2 = reader.result;
              this.nameFileCed2 = nameFile;
              this.showErrorCed2 = false;
            }
            else {
              this.fileBankCertificate = reader.result;
              this.nameFileCert = nameFile;
              this.showErrorCert = false;
            }
          }
          
        } else {
          if(param === 'ced1') {
              this.showErrorCed1 = true;
              this.nameFileCed1 = nameFile;
          } else {
            if(param === 'ced2') {
              this.showErrorCed2 = true;
              this.nameFileCed2 = nameFile;
            }
            else {
              this.showErrorCert = true;
              this.nameFileCert = nameFile;
            }
          }
        }
      };
    }
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
      address: this.externalForm.controls.address.value
    };

    this.subscription = this.registerUser.registerUser(registerForm).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === "Success") {
          Swal.fire({
            title: "Registro válido",
            text:
              "Se ha registrado satisfactoriamente. Por favor, revise su correo para activar su cuenta.",
            type: "success",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "accept-register-alert-success"
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

  public selectDepartment(department) {
    this.departmentCode = department.code;
    this.cities = department.municipalities;
    this.externalForm.controls.city.setValue('');
    let valueDepartment = this.externalForm.controls.department.valueChanges;
    this.filterCities();

    valueDepartment.subscribe((resp) => {
      if (resp !== '') {
        this.getDepartments();
        // this.externalForm.controls.city.enable();
      } else {
        // this.externalForm.controls.city.disable();
        this.externalForm.controls.city.setValue('');
      }
    })
  }

  public checkDepartment() {
    if ((this.externalForm.controls.department.value.code !== this.departmentCode) || (this.externalForm.controls.department.value.code === undefined || this.departmentCode === undefined )) {
      this.externalForm.controls.department.setErrors({'incorrect': true});
    }
  }

  public selectCity(city) {
    this.cityCode = city.code;
    this.cityValue = city.description;
  }

  public checkCity() {
    if (this.externalForm.controls.city.value !== this.cityValue) {
      this.externalForm.controls.city.setErrors({'incorrectCity': true});
    }
  }

  /**
   * Metodo para listar los departamentos
   */

  public getDepartments() {
    this.subscription = this.personalInfo
      .getDepartments()
      .subscribe((res: ResponseService) => {
        this.departments = res.objectResponse;
      });
  }

  /**
   * Metodo para listar los bancos
   */

  public getBanks() {
    this.subscription = this.personalInfo
      .getBanks()
      .subscribe((res: ResponseService) => {
        this.banks = res.objectResponse;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
