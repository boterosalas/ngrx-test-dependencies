import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  TemplateRef
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { LoaderService } from "src/app/services/loader.service";
import { MatDialogRef, MatDialog, MatSnackBar } from "@angular/material";
import { DialogEditComponent } from "../dialog-edit/dialog-edit.component";
import { ConfirmPasswordValidator } from "src/app/validators/confirm-password.validator";
import { MasterDataService } from 'src/app/services/master-data.service';
import { ResponseService } from 'src/app/interfaces/response';

@Component({
  selector: "app-profile-form",
  templateUrl: "./profile-form.component.html",
  styleUrls: ["./profile-form.component.scss"]
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private auth: AuthService,
    private loader: LoaderService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private personalInfo: MasterDataService
  ) {}

  @ViewChild("templateDialog", { static: false }) template: TemplateRef<any>;
  @ViewChild("templateDialogCell", { static: false }) templateCell: TemplateRef<any>;
  @ViewChild("templateDialogPass", { static: false }) templatePass: TemplateRef<any>;
  @ViewChild("templateDialogAccount", { static: false}) templateAccount: TemplateRef<any>;

  private subscription: Subscription = new Subscription();
  profileForm: FormGroup;
  profileFormCell: FormGroup;
  profileFormPass: FormGroup;
  accountForm: FormGroup;
  loginForm: FormGroup;
  isLoggedIn: any;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  id: string;
  address: string;
  bank: string;
  bankAccountNumber: string;
  typeBankAccount: string;
  userId: string;
  isEmployee: boolean;
  userInfo: any;

  numberPattern = "^(0|[0-9][0-9]*)$";
  namePattern = "[a-zA-Z0-9 àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+";
  passwordPattern = "(?=.*[a-zA-Z])(?=.*[0-9])";
  msg:string;
  classMsg: string;
  banks = [];
  typeAccount = [
    {id: 1, description: 'Ahorros'},
    {id: 2, description: 'Corriente'},
  ]

  showBankInfoUser: boolean;
  showPassword: boolean = true;

  ngOnInit() {
    this.subscription = this.user.userInfo$.subscribe(val => {
      if (!!val) {
        this.userInfo = val;
        this.name = val.firstNames;
        this.lastName = val.lastNames;
        this.email = val.email;
        this.phone = val.cellphone;
        this.id = val.identification;
        this.address = val.address;
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
    });
    this.accountBankForm();
    this.getBanks();
  }

  public formProfile() {
    this.profileForm = this.fb.group({
      name: [
        this.name,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.namePattern)
        ]
      ],
      lastName: [
        this.lastName,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.namePattern)
        ]
      ]
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
          Validators.pattern(this.numberPattern)
        ]
      ]
    });
  }

  public formAccount() {
    this.accountForm = this.fb.group({
      bank: [this.bank , Validators.required],
      typeAccount: [this.typeBankAccount, Validators.required],
      numberAccount: ['' , [Validators.required, Validators.pattern(this.numberPattern), Validators.minLength(5), Validators.maxLength(20)]],
    });
  }

  public accountBankForm() {
    this.loginForm = this.fb.group({
      Password: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
      ]
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
          ]
        ],
        password: [
          "",
          [
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.pattern(new RegExp(this.passwordPattern))
          ]
        ],
        confirmPassword: [
          "",
          [
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ]
      },
      {
        validator: [ConfirmPasswordValidator.MatchPassword]
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
        id
      }
    });
  }

  public editAccount() {
    this.showBankInfoUser = false;
    this.showPassword = true;
    this.loginForm.reset();
    const title = "";
    const id = "account";
    const template = this.templateAccount;

    this.dialog.open(DialogEditComponent, {
      data: {
        title,
        template,
        id
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
        id
      }
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
        id
      }
    });
  }

  editUser() {
    this.userInfo.firstNames = this.profileForm.controls.name.value;
    this.userInfo.lastNames = this.profileForm.controls.lastName.value;
    this.userInfo.cellphone = this.profileFormCell.controls.phone.value;
    this.subscription = this.user
      .updateUser(this.userId, this.userInfo)
      .subscribe(
        (resp: any) => {
          if (resp.state === "Success") {
            this.dialog.closeAll();
            this.user.getProfile();
            this.openSnackBar(resp.userMessage, "Cerrar");
          }
        },
        err => {
          this.openSnackBar(err.userMessage, "Cerrar");
        }
      );
  }

  updateAccount() {

    let data = {
      bank: this.accountForm.controls.bank.value,
      typebankaccount: this.accountForm.controls.typeAccount.value,
      bankaccountnumber: btoa(this.accountForm.controls.numberAccount.value)
    }

    this.subscription = this.user
    .changeBankInformation(this.userId, data)
    .subscribe(
      (resp: any) => {
        if (resp.state === "Success") {
          this.dialog.closeAll();
          this.user.getProfile();
          this.openSnackBar(resp.userMessage, "Cerrar");
        }
      },
      err => {
        this.openSnackBar(err.userMessage, "Cerrar");
      }
    );
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  changePasswordUser() {
    let data = {
      password: btoa(this.profileFormPass.controls.actualPassword.value),
      newPassword:btoa(this.profileFormPass.controls.password.value)
    }
    this.subscription = this.auth.changePassword(this.userId, data).subscribe(
      (resp: any) => {
        if (resp.state === "Success") {
          this.dialog.closeAll();
          this.user.getProfile();
          this.profileFormPass.reset();
          this.openSnackBar(resp.userMessage, "Cerrar");
        } else {
          this.openSnackBar(resp.userMessage, "Cerrar");
        }
      },
      err => {
        this.openSnackBar(err.userMessage, "Cerrar");
      }
    );
  }

  public showAccount() {
    this.user.getBankAccountNumber(btoa(this.loginForm.controls.Password.value)).subscribe((resp:ResponseService) => {
      if (resp.state === "Success") {
      this.accountForm.controls.numberAccount.setValue(resp.objectResponse);
      this.showBankInfoUser = true;
      this.showPassword = false;
      } else {
        this.openSnackBar(resp.userMessage, "Cerrar");
      }
    },
    err => {
      this.openSnackBar(err.userMessage, "Cerrar");
    })
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
