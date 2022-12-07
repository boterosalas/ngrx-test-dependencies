import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { UtilsService } from 'src/app/services/utils.service';
import { MasterDataService } from 'src/app/services/master-data.service';
import { Subscription, Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { ResponseService } from 'src/app/interfaces/response';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss'],
  // encapsulation: ViewEncapsulation.None
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
  ) { }

  private subscription: Subscription = new Subscription();
  cedulaFrontal$: Subscription = new Subscription();
  cedulaPosterior$: Subscription = new Subscription();
  certificadoBancario$: Subscription = new Subscription();
  rut$: Subscription = new Subscription();
  bank: string;
  bankAccountNumber: string;
  typeBankAccount: string;

  externalForm: UntypedFormGroup;
  validFormat: boolean;
  cedulaFrontalIsLoading: boolean = true;
  cedulaPosteriorIsLoading: boolean = true;
  certificadoBancarioIsLoading: boolean = true;
  rutIsLoading: boolean = true;
  fileCedulaFrontal: any = {};
  fileCedulaPosterior: any = {};
  fileCertificadoBancario: any = {};
  fileRut: any = {};
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
    this.externalClickerForm();
    this.subscription = this.registerUser.userInfo$.subscribe((val) => {
      if (!!val) {
        this.userId = val.userId;
        this.identification = val.identification;
        this.name = val.firstNames;
        this.lastName = val.lastNames;
        this.phone = val.cellphone;
        this.bank = val.bank;
        this.bankAccountNumber = val.bankAccountNumber;
        this.typeBankAccount = val.typeBankAccount;
      }
      this.initForm();
      this.getBanks();
    });
    this.getNames();
    this.disabledCity = true;
    this.nameFileCed1 = '';
    this.nameFileCed2 = '';
    this.nameFileCert = '';
    this.nameFileRUT = '';
  }

  getNames() {
    this.cedulaFrontal$ = this.registerUser.getDocuments('IdentificationCard1').subscribe((res: ResponseService) => {
      if (res.objectResponse) {
        this.fileCedulaFrontal.name = res.objectResponse.name;
      }
      this.cedulaFrontalIsLoading = false;
    });
    
    this.cedulaPosterior$ = this.registerUser.getDocuments('IdentificationCard2').subscribe((res: ResponseService) => {
      if (res.objectResponse) {
        this.fileCedulaPosterior.name = res.objectResponse.name;
      }
      this.cedulaPosteriorIsLoading = false;
    });
    
    this.certificadoBancario$ = this.registerUser.getDocuments('BankCertificate').subscribe((res: ResponseService) => {
      if (res.objectResponse) {
        this.fileCertificadoBancario.name = res.objectResponse.name;
      }
      this.certificadoBancarioIsLoading = false;
    });
    
    this.rut$ = this.registerUser.getDocuments('Rut').subscribe((res: ResponseService) => {
      if (res.objectResponse) {
        this.fileRut.name = res.objectResponse.name;
      }
      this.rutIsLoading = false;
    });

  }

  initForm() {
    if (this.typeBankAccount) {
      this.externalForm.controls.typeAccount.setValue(this.typeBankAccount);
      this.externalForm.controls.typeAccount.updateValueAndValidity();
    }
    if (this.bankAccountNumber) {
      this.externalForm.controls.numberAccount.setValue(`********${this.bankAccountNumber}`);
      this.externalForm.controls.numberAccount.updateValueAndValidity();
    }
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
    const name = event.name;
    const nameSplit = name.split('.');
    if (event.file && !event.error) {
      const formData = {
        file: event.file,
        typeDocument: param,
        identification: this.identification,
        extension: `.${nameSplit[nameSplit.length-1]}`,
        userId: this.userId
      }
      this.subscription = this.registerUser.uploadFiles(formData).subscribe((response: ResponseService) => {
        if (response.state === 'Success') {
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
          case 'IdentificationCard1':
            this.fileCedulaFrontal = event.file;
            break;
          case 'IdentificationCard2':
            this.fileCedulaPosterior = event.file;
            break;
          case 'BankCertificate':
            this.fileCertificadoBancario = event.file;
            break;
          case 'Rut':
            this.fileRut = event.file;
            break;
          default:
            break;
        }
      });
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
      if (this.bank) {
        this.externalForm.controls.bank.setValue(this.bank);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.cedulaFrontal$.unsubscribe();
    this.cedulaPosterior$.unsubscribe();
    this.certificadoBancario$.unsubscribe();
    this.rut$.unsubscribe();
  }
}
