import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  TemplateRef
} from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatSnackBar,
  MatPaginatorIntl
} from "@angular/material";
import { DialogUserComponent } from "../../components/dialog-user/dialog-user.component";
import { Subscription } from "rxjs/internal/Subscription";
import { UserService } from "src/app/services/user.service";
import { ResponseService } from "src/app/interfaces/response";
import { LinksService } from "src/app/services/links.service";
import * as moment from "moment";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { DialogEditComponent } from "src/app/modules/clicker/components/dialog-edit/dialog-edit.component";
moment.locale("es");
import Swal from "sweetalert2";
import { observable, Observable } from "rxjs";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent extends MatPaginatorIntl
  implements OnInit, OnDestroy {
  users: Array<any>;
  dataSource: any;
  pageIndex: number = 0;
  pageSize: number;
  pageTo: number = 50;
  totalItems: number;
  paginate: string;
  dateForm: FormGroup;
  emailForm: FormGroup;
  dateReportChangeForm: FormGroup;
  private subscription: Subscription = new Subscription();
  ext: string;
  contentType: string;
  tipoReporte: any;
  aux: number;
  maxDate = moment(new Date());
  orderOrigin: string;
  orderBy: string;
  from: any;
  to: any;
  dateParams: any;
  dateParamsReport: any;
  dateRango: any;
  disButon$: Observable<boolean>;
  disableButon: boolean;
  @ViewChild("templateDialogEmail", { static: false })
  templateEmail: TemplateRef<any>;
  emailPattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
  userId: string;
  userMail: string;
  dateNoVisible: boolean;
  selecteds = [{
    titulo: "General",
    value: 1
  }, {
    titulo: "Usuarios externos",
    value: 2
  },
  {
    titulo: "Cambios de datos bancarios",
    value: 3
  },
  {
    titulo: "Datos de gamificación",
    value: 4
  },
  {
    titulo: "Comentarios & Sugerencias",
    value: 5
  }
  ]
  locale = {
    locale: "es",
    direction: "ltr", // could be rtl
    weekLabel: "W",
    separator: " a ", // default is ' - '
    cancelLabel: "Cancelar", // detault is 'Cancel'
    applyLabel: "Aplicar", // detault is 'Apply'
    clearLabel: "Limpiar", // detault is 'Clear'
    customRangeLabel: "Custom range",
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: 1 // first day is monday
  };

  constructor(
    private dialog: MatDialog,
    private usersService: UserService,
    private _snackBar: MatSnackBar,
    private file: LinksService,
    private fb: FormBuilder,
    public utils: UtilsService
  ) {
    super();

    /**
     * Traduccion del paginador
     */
    //this.disButon$ = Observable.create(observer => {
    //  observer.next(true);
    //  observer.complete();
    //});
    this.itemsPerPageLabel = "Items por página";
    this.nextPageLabel = "Página siguiente";
    this.previousPageLabel = "Página anterior";
    this.lastPageLabel = "Última página";
    this.firstPageLabel = "Primera página";

    this.getRangeLabel = function (page, pageSize, length) {
      if (length === 0 || pageSize === 0) {
        return "0 de " + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return startIndex + 1 + " de " + endIndex + " ítems de " + length;
    };
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.searchUser("");
    this.formEmail();
    this.dateNoVisible = true;
    //this.disButon = true;
    this.disableButon = true;
    this.aux = 0;
    this.dateForm = this.fb.group({
      dateRange: [null],
      tipoReport: [null, Validators.required]
    });
    this.dateReportChangeForm = this.fb.group({
      dateRange: [null, Validators.required]
    });
    this.checkRole();
  }
  checkRole() {
    this.utils.checkPermision();
  }
  /**
   * Metodo para buscar usuarios
   * @param term
   * @param from
   * @param to
   * @param orderOrigin
   * @param orderBy
   */

  public searchUser(
    term,
    from = 1,
    to = this.pageTo,
    orderOrigin = "",
    orderBy = ""
  ) {
    if (term !== this.paginate) {
      this.paginate = term;
      this.pageIndex = 0;
    }
    const params = { term, from, to, orderOrigin, orderBy };
    this.subscription = this.file.searchUsers(params).subscribe((user: any) => {
      this.users = user.users;
      this.totalItems = user.total;
      this.dataSource = new MatTableDataSource<any>(this.users);
    });
  }

  public userEmail(user) {
    const userId = user.userId;
    const email = user.email;
    const template = this.templateEmail;
    const title = "Actualizar correo";

    this.dialog.open(DialogEditComponent, {
      data: {
        title,
        template,
        userId,
        email
      }
    });

    this.emailForm.controls.email.setValue(email);
    this.userMail = email;
    this.userId = userId;
  }

  public changeEmail() {
    Swal.fire({
      title: "Actualizar correo",
      text: '¿Estás seguro de actualizar el correo?',
      type: "info",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonClass: "updateok order-last",
      cancelButtonClass: "updatecancel",
      allowOutsideClick: false
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.updateEmail();
      }
    })
  }

  public updateEmail() {
    const id = this.userId;
    let email = this.emailForm.controls.email.value;
    this.subscription = this.usersService.updateUserEmail(id, email).subscribe(
      (respEmail: ResponseService) => {
        this.dialog.closeAll();
        this.openSnackBar(respEmail.userMessage, "Cerrar");
        this.searchUser(this.paginate);
      },
      err => {
        this.openSnackBar(err.userMessage, "Cerrar");
      }
    );
  }

  public formEmail() {
    this.emailForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(this.emailPattern),
          Validators.maxLength(64)
        ]
      ]
    });
  }

  public userData(user) {
    const userId = user.userId;
    const identification = user.identification;
    const name = user.firstNames;
    const lastNames = user.lastNames;
    const cellphone = user.cellphone;
    const email = user.email;
    const address = user.address;
    const bank = user.bank;
    const typeBankAccount = user.typeBankAccount;
    const account = user.account;
    const bankAccountNumber = user.bankAccountNumber;
    let state = user.state;
    let receiveCommunications = user.receiveCommunications;
    let isEmployeeGrupoExito = user.isEmployeeGrupoExito;
    let verified = user.verified;
    const fileIdentificationCard1 = user.fileIdentificationCard1;
    const fileIdentificationCard2 = user.fileIdentificationCard2;
    const fileBankCertificate = user.fileBankCertificate;
    const dateCed1 = user.maxdateidentificationcard1;
    const dateCed2 = user.maxdateidentificationcard2;
    const dateCertBank = user.maxdatebankcertificate;
    const AntdateCed1 = user.mindateidentificationcard1;
    const AntdateCed2 = user.mindateidentificationcard2;
    const AntdateCertBank = user.mindatebankcertificate;

    if (state === "Inactivo") {
      state = false;
    } else {
      if (state === "Activo" || state === "Registrado" || state === "Migrado") {
        state = true;
      }
    }
    if (receiveCommunications === "Si") {
      receiveCommunications = true;
    } else {
      receiveCommunications = false;
    }
    if (verified === "No") {
      verified = false;
    } else {
      verified = true;
    }
    if (isEmployeeGrupoExito === "INTERNO") {
      isEmployeeGrupoExito = true;
    } else {
      isEmployeeGrupoExito = false;
    }
    const dialogRef = this.dialog.open(DialogUserComponent, {

      data: {
        userId,
        identification,
        name,
        lastNames,
        cellphone,
        email,
        address,
        bank,
        typeBankAccount,
        bankAccountNumber,
        account,
        state,
        receiveCommunications,
        isEmployeeGrupoExito,
        verified,
        fileIdentificationCard1,
        fileIdentificationCard2,
        fileBankCertificate,
        dateCed1,
        dateCed2,
        dateCertBank,
        AntdateCed1,
        AntdateCed2,
        AntdateCertBank
      }
    });

    this.subscription = dialogRef.componentInstance.state.subscribe(event => {
      if (event.target.checked === false) {
        this.changeStateUser(userId, event.target.checked);
      } else {
        if (event.target.checked === true) {
          this.changeStateUser(userId, event.target.checked);
        }
      }
    });

    this.subscription = dialogRef.componentInstance.comunications.subscribe(
      event => {
        if (event.target.checked === false) {
          this.changeComunications(userId, event.target.checked);
        } else {
          if (event.target.checked === true) {
            this.changeComunications(userId, event.target.checked);
          }
        }
      }
    );

    this.subscription = dialogRef.componentInstance.verified.subscribe(
      event => {
        if (event.target.checked === false) {
          this.changeVerified(userId, event.target.checked);
        } else {
          if (event.target.checked === true) {
            this.changeVerified(userId, event.target.checked);
          }
        }
      }
    );

    this.subscription = dialogRef.componentInstance.IdentificationCard1.subscribe(
      () => {
        this.usersService
          .downloadFile(identification, "IdentificationCard1")
          .subscribe((respid1: ResponseService) => {
            this.download(respid1);
          });
      }
    );

    this.subscription = dialogRef.componentInstance.IdentificationCard2.subscribe(
      () => {
        this.usersService
          .downloadFile(identification, "IdentificationCard2")
          .subscribe((respid2: ResponseService) => {
            this.download(respid2);
          });
      }
    );

    this.subscription = dialogRef.componentInstance.bankCertificate.subscribe(
      () => {
        this.usersService
          .downloadFile(identification, "BankCertificate")
          .subscribe((respBank: ResponseService) => {
            this.download(respBank);
          });
      }
    );

    this.subscription = dialogRef.beforeClosed().subscribe(() => {
      this.searchUser(this.paginate);
    });
  }

  public changeComunications(userId, value) {
    this.subscription = this.usersService
      .comunitcations(userId, value)
      .subscribe((user: any) => {
        if (value === true) {
          this.openSnackBar(
            "Se ha guardado el usuario para que reciba comunicaciones",
            "Cerrar"
          );
        } else {
          this.openSnackBar(
            "Se ha guardado el usuario para que no reciba comunicaciones",
            "Cerrar"
          );
        }
      });
  }

  /**
   * Metodo para descargar archivos del usuario
   * @param fileDownload
   */

  private download(fileDownload) {
    if (fileDownload.state !== "Error") {
      let base64 = fileDownload.objectResponse;
      let splitbase64 = base64.split(",");
      let file = splitbase64[1];

      if (file.startsWith("/9j/")) {
        this.ext = ".jpg";
        this.contentType = "image/jpeg";
      } else {
        this.ext = ".pdf";
        this.contentType = "application/pdf";
      }

      const linkSource = `data:${this.contentType};base64,${file}`;
      const downloadLink = document.createElement("a");
      const fileName = `archivo${this.ext}`;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      this.openSnackBar(fileDownload.userMessage, "Cerrar");
    }
  }

  public changeStateUser(userId, value) {
    this.subscription = this.usersService
      .statusUser(userId, value)
      .subscribe(() => {
        if (value === false) {
          this.openSnackBar("El usuario ha sido inactivado", "Cerrar");
        } else {
          this.openSnackBar("El usuario ha sido activado", "Cerrar");
        }
      });
  }

  public changeVerified(userId, value) {
    this.subscription = this.usersService
      .verifiedUser(userId, value)
      .subscribe(() => {
        if (value !== false) {
          this.openSnackBar("Se ha verificado el usuario", "Cerrar");
        } else {
          this.openSnackBar(
            "Se ha cambiado el usuario a no verificado",
            "Cerrar"
          );
        }
      });
  }

  /**
   * Abre el mensaje de confirmacion de copiado del link
   * @param message
   * @param action
   */

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  public pagination(paginate: any) {
    this.pageIndex = paginate.pageIndex;
    paginate.length = this.totalItems;
    this.from = paginate.pageSize * paginate.pageIndex + 1;
    this.to = paginate.pageSize * (paginate.pageIndex + 1);
    this.searchUser(this.paginate, this.from, this.to);
  }

  public getUserExcel() {
    this.dateParams = {
      start: this.dateForm.controls.dateRange.value.startDate.format(),
      end: this.dateForm.controls.dateRange.value.endDate.format()
    };

    this.subscription = this.file
      .getUsersExcel(this.dateParams)
      .subscribe((responseExcel: ResponseService) => {
        if (responseExcel.state === "Success") {
          this.openSnackBar(responseExcel.userMessage, "Cerrar");
          this.dateForm.reset();
          if (this.dateForm.controls.dateRange.value.startDate === null) {
            //this.disButon = true;
            this.disableButon = true;
          }
        }
      });
  }
  public getReportChangeExcel() {
    this.dateParamsReport = {
      start: this.dateForm.controls.dateRange.value.startDate.format(),
      end: this.dateForm.controls.dateRange.value.endDate.format()
    };
    this.subscription = this.file.getHistoricalBankInformation(this.dateParamsReport)
      .subscribe((respExcel: ResponseService) => {
        if (respExcel.state === "Success") {
          this.openSnackBar(respExcel.userMessage, "Cerrar");
          this.dateForm.reset();
          if (this.dateForm.controls.dateRange.value.startDate === null) {
            //this.disButon = true;
            this.disableButon = true;
          }
        }
      });
  }

  change() {
    if (this.aux === 0 || this.aux === 1) {
      this.aux = 2
    }
    else {
      this.disableButon = false
    }
    //console.log("Entra")


    //this.disButon = false;
    //  console.log("Entra por aqui");

    //this.disButon$ = Observable.create(observer => {
    //  observer.next(false);
    //  observer.complete();
    //});

  }

  sort(event) {
    let name = event.active.toUpperCase();
    let direction = event.direction.toUpperCase();
    if (direction === "") {
      name = "";
    }
    this.searchUser(this.paginate, this.from, this.to, name, direction);
  }

  public updateEmployee() {
    this.subscription = this.usersService.updateEmployees().subscribe((respUpdate: ResponseService) => {
      this.openSnackBar(respUpdate.userMessage, 'Cerrar');
    })
  }

  public exportusers() {
    //this.dateParamsReport = {
    //  start: this.dateForm.controls.dateRange.value.startDate.format(),
    //  end: this.dateForm.controls.dateRange.value.endDate.format()
    //};
    this.subscription = this.usersService.getExternalUsers().subscribe((respExport: ResponseService) => {
      this.dateForm.reset();
      if (this.dateForm.controls.dateRange.value.startDate === null) {
        //this.disButon = true;
        this.disableButon = true;
      }
      this.openSnackBar(respExport.userMessage, 'Cerrar');
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onChangeSelected(event) {
    if (event === "Datos de gamificación" || event === "Usuarios externos" || event === "Comentarios & Sugerencias") {
      this.dateNoVisible = true;
      //this.dateForm.get('dateRange').clearValidators();
      //this.dateForm.updateValueAndValidity();
      this.disableButon = false

      //this.dateRango = null;
      this.dateForm.get('dateRange').setValue(null)
    } else {
      this.dateNoVisible = false;
      //this.dateForm.get('dateRange').setValidators([Validators.required]);
      //this.dateForm.updateValueAndValidity();
      this.aux = 1
      this.disableButon = true

      //this.dateRango = null;
      this.dateForm.get('dateRange').setValue(null)
    }

  }
  public getGamification() {
    this.subscription = this.usersService.getReportGamification().subscribe((respuExportGamification: ResponseService) => {
      this.dateForm.reset();
      if (this.dateForm.controls.dateRange.value.startDate === null) {
        this.disableButon = true;
      }
      this.openSnackBar(respuExportGamification.userMessage, 'Cerrar');
    })
  }
  public getComments() {
    this.dateParamsReport = {
      start: this.dateForm.controls.dateRange.value.startDate.format(),
      end: this.dateForm.controls.dateRange.value.endDate.format()
    };
    this.subscription = this.file.getHistoricalBankInformation(this.dateParamsReport)
      .subscribe((respExcel: ResponseService) => {
        if (respExcel.state === "Success") {
          this.openSnackBar(respExcel.userMessage, "Cerrar");
          this.dateForm.reset();
          if (this.dateForm.controls.dateRange.value.startDate === null) {
            //this.disButon = true;
            this.disableButon = true;
          }
        }
      });
  }
  public getAnyReport() {
    if (this.dateForm.controls.tipoReport.value === "1") {
      this.getUserExcel();
      //this.disableButon = false;
    } else if (this.dateForm.controls.tipoReport.value === "2") {
      this.exportusers();
      //this.disableButon = false;
    } else if (this.dateForm.controls.tipoReport.value === "3") {
      this.getReportChangeExcel();
      //this.disableButon = false;
    } else if (this.dateForm.controls.tipoReport.value === "4") {
      this.getGamification();
    } else if (this.dateForm.controls.tipoReport.value === "5") {
      this.getComments();
    }

  }
}
