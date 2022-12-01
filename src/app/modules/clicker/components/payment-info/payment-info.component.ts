import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { UtilsService } from 'src/app/services/utils.service';
import { MasterDataService } from 'src/app/services/master-data.service';
import { Subscription, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ResponseService } from 'src/app/interfaces/response';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss'],
})
export class PaymentInfoComponent implements OnInit, OnDestroy {
  constructor(
    private fb: UntypedFormBuilder,
    private registerUser: UserService,
    private router: Router,
    private loading: LoaderService,
    private _snackBar: MatSnackBar,
    private utils: UtilsService,
    private personalInfo: MasterDataService
  ) {}

  private subscription: Subscription = new Subscription();

  externalForm: UntypedFormGroup;
  validFormat: boolean;
  nameFileCed1 = '';
  nameFileCed2 = '';
  nameFileCert = '';
  nameFileRUT = '';
  showErrorCed1 = false;
  showErrorCed2 = false;
  showErrorCert = false;
  showErrorRUT = false;
  showErrorFormatCed1 = false;
  showErrorFormatCed2 = false;
  showErrorFormatCert = false;
  showErrorFormatRUT = false;
  fileIdentificationCard1: any;
  fileIdentificationCard2: any;
  fileBankCertificate: any;
  // fileRUT: any;
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  departments = [];
  banks = [];
  typeAccount = [
    { id: 1, description: 'Ahorros' },
    { id: 2, description: 'Corriente' },
  ];

  cities: [];
  numberPattern = '^(0|[0-9][0-9]*)$';
  // passwordPattern =
  //   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[!#/_@#$%^&+-.*)(´}{><:;¡!})])';
  passwordPattern = '(?=.*[a-zA-Z])(?=.*[0-9])';
  filteredDepartments: Observable<any>;
  filteredCities: Observable<any>;
  disabledCity: boolean;
  departmentCode: string;
  cityCode: string;
  cityValue: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  userId: string;
  identification: string;

  ngOnInit() {
    this.subscription = this.registerUser.userInfo$.subscribe((val) => {
      if (!!val) {
        this.userId = val.userId;
        this.identification = val.identification;
        this.name = val.firstNames;
        this.lastName = val.lastNames;
        this.phone = val.cellphone;
      }
    });

    this.disabledCity = true;
    this.nameFileCed1 = '';
    this.nameFileCed2 = '';
    this.nameFileCert = '';
    this.nameFileRUT = '';
    this.externalClickerForm();
    this.getBanks();
  }

  /**
   * @param departments Metodo para el autocompletar los departamentos
   *
   */

  public displayDepartment(departments?: any): string | undefined {
    return departments ? departments.description : undefined;
  }

  private externalClickerForm() {
    this.externalForm = this.fb.group({
      bank: [null, Validators.required],
      typeAccount: [null, Validators.required],
      numberAccount: [
        null,
        [Validators.required, Validators.pattern(this.numberPattern), Validators.minLength(5), Validators.maxLength(20)],
      ],
      ced1: [null],
      ced2: [null],
      cert: [null],
      rut: [null],
    });
  }

  /**
   * Metodo para validar que la extension sea valida
   * @param nameFile nombre del archivo
   */

  private getExtension(nameFile: string) {
    const splitExt = nameFile.split('.');
    const getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    if (getExt === 'jpg' || getExt === 'jpeg' || getExt === 'pdf') {
      this.validFormat = true;
    }
  }

  /**
   * Metodo para leer y subir un archivo al  servidor
   * @param event evento
   * @param param parametro
   */

