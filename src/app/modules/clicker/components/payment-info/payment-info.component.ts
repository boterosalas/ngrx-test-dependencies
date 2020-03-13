import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { LoaderService } from "src/app/services/loader.service";
import { UtilsService } from "src/app/services/utils.service";
import { MasterDataService } from "src/app/services/master-data.service";
import { Subscription, Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ResponseService } from "src/app/interfaces/response";
import Swal from "sweetalert2";

@Component({
  selector: "app-payment-info",
  templateUrl: "./payment-info.component.html",
  styleUrls: ["./payment-info.component.scss"]
})
export class PaymentInfoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private registerUser: UserService,
    private router: Router,
    private loading: LoaderService,
    private utils: UtilsService,
    private personalInfo: MasterDataService
  ) {}

  private subscription: Subscription = new Subscription();

  externalForm: FormGroup;
  validFormat: boolean;
  nameFileCed1: string = '';
  nameFileCed2: string = '';
  nameFileCert: string = '';
  showErrorCed1: boolean = false;
  showErrorCed2: boolean = false;
  showErrorCert: boolean = false;
  fileIdentificationCard1: any;
  fileIdentificationCard2: any;
  fileBankCertificate: any;
  EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  departments = [];
  banks = [];
  typeAccount = [
    { id: 1, description: "Ahorros" },
    { id: 2, description: "Corriente" }
  ];

  cities: [];
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

  ngOnInit() {
    this.disabledCity = true;
    this.nameFileCed1 = "";
    this.nameFileCed2 = "";
    this.nameFileCert = "";
    this.externalClickerForm();
    this.getDepartments();
    this.getBanks();
    this.filter();
  }

  /**
   * Metodo para el autocompletar los departamentos
   * @param departments
   *
   */

  public displayDepartment(departments?: any): string | undefined {
    return departments ? departments.description : undefined;
  }

  public filter() {
    this.filteredDepartments = this.externalForm.controls.department.valueChanges.pipe(
      map(department =>
        typeof department === "string" ? department : department.description
      ),
      map(department =>
        department
          ? this._filterDepartments(department)
          : this.departments.slice()
      )
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

  private externalClickerForm() {
    this.externalForm = this.fb.group({
      department: [null, Validators.required],
      city: [null, Validators.required],
      address: [null, Validators.required],
      bank: [null, Validators.required],
      typeAccount: [null, Validators.required],
      numberAccount: [
        null,
        [
          Validators.required,
          Validators.pattern(this.numberPattern),
          Validators.minLength(5),
          Validators.maxLength(20)
        ]
      ],
      ced1: [null, Validators.required],
      ced2: [null, Validators.required],
      cert: [null, Validators.required]
    });
  }

  /**
   * Metodo para validar que la extension sea valida
   * @param nameFile
   */

  private getExtension(nameFile: string) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    if (getExt === "jpg" || getExt === "jpeg" || getExt === "pdf") {
      this.validFormat = true;
    }
  }

  /**
   * Metodo para leer y subir un archivo al  servidor
   * @param event
   * @param param
   */

  public onFileChangeFiles(event, param: string) {
    let nameFile = event.target.files[0].name;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let fileBlob = new Blob([file]);
      let file2 = new File([fileBlob], nameFile);
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.getExtension(nameFile);
        if (this.validFormat === true) {
          if (param === "ced1") {
            this.fileIdentificationCard1 = reader.result;
            this.nameFileCed1 = nameFile;
            this.showErrorCed1 = false;
          } else {
            if (param === "ced2") {
              this.fileIdentificationCard2 = reader.result;
              this.nameFileCed2 = nameFile;
              this.showErrorCed2 = false;
            } else {
              this.fileBankCertificate = reader.result;
              this.nameFileCert = nameFile;
              this.showErrorCert = false;
            }
          }
        } else {
          if (param === "ced1") {
            this.showErrorCed1 = true;
            this.nameFileCed1 = nameFile;
          } else {
            if (param === "ced2") {
              this.showErrorCed2 = true;
              this.nameFileCed2 = nameFile;
            } else {
              this.showErrorCert = true;
              this.nameFileCert = nameFile;
            }
          }
        }
      };
    }
  }

  /**
   * Metodo para registrar un usuario
   * @params Email, FirstNames, LastNames, Identification, Cellphone. Password, IdType
   */

  // public sendPayment() {
  //   let registerForm = {
  //     department: this.departmentCode,
  //     municipality: this.cityCode,
  //     bank: this.externalForm.controls.bank.value,
  //     fileIdentificationCard1: this.fileIdentificationCard1,
  //     fileIdentificationCard2: this.fileIdentificationCard2,
  //     fileBankCertificate: this.fileBankCertificate,
  //     bankAccountNumber: btoa(this.externalForm.controls.numberAccount.value),
  //     typeBankAccount: this.externalForm.controls.typeAccount.value,
  //     address: this.externalForm.controls.address.value,
  //   };

  //   // console.log(registerForm);

  //   this.subscription = this.registerUser.updateUser(registerForm).subscribe(
  //     (resp: ResponseService) => {
  //       this.loading.hide();
  //       if (resp.state === "Success") {
  //         Swal.fire({
  //           title: "Información guardada",
  //           html: `
  //             Se ha guardado tu información correctamente
  //             `,
  //           confirmButtonText: "Aceptar",
  //           confirmButtonClass:
  //             "accept-register-alert-success"
  //         })
  //       } else {
  //         Swal.fire({
  //           title: "Registro inválido",
  //           text: resp.userMessage,
  //           type: "error",
  //           confirmButtonText: "Aceptar",
  //           confirmButtonClass: "accept-register-alert-error"
  //         }).then(() => {
  //           this.nameFileCed1 = "";
  //           this.nameFileCed2 = "";
  //           this.nameFileCert = "";
  //           this.externalForm.reset();
  //           this.showErrorCed1 = false;
  //           this.showErrorCed2 = false;
  //           this.showErrorCert = false;
  //         });
  //       }
  //     },
  //     error => {
  //       this.loading.hide();
  //       Swal.fire({
  //         title: error.statusText,
  //         text: error.error.userMessage,
  //         type: "error",
  //         confirmButtonText: "Aceptar",
  //         confirmButtonClass: "accept-register-alert-invalid"
  //       })
  //     }
  //   );
  // }

  /**
   * Metodo para seleccionar el departamento
   * @param department
   *
   */

  public selectDepartment(department) {
    this.departmentCode = department.code;
    this.cities = department.municipalities;
    this.externalForm.controls.city.setValue("");
    let valueDepartment = this.externalForm.controls.department.valueChanges;
    this.filterCities();

    this.subscription = valueDepartment.subscribe(resp => {
      if (resp !== "") {
        this.getDepartments();
        // this.externalForm.controls.city.enable();
      } else {
        // this.externalForm.controls.city.disable();
        this.externalForm.controls.city.setValue("");
      }
    });
  }

  // Metodo para validar el departamento

  public checkDepartment() {
    if (
      this.externalForm.controls.department.value.code !==
        this.departmentCode ||
      this.externalForm.controls.department.value.code === undefined ||
        this.departmentCode === undefined
    ) {
      this.externalForm.controls.department.setErrors({ incorrect: true });
    }
  }

  public selectCity(city) {
    this.cityCode = city.code;
    this.cityValue = city.description;
  }

  // Metodo para validar la ciudad

  public checkCity() {
    if (this.externalForm.controls.city.value !== this.cityValue) {
      this.externalForm.controls.city.setErrors({ incorrectCity: true });
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
