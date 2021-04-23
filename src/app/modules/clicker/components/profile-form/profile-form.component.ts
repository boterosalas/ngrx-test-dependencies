import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Subscription, Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { LoaderService } from "src/app/services/loader.service";
import { MatDialog, MatSnackBar } from "@angular/material";
import { DialogEditComponent } from "../dialog-edit/dialog-edit.component";
import { ConfirmPasswordValidator } from "src/app/validators/confirm-password.validator";
import { MasterDataService } from "src/app/services/master-data.service";
import { ResponseService } from "src/app/interfaces/response";
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { UtilsService } from "src/app/services/utils.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-profile-form",
  templateUrl: "./profile-form.component.html",
  styleUrls: ["./profile-form.component.scss"],
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private auth: AuthService,
    private loader: LoaderService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private utils: UtilsService,
    private personalInfo: MasterDataService
  ) { }

  @ViewChild("templateDialog", { static: false }) template: TemplateRef<any>;
  @ViewChild("templateDialogCell", { static: false }) templateCell: TemplateRef<
    any
  >;
  @ViewChild("templateDialogPass", { static: false }) templatePass: TemplateRef<
    any
  >;
  @ViewChild("templateDialogAccount", { static: false })
  templateAccount: TemplateRef<any>;
  @ViewChild("templateDialogAddress", { static: false })
  templateAddress: TemplateRef<any>;

  @ViewChild("templateDeleteAccount", { static: false })
  templateDelete: TemplateRef<any>;

  private subscription: Subscription = new Subscription();
  profileForm: FormGroup;
  profileFormCell: FormGroup;
  profileFormPass: FormGroup;
  profileFormDelete: FormGroup;
  accountForm: FormGroup;
  loginForm: FormGroup;
  addressForm: FormGroup;
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
  nameFileCert = "";
  nameFileCed1 = "";
  nameFileCed2 = "";
  validFormat: boolean;
  showErrorCert: boolean = false;
  showErrorCed1: boolean = false;
  showErrorCed2: boolean = false;
  fileBankCertificate: any;
  fileCed1: any;
  fileCed2: any;
  activebutton: boolean = false;
  wrongPass: boolean = false;
  numberPattern = "^(0|[0-9][0-9]*)$";
  namePattern =
    "[a-zA-Z0-9 àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+";
  passwordPattern = "(?=.*[a-zA-Z])(?=.*[0-9])";
  msg: string;
  classMsg: string;
  banks = [];
  typeAccount = [
    { id: 1, description: "Ahorros" },
    { id: 2, description: "Corriente" },
  ];

  showBankInfoUser: boolean;
  showPassword: boolean = true;

  ngOnInit() {
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
      }

      this.formProfile();
      this.formProfileCell();
      this.formProfilePass();
      this.formAccount();
      this.formAddress();
      this.getDepartments();
      this.filter();
    });
    this.formProfileDelete();
    this.accountBankForm();
    this.getBanks();
    this.getUserData();
  }

  public formProfileDelete() {
    this.profileFormDelete = this.fb.group({
      Password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  public getUserData() {
    this.subscription = this.user.getuserdata().subscribe((user) => {
      this.managedPayments = user.managedPayments;
      this.isEmployeeUser = user.isEmployeeGrupoExito;
    });
  }

  public formProfile() {
    this.profileForm = this.fb.group({
      name: [
        this.name,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.namePattern),
        ],
      ],
      lastName: [
        this.lastName,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.namePattern),
        ],
      ],
    });
  }

  public formProfileCell() {
    this.profileFormCell = this.fb.group({
      phone: [
        this.phone,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern(this.numberPattern),
        ],
      ],
    });
  }

  public formAccount() {
    this.accountForm = this.fb.group({
      bank: [this.bank, Validators.required],
      typeAccount: [this.typeBankAccount, Validators.required],
      numberAccount: [
        "",
        [
          Validators.required,
          Validators.pattern(this.numberPattern),
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      cert: [null, Validators.required],
      ced1: [null, Validators.required],
      ced2: [null, Validators.required],
      description: [null, Validators.required]
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
      Password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  public formProfilePass() {
    this.profileFormPass = this.fb.group(
      {
        actualPassword: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        password: [
          "",
          [
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.pattern(new RegExp(this.passwordPattern)),
          ],
        ],
        confirmPassword: [
          "",
          [Validators.minLength(6), Validators.maxLength(20)],
        ],
      },
      {
        validator: [ConfirmPasswordValidator.MatchPassword],
      }
    );
  }

  public editName() {
    const title = "Editar Nombres y apellidos";
    const id = "names";
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
    const title = "Editar dirección";
    const id = "address";
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
    const title = "Actualizar información bancaria";
    const id = "account";
    const template = this.templateAccount;
    if (this.bank === null) {
      this.accountForm.reset();
    }

    this.nameFileCert = "";
    this.nameFileCed1 = "";
    this.nameFileCed2 = "";
    this.dialog.open(DialogEditComponent, {
      maxWidth: '450px',
      panelClass: 'editaccount',
      data: {
        title,
        template,
        id,
      },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      if (this.bank === null) {
        this.accountForm.reset();
      }
    });
  }

  public editCell() {
    const title = "Editar Celular";
    const id = "cellphone";
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
    const title = "Cambiar contraseña";
    const id = "password";
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
        if (user.state === "Success") {
          this.dialog.closeAll();
          this.user.getProfile();
          this.openSnackBar(user.userMessage, "Cerrar");
        }
      },
      (err) => {
        this.openSnackBar(err.userMessage, "Cerrar");
      }
    );
  }

  public updateAccount() {
    let data = {
      bank: this.accountForm.controls.bank.value,
      typebankaccount: this.accountForm.controls.typeAccount.value,
      bankaccountnumber: btoa(this.accountForm.controls.numberAccount.value),
      bankcertificate: this.fileBankCertificate,
      FileIdentificationCard1: this.fileCed1,
      FileIdentificationCard2: this.fileCed2,
      description: this.accountForm.controls.description.value
    };

    this.subscription = this.user
      .changeBankInformation(this.userId, data)
      .subscribe(
        (account: any) => {
          if (account.state === "Success") {
            this.dialog.closeAll();
            this.user.getProfile();
            this.openSnackBar(account.userMessage, "Cerrar");
          }
        },
        (err) => {
          this.openSnackBar(err.userMessage, "Cerrar");
        }
      );
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  public changePasswordUser() {
    let data = {
      password: btoa(this.profileFormPass.controls.actualPassword.value),
      newPassword: btoa(this.profileFormPass.controls.password.value),
    };
    this.subscription = this.auth.changePassword(data).subscribe(
      (password: any) => {
        if (password.state === "Success") {
          this.dialog.closeAll();
          this.user.getProfile();
          this.profileFormPass.reset();
          this.openSnackBar(password.userMessage, "Cerrar");
        } else {
          this.openSnackBar(password.userMessage, "Cerrar");
        }
      },
      (err) => {
        this.openSnackBar(err.userMessage, "Cerrar");
      }
    );
  }

  public showAccount() {
    this.user
      .getBankAccountNumber(btoa(this.loginForm.controls.Password.value))
      .subscribe(
        (resp: ResponseService) => {
          if (resp.state === "Success") {
            this.accountForm.controls.numberAccount.setValue(
              resp.objectResponse
            );
            this.showBankInfoUser = true;
            this.showPassword = false;
          } else {
            this.openSnackBar(resp.userMessage, "Cerrar");
          }
        },
        (err) => {
          this.openSnackBar(err.userMessage, "Cerrar");
        }
      );
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

  /**
   * Metodo para autocompletar los departamentos
   * @param departments
   */

  public displayDepartment(departments?: any): string | undefined {
    return departments ? departments.description : undefined;
  }

  public filter() {
    this.filteredDepartments = this.addressForm.controls.department.valueChanges.pipe(
      map((department) =>
        typeof department === "string" ? department : department.description
      ),
      map((department) =>
        department
          ? this._filterDepartments(department)
          : this.departments.slice()
      )
    );
  }

  public filterCities() {
    this.filteredCities = this.addressForm.controls.city.valueChanges.pipe(
      startWith(""),
      map((city) => (city ? this._filterCities(city) : this.cities.slice()))
    );
  }

  private _filterDepartments(value: any) {
    const filterValue = value.toLowerCase();
    return this.departments.filter(
      (department) =>
        department.description.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterCities(value: string) {
    const filterValue = value.toLowerCase();
    return this.cities.filter(
      (city: any) => city.description.toLowerCase().indexOf(filterValue) === 0
    );
  }

  public selectDepartment(department) {
    this.departmentDecription = department.description;
    this.departmentCode = department.code;
    this.cities = department.municipalities;
    this.addressForm.controls.city.setValue("");
    let valueDepartment = this.addressForm.controls.department.valueChanges;
    this.filterCities();

    valueDepartment.subscribe((resp) => {
      if (resp !== "") {
        this.getDepartments();
      } else {
        this.addressForm.controls.city.setValue("");
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
        if (address.state === "Success") {
          this.openSnackBar(address.userMessage, "Cerrar");
          this.user.getProfile();
          this.dialog.closeAll();
        }
      },
      (err) => {
        this.openSnackBar(err.userMessage, "Cerrar");
      }
    );
  }

  public checkDepartment() {
    if (
      this.addressForm.controls.department.value !==
      this.departmentDecription ||
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
    this.subscription = this.personalInfo
      .getDepartments()
      .subscribe((res: ResponseService) => {
        this.departments = res.objectResponse;
      });
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
          this.fileBankCertificate = reader.result;
          this.nameFileCert = nameFile;
          this.showErrorCert = false;
          this.activebutton = true;
        } else {
          this.showErrorCert = true;
          this.nameFileCert = nameFile;
          this.activebutton = false;
        }
      };
    }
  }

  public onFileChangeFilesCed1(event, param: string) {
    //console.log("Ejecuta 2")
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
          this.fileCed1 = reader.result;
          this.nameFileCed1 = nameFile;
          this.showErrorCed1 = false;
          this.activebutton = true;
        } else {
          this.showErrorCed1 = true;
          this.nameFileCed1 = nameFile;
          this.activebutton = false;
        }
      };
    }
  }
  public onFileChangeFilesCed2(event, param: string) {
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
          this.fileCed2 = reader.result;
          this.nameFileCed2 = nameFile;
          this.showErrorCed2 = false;
          this.activebutton = true;
        } else {
          this.showErrorCed2 = true;
          this.nameFileCed2 = nameFile;
          this.activebutton = false;
        }
      };
    }
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public cancelDelete() {

    this.dialog.closeAll();
    this.profileFormDelete.controls.Password.setValue("");
  }

}