  public onFileChangeFiles(event, param: string) {
    if (event.target.files && event.target.files.length) {
      let error = { incorrect: true };

      const nameFile = event.target.files[0].name;
      this.getExtension(nameFile);

      if (this.validFormat) {
        const formData = new FormData();

        formData.append('file', event.target.files[0]);
        formData.append('typeDocument', param);
        formData.append('identification', this.identification);
        formData.append('userId', this.userId);

        this.subscription = this.registerUser.uploadFiles(formData).subscribe((response: ResponseService) => {
          if (response.state === 'Success') {
            error = null;
            this._snackBar.open(response.userMessage, 'Cerrar', {
              duration: 5000,
            });
          } else {
            Swal.fire({
              title: 'Error al subir archivo',
              text: response.userMessage,
              type: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonClass: 'accept-register-alert-error',
            });
          }

          switch (param) {
            case 'Rut':
              this.nameFileRUT = nameFile;
              if (response.state === 'Success') {
                this.showErrorRUT = this.showErrorFormatRUT = false;
              } else {
                this.showErrorRUT = true;
              }
              this.externalForm.controls.rut.setErrors(error);
              break;
            case 'BankCertificate':
              this.nameFileCert = nameFile;
              if (response.state === 'Success') {
                this.showErrorCert = this.showErrorFormatCert = false;
              } else {
                this.showErrorCert = true;
              }
              this.externalForm.controls.cert.setErrors(error);
              break;
            case 'IdentificationCard1':
              this.nameFileCed1 = nameFile;
              if (response.state === 'Success') {
                this.showErrorCed1 = this.showErrorFormatCed1 = false;
              } else {
                this.showErrorCed1 = true;
              }
              this.externalForm.controls.ced1.setErrors(error);
              break;
            case 'IdentificationCard2':
              this.nameFileCed2 = nameFile;
              if (response.state === 'Success') {
                this.showErrorCed2 = this.showErrorFormatCed2 = false;
              } else {
                this.showErrorCed2 = true;
              }
              this.externalForm.controls.ced2.setErrors(error);
              break;
            default:
              break;
          }
        });
      } else {
        switch (param) {
          case 'Rut':
            this.nameFileRUT = nameFile;
            this.showErrorRUT = this.showErrorFormatRUT = true;
            this.externalForm.controls.rut.setErrors({ incorrect: true });
            break;
          case 'BankCertificate':
            this.nameFileCert = nameFile;
            this.showErrorCert = this.showErrorFormatCert = true;
            this.externalForm.controls.cert.setErrors({ incorrect: true });
            break;
          case 'IdentificationCard1':
            this.nameFileCed1 = nameFile;
            this.showErrorCed1 = this.showErrorFormatCed1 = true;
            this.externalForm.controls.ced1.setErrors({ incorrect: true });
            break;
          case 'IdentificationCard2':
            this.nameFileCed2 = nameFile;
            this.showErrorCed2 = this.showErrorFormatCed2 = true;
            this.externalForm.controls.ced1.setErrors({ incorrect: true });
            break;
          default:
            break;
        }
      }
    }
  }

  /**
   * Metodo para registrar un usuario
   * @params Email, FirstNames, LastNames, Identification, Cellphone. Password, IdType
   */

  public sendPayment() {
    const registerForm = {
      cellphone: this.phone,
      firstNames: this.name,
      // lastNames: this.lastName,
      // department: this.departmentCode,
      // municipality: this.cityCode,
      bank: this.externalForm.controls.bank.value,
      bankAccountNumber: btoa(this.externalForm.controls.numberAccount.value),
      typeBankAccount: this.externalForm.controls.typeAccount.value,
      // address: this.externalForm.controls.address.value,
    };

    this.subscription = this.registerUser.updateUser(registerForm).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === 'Success') {
          Swal.fire({
            title: 'Información guardada',
            type: 'success',
            html: `
              Se ha guardado tu información correctamente
              `,
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'accept-register-alert-success',
          }).then(() => {
            this.nameFileCed1 = '';
            this.nameFileCed2 = '';
            this.nameFileCert = '';
            this.nameFileRUT = '';
            this.showErrorCed1 = false;
            this.showErrorCed2 = false;
            this.showErrorCert = false;
            this.showErrorRUT = false;
            this.externalForm.controls.ced1.setValue(null);
            this.externalForm.controls.ced2.setValue(null);
            this.externalForm.controls.cert.setValue(null);
            this.externalForm.controls.rut.setValue(null);
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: 'Registro inválido',
            text: resp.userMessage,
            type: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'accept-register-alert-error',
          }).then(() => {
            this.nameFileCed1 = '';
            this.nameFileCed2 = '';
            this.nameFileCert = '';
            this.nameFileRUT = '';
            this.showErrorCed1 = false;
            this.showErrorCed2 = false;
            this.showErrorCert = false;
            this.showErrorRUT = false;
            this.externalForm.controls.ced1.setValue(null);
            this.externalForm.controls.ced2.setValue(null);
            this.externalForm.controls.cert.setValue(null);
            this.externalForm.controls.rut.setValue(null);
          });
        }
      },
      (error) => {
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          text: error.error.userMessage,
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'accept-register-alert-invalid',
        });
      }
    );
  }

  /**
   * Metodo para listar los bancos
   */

  public getBanks() {
    this.subscription = this.personalInfo.getBanks().subscribe((res: ResponseService) => {
      this.banks = res.objectResponse;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
