import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { Subscription, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validator';
import { MasterDataService } from 'src/app/services/master-data.service';
import { ResponseService } from 'src/app/interfaces/response';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  constructor(
    public fb: UntypedFormBuilder,
    public user: UserService,
    private auth: AuthService,
    private loader: LoaderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public utils: UtilsService,
    private personalInfo: MasterDataService
  ) { }

  @ViewChild('templateDialog', { static: false }) template: TemplateRef<any>;
  @ViewChild('templateDialogCell', { static: false })
  templateCell: TemplateRef<any>;
  @ViewChild('templateDialogPass', { static: false })
  templatePass: TemplateRef<any>;
  @ViewChild('templateDialogAccount', { static: false })
  templateAccount: TemplateRef<any>;
  @ViewChild('templateDialogAddress', { static: false })
  templateAddress: TemplateRef<any>;

  @ViewChild('templateDeleteAccount', { static: false })
  templateDelete: TemplateRef<any>;

  @Input() showBankInfo: boolean;
  @Input() showInfoAccount: boolean;

  public subscription: Subscription = new Subscription();
  cedulaFrontal$: Subscription = new Subscription();
  cedulaPosterior$: Subscription = new Subscription();
  certificadoBancario$: Subscription = new Subscription();
  rut$: Subscription = new Subscription();
  cedulaFrontalIsLoading: boolean = true;
  cedulaPosteriorIsLoading: boolean = true;
  certificadoBancarioIsLoading: boolean = true;
  rutIsLoading: boolean = true;
  fileCedulaFrontal: any = {};
  fileCedulaPosterior: any = {};
  fileCertificadoBancario: any = {};
  fileRut: any = {};
  profileForm: UntypedFormGroup;
  profileFormCell: UntypedFormGroup;
  profileFormPass: UntypedFormGroup;
  profileFormDelete: UntypedFormGroup;
  accountForm: UntypedFormGroup;
  loginForm: UntypedFormGroup;
  addressForm: UntypedFormGroup;
  isLoggedIn: any;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  id: string;
  address: string;
  department: string;
  municipality: string;
  bank: string;
  bankAccountNumber: string;
  typeBankAccount: string;
  userId: string;
  isEmployee: boolean;
  isEmployeeUser: boolean;
  managedPayments: boolean;
  userInfo: any;
  filteredDepartments: Observable<any>;
  filteredCities: Observable<any>;
  disabledCity: boolean;
  departmentCode: string;
  departmentDecription: string;
  cityCode: string;
  cityValue: string;
  departments = [];
  cities: [];
  nameFileRut = '';
  nameFileCert = '';
  nameFileCed1 = '';
  nameFileCed2 = '';
  validFormat: boolean;
  showErrorRut = false;
  showErrorCert = false;
  showErrorCed1 = false;
  showErrorCed2 = false;
  showErrorFormatRut = false;
  showErrorFormatCert = false;
  showErrorFormatCed1 = false;
  showErrorFormatCed2 = false;
  activebutton = false;
  wrongPass = false;
  numberPattern = '^(0|[0-9][0-9]*)$';
  namePattern = '[a-zA-Z0-9 àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+';
  passwordPattern = '(?=.*[a-zA-Z])(?=.*[0-9])';
  msg: string;
  classMsg: string;
  banks = [];
  idVerified: number;
  typeAccount = [
    { id: 1, description: 'Ahorros' },
    { id: 2, description: 'Corriente' },
  ];
  typesStatusAccount = [
    {
      code: 'NOTVERIFIED',
      status: 'No verificada',
      title: 'Verificación de cuenta',
      description: 'Tu cuenta entrará en estado de verificación pronto, una vez sea verificada, se te depositarán las recompensas en ella.',
      icon: '/assets/img/icon-info-white.svg',
    },
    {
      code: 'INCOMPLETE',
      status: 'No verificada',
      title: 'Verificación de cuenta',
      description: 'Tu cuenta entrará en estado de verificación pronto, una vez sea verificada, se te depositarán las recompensas en ella.',
      icon: '/assets/img/icon-info-white.svg',
      className: 'rejected'
    },
    {
      code: 'INPROGRESS',
      status: 'En verificación',
      title: '',
      description: '',
      icon: '/assets/img/icon-review.svg',
      className: 'in-progress',
    },
    {
      code: 'VERIFIED',
      status: 'Verificado',
      title: '',
      description: '',
      icon: '/assets/img/checked.svg',
      className: 'verified',
    },
    {
      code: 'REJECTED',
      status: 'Cuenta rechazada',
      title: 'Motivo de rechazo',
      description: '',
      icon: '/assets/img/icon-alert-triangle.svg',
      className: 'rejected',
    },
  ];
  accountStatus: any;

  showBankInfoUser: boolean;
  showPassword = true;

  ngOnInit() {
    this.accountStatus = this.typesStatusAccount[0];
    this.subscription = this.user.userInfo$.subscribe((val) => {
      if (!!val) {
        this.userInfo = val;
        this.name = val.firstNames;
        this.lastName = val.lastNames;
        this.email = val.email;
        this.phone = val.cellphone;
        this.id = val.identification;
        this.address = val.address;
        this.department = val.departmentName;
        this.municipality = val.municipalityName;
        this.bank = val.bank;
        this.bankAccountNumber = val.bankAccountNumber;
        this.typeBankAccount = val.typeBankAccount;
        this.userId = val.userId;
        this.isEmployee = val.isEmployeeGrupoExito;
        this.idVerified = val.verified;
      }
      this.formProfile();
      this.formProfileCell();
      this.formAccount();
      this.formAddress();
      this.getDepartments();
      this.filter();
    });
    this.formProfileDelete();
    this.accountBankForm();
    this.getBanks();
    this.getUserData();
    this.getNames();
  }

  public formProfileDelete() {
    this.profileFormDelete = this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  public getUserData() {
    this.subscription = this.user.getuserdata().subscribe((user) => {
      this.managedPayments = user.managedpayments;
      this.isEmployeeUser = user.isemployeegrupoexito;
      this.getStatusVerification(user.responseaccountbank);
    });
  }

  public getStatusVerification(description) {
    this.subscription = this.user.getStatusVerification().subscribe(
      (resp: ResponseService) => {
        if (resp.state === 'Success') {
          const accountStatus = resp.objectResponse.find((status) => status.id === this.idVerified);
          if (accountStatus) {
            this.accountStatus = this.typesStatusAccount.find((type) => type.code === accountStatus.code);
            if (description && accountStatus.code !== 'NOTVERIFIED' || accountStatus.code !== 'INCOMPLETE') {
              this.accountStatus.description = description;
            }
          }
        } else {
          this.openSnackBar(resp.userMessage, 'Cerrar');
        }
      },
      (err) => {
        this.openSnackBar(err.userMessage, 'Cerrar');
      }
    );
  }

  public formProfile() {
    this.profileForm = this.fb.group({
      name: [this.name, [Validators.required, Validators.maxLength(50), Validators.pattern(this.namePattern)]],
      lastName: [this.lastName, [Validators.required, Validators.maxLength(50), Validators.pattern(this.namePattern)]],
    });
  }

  public formProfileCell() {
    this.profileFormCell = this.fb.group({
      phone: [
        this.phone,
        [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.numberPattern)],
      ],
    });
  }

  public formAccount() {
    this.accountForm = this.fb.group({
      bank: [this.bank, Validators.required],
      typeAccount: [this.typeBankAccount, Validators.required],
      numberAccount: ['', [Validators.required, Validators.pattern(this.numberPattern), Validators.minLength(5), Validators.maxLength(20)]],
      cert: [null],
      ced1: [null],
      ced2: [null],
      rut: [null],
      description: [null, Validators.required],
    });
  }

  public formAddress() {
    this.addressForm = this.fb.group({
      address: [this.address, Validators.required],
      department: [this.department, Validators.required],
      city: [this.municipality, [Validators.required, Validators.minLength(4)]],
    });
  }

  public accountBankForm() {
    this.loginForm = this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  public editName() {
    const title = 'Editar Nombres y apellidos';
    const id = 'names';
    const template = this.template;

    this.dialog.open(DialogEditComponent, {
      data: {
        title,
        template,
        id,
      },
    });

  }

  public editAddres() {
    const title = 'Editar dirección';
    const id = 'address';
    const template = this.templateAddress;

    this.dialog.open(DialogEditComponent, {
      data: {
        title,
        template,
        id,
      },
    });
  }

  public editAccount() {
    this.activebutton = false;
    this.showBankInfoUser = false;
    this.showPassword = true;
    this.loginForm.reset();
    const title = 'Actualizar información bancaria';
    const id = 'account';
    const template = this.templateAccount;
    if (this.bank === null) {
      this.accountForm.reset();
    }

    const openEdit = this.dialog.open(DialogEditComponent, {
      maxWidth: '450px',
      panelClass: 'editaccount',
      data: {
        title,
        template,
        id,
      },
    });

    openEdit.beforeClosed().subscribe(() => {
      this.getUserData();
    });

    this.dialog.afterAllClosed.subscribe(() => {
      if (this.bank === null) {
        this.accountForm.reset();
      }
    });
  }

  public editCell() {
    const title = 'Editar Celular';
    const id = 'cellphone';
    const template = this.templateCell;

    this.dialog.open(DialogEditComponent, {
      data: {
        title,
        template,
        id,
      },
    });
  }

  public changePassword() {
    this.profileFormPass.reset();
    const title = 'Cambiar contraseña';
    const id = 'password';
    const template = this.templatePass;

    this.dialog.open(DialogEditComponent, {
      data: {
        title,
        template,
        id,
      },
    });
  }

  public editUser() {
    this.userInfo.firstNames = this.profileForm.controls.name.value;
    this.userInfo.lastNames = this.profileForm.controls.lastName.value;
    this.userInfo.cellphone = this.profileFormCell.controls.phone.value;
    this.userInfo.bankAccountNumber = null;
    this.subscription = this.user.updateUser(this.userInfo).subscribe(
      (user: any) => {
        if (user.state === 'Success') {
          this.dialog.closeAll();
          this.subscription = this.user.getProfile();
          this.openSnackBar(user.userMessage, 'Cerrar');
        }
      },
      (err) => {
        this.openSnackBar(err.userMessage, 'Cerrar');
      }
    );
  }

  public updateAccount() {
    const data = {
      bank: this.accountForm.controls.bank.value,
      typebankaccount: this.accountForm.controls.typeAccount.value,
      bankaccountnumber: btoa(this.accountForm.controls.numberAccount.value),
      reason: this.accountForm.controls.description.value,
    };

    const updateForm = {
      cellphone: this.phone,
      firstNames: this.name,
      lastNames: this.lastName,
      bank: this.accountForm.controls.bank.value,
      bankAccountNumber: btoa(this.accountForm.controls.numberAccount.value),
      typeBankAccount: this.accountForm.controls.typeAccount.value,
    };

    this.subscription = this.user.changeBankInformation(this.userId, data).subscribe(
      (account: any) => {
        if (account.state === 'Success') {
          this.dialog.closeAll();
          this.subscription = this.user.getProfile();
          this.openSnackBar(account.userMessage, 'Cerrar');
        }
      },
      (err) => {
        this.openSnackBar(err.userMessage, 'Cerrar');
      }
    );

    this.subscription = this.user.updateUser(updateForm).subscribe(
      () => { },
      (err) => {
        this.openSnackBar(err.userMessage, 'Cerrar');
      }
    );
  }

  private openSnackBar(message: string, action: string, duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration,
    });
  }

  public changePasswordUser() {
    const data = {
      password: btoa(this.profileFormPass.controls.actualPassword.value),
      newPassword: btoa(this.profileFormPass.controls.password.value),
    };
    this.subscription = this.auth.changePassword(data).subscribe(
      (password: any) => {
        if (password.state === 'Success') {
          this.dialog.closeAll();
          this.subscription = this.user.getProfile();
          this.profileFormPass.reset();
          this.openSnackBar(password.userMessage, 'Cerrar');
        } else {
          this.openSnackBar(password.userMessage, 'Cerrar');
        }
      },
      (err) => {
        this.openSnackBar(err.userMessage, 'Cerrar');
      }
    );
  }

  public showAccount() {
    this.user.getBankAccountNumber(btoa(this.loginForm.controls.Password.value)).subscribe(
      (resp: ResponseService) => {
        if (resp.state === 'Success') {
          this.accountForm.controls.numberAccount.setValue(resp.objectResponse);
          this.showBankInfoUser = true;
          this.showPassword = false;

          const account = document.getElementById('account');
          if (account) {
            account.classList.add('update-info-bank');
          }
        } else {
          this.openSnackBar(resp.userMessage, 'Cerrar');
        }
      },
      (err) => {
        this.openSnackBar(err.userMessage, 'Cerrar');
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

  /**
   * Metodo para autocompletar los departamentos
   * @param departments departamentos
   */

  public displayDepartment(departments?: any): string | undefined {
    return departments ? departments.description : undefined;
  }

  public filter() {
    this.filteredDepartments = this.addressForm.controls.department.valueChanges.pipe(
      map((department) => (typeof department === 'string' ? department : department.description)),
      map((department) => (department ? this._filterDepartments(department) : this.departments.slice()))
    );
  }

  public filterCities() {
    this.filteredCities = this.addressForm.controls.city.valueChanges.pipe(
      startWith(''),
      map((city) => (city ? this._filterCities(city) : this.cities.slice()))
    );
  }

  private _filterDepartments(value: any) {
    const filterValue = value.toLowerCase();
    return this.departments.filter((department) => department.description.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterCities(value: string) {
    const filterValue = value.toLowerCase();
    return this.cities.filter((city: any) => city.description.toLowerCase().indexOf(filterValue) === 0);
  }

  public selectDepartment(department) {
    this.departmentDecription = department.description;
    this.departmentCode = department.code;
    this.cities = department.municipalities;
    this.addressForm.controls.city.setValue('');
    const valueDepartment = this.addressForm.controls.department.valueChanges;
    this.filterCities();

    valueDepartment.subscribe((resp) => {
      if (resp !== '') {
        this.getDepartments();
      } else {
        this.addressForm.controls.city.setValue('');
      }
    });
  }

  public changeAddress() {
    this.userInfo.address = this.addressForm.controls.address.value;
    this.userInfo.department = this.departmentCode;
    this.userInfo.municipality = this.cityCode;
    this.userInfo.bankAccountNumber = null;
    this.subscription = this.user.updateUser(this.userInfo).subscribe(
      (address: any) => {
        if (address.state === 'Success') {
          this.openSnackBar(address.userMessage, 'Cerrar');
          this.subscription = this.user.getProfile();
          this.dialog.closeAll();
        }
      },
      (err) => {
        this.openSnackBar(err.userMessage, 'Cerrar');
      }
    );
  }

  public checkDepartment() {
    if (
      this.addressForm.controls.department.value !== this.departmentDecription ||
      this.addressForm.controls.department.value === undefined
    ) {
      this.addressForm.controls.department.setErrors({ incorrect: true });
    }
  }

  public selectCity(city) {
    this.cityCode = city.code;
    this.cityValue = city.description;
  }

  public checkCity() {
    if (this.addressForm.controls.city.value !== this.cityValue) {
      this.addressForm.controls.city.setErrors({ incorrectCity: true });
    }
  }

  /**
   * Metodo para listar los departamentos
   */

  public getDepartments() {
    this.subscription = this.personalInfo.getDepartments().subscribe((res: ResponseService) => {
      this.departments = res.objectResponse;
    });
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
        identification: this.id,
        extension: `.${nameSplit[nameSplit.length - 1]}`,
        userId: this.userId
      }

      this.subscription = this.user.uploadFiles(formData).subscribe((response: ResponseService) => {
        if (response.state === 'Success') {
          this.activebutton = true;
        } else {
          this.openSnackBar(response.userMessage, 'Cerrar');
        }
        switch (param) {
          case 'IdentificationCard1':
            this.fileCedulaFrontal = event;
            break;
          case 'IdentificationCard2':
            this.fileCedulaPosterior = event;
            break;
          case 'BankCertificate':
            this.fileCertificadoBancario = event;
            break;
          case 'Rut':
            this.fileRut = event;
            break;
          default:
            break;
        }
      });
    }
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

  public previewDocument(typeDocument: string) {
    this.user.getDocuments(typeDocument).subscribe((dc: ResponseService) => {
      if (dc.objectResponse !== null) {
        if (dc.objectResponse.extension === '.jpg' || dc.objectResponse.extension === '.jpge' || dc.objectResponse.extension === '.png') {
          this.utils.openpreviewImage(dc.objectResponse.base64);
        } else {
          this.utils.openpreviewPdf(dc.objectResponse.base64);
        }
      } else {
        this.openSnackBar(dc.userMessage, 'Cerrar');
      }
    });
  }

  getNames() {
    this.cedulaFrontal$ = this.user.getDocuments('IdentificationCard1').subscribe((res: ResponseService) => {
      if (res.objectResponse) {
        this.fileCedulaFrontal.name = res.objectResponse.name;
      }
      this.cedulaFrontalIsLoading = false;
    });
    
    this.cedulaPosterior$ = this.user.getDocuments('IdentificationCard2').subscribe((res: ResponseService) => {
      if (res.objectResponse) {
        this.fileCedulaPosterior.name = res.objectResponse.name;
      }
      this.cedulaPosteriorIsLoading = false;
    });
    
    this.certificadoBancario$ = this.user.getDocuments('BankCertificate').subscribe((res: ResponseService) => {
      if (res.objectResponse) {
        this.fileCertificadoBancario.name = res.objectResponse.name;
      }
      this.certificadoBancarioIsLoading = false;
    });
    
    this.rut$ = this.user.getDocuments('Rut').subscribe((res: ResponseService) => {
      if (res.objectResponse) {
        this.fileRut.name = res.objectResponse.name;
      }
      this.rutIsLoading = false;
    });

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public cancel() {
    this.dialog.closeAll();
    this.profileFormDelete.controls.Password.setValue('');
  }
}
