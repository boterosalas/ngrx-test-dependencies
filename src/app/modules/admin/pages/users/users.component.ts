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
  MatPaginatorIntl,
  MatDialogRef
} from "@angular/material";
import { DialogUserComponent } from "../../components/dialog-user/dialog-user.component";
import { Subscription } from "rxjs/internal/Subscription";
import { UserService } from "src/app/services/user.service";
import { ResponseService } from "src/app/interfaces/response";
import { LinksService } from "src/app/services/links.service";
import * as moment from "moment";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DialogEditComponent } from "src/app/modules/clicker/components/dialog-edit/dialog-edit.component";
moment.locale("es");
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { UtilsService } from "src/app/services/utils.service";
import { ModalGenericComponent } from "src/app/modules/shared/components/modal-generic/modal-generic.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent extends MatPaginatorIntl
  implements OnInit, OnDestroy {
  dataSource: any;
  pageIndex: number = 0;
  pageSize: number = 50;
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
  orderby: string;
  from: any;
  to: any;
  dateParams: any;
  dateParamsReport: any;
  dateRango: any;
  disButon$: Observable<boolean>;
  disableButon: boolean;
  @ViewChild("templateDialogEmail", { static: false })
  templateEmail: TemplateRef<any>;
  @ViewChild("templateDialogFilter", { static: false })
  templateFilter: TemplateRef<any>;
  dialogRef: MatDialogRef<any>;
  emailPattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
  userId: string;
  userMail: string;
  dateNoVisible: boolean;
  export = false;
  filterData = [{
      searchtext: "",
      from: null,
      to: null,
      datestart: null,
      dateend:null,
      state: null,
      comunications: null,
      commissions: null,
      business: [],
      stateverification: null,
      documents: null,
      export: false,
      orderby:  "",
      ordination: ""
  }]
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
  },
  {
    titulo: "Respuestas de cuentas eliminadas",
    value: 6
  },
  {
    titulo: "Referidos",
    value: 7
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
    localStorage.removeItem('bussiness');
    localStorage.removeItem('formFilter');
  }

  checkRole() {
    this.utils.checkPermision();
  }

  pagination(paginate: any) {
    this.pageIndex = paginate;
    this.from = (this.pageSize * this.pageIndex + 1) - 50;
    this.to = (this.pageSize * (this.pageIndex + 1)) - 50;
    this.searchUser(this.paginate, this.from, this.to);
    
  }


  /**
   * Metodo para buscar usuarios
   * @param term
   * @param from
   * @param to
   * @param orderOrigin
   * @param orderby
   */

  public searchUser(term, from = 1, to = this.pageTo, orderOrigin = "",   orderby = ""){
    
    this.filterData[0].searchtext = term;
    this.filterData[0].to = to;
    this.filterData[0].from = from;
    this.filterData[0].orderby = orderOrigin;
    this.filterData[0].ordination = orderby;

    if (term !== this.paginate) {
      this.paginate = term;
      this.pageIndex = 0;
    }

      this.subscription = this.file.searchUsers(this.filterData).subscribe((user: any) => {
          this.totalItems = user.total;
          this.dataSource = user.users;
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
  
  public openModalFilters() {
    const template = this.templateFilter;
    const title = "Filtrar Usuarios";

    this.dialogRef = this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        template
      }
    });

  }

  public onNoClick(): void {
    this.dialogRef.close();
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

    if (isEmployeeGrupoExito === "INTERNO") {
      isEmployeeGrupoExito = true;
    } else {
      isEmployeeGrupoExito = false;
    }

    this.subscription = this.usersService.getUserInfoAditional(user.userId).subscribe((resp: ResponseService) => {
      if (resp.state === "Success") {
        const fileIdentificationCard1 = resp.objectResponse.identificationcard1;
        const fileIdentificationCard2 = resp.objectResponse.identificationcard2;
        const fileBankCertificate = resp.objectResponse.bankcertificate;
        const dateCed1 = resp.objectResponse.maxdateidentificationcard1;
        const dateCed2 = resp.objectResponse.maxdateidentificationcard2;
        const dateCertBank = resp.objectResponse.maxdatebankcertificate;
        const dateRUT = resp.objectResponse.maxdaterut;
        const AntdateCed1 = resp.objectResponse.mindateidentificationcard1;
        const AntdateCed2 = resp.objectResponse.mindateidentificationcard2;
        const AntdateCertBank = resp.objectResponse.mindatebankcertificate;
        const AntdateRUT = resp.objectResponse.mindaterut;
        const extensionIdentificationCard1 = resp.objectResponse.maxextensiondateidentificationcard1;
        const extensionIdentificationCard2 = resp.objectResponse.maxextensiondateidentificationcard2;
        const extensionBankCertificate = resp.objectResponse.maxextensiondatebankcertificate;
        const extensionRUT = resp.objectResponse.maxextensiondaterut;
        const responseAccountBank = resp.objectResponse.responseaccountbank;
        // const fileRUT = resp.objectResponse.rut;

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
            dateRUT,
            AntdateCed1,
            AntdateCed2,
            AntdateCertBank,
            AntdateRUT,
            extensionIdentificationCard1,
            extensionIdentificationCard2,
            extensionBankCertificate,
            extensionRUT,
            responseAccountBank
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
          value => {
            this.changeVerified(userId, value);
          }
        );
    
        this.subscription = dialogRef.componentInstance.downloadFiles.subscribe(
          data => {
            this.downloadFiles(data);
          }
        );
    
        this.subscription = dialogRef.beforeClosed().subscribe(() => {
          this.searchUser(this.paginate);
        });
      }
    })
  }

  private downloadFiles(data) {
    this.usersService
      .downloadFiles(data)
      .subscribe((respid: any) => {
        this.downloadBlob(respid, "application/zip");
      });
  }

  private downloadBlob(data, type) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");

    downloadLink.href = url;
    downloadLink.download = "archivo.zip";
    downloadLink.click();
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
      .subscribe((data: ResponseService) => {
        this.openSnackBar(data.userMessage, "Cerrar");
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
    this.subscription = this.usersService.getExternalUsers().subscribe((respExport: ResponseService) => {
      this.dateForm.reset();
      if (this.dateForm.controls.dateRange.value.startDate === null) {
        this.disableButon = true;
      }
      this.openSnackBar(respExport.userMessage, 'Cerrar');
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onChangeSelected(event) {
    if (event === "Datos de gamificación" || event === "Usuarios externos") {
      this.dateNoVisible = true;
      this.disableButon = false
      this.dateForm.get('dateRange').setValue(null)
    } else {
      this.dateNoVisible = false;
      this.aux = 1
      this.disableButon = true
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
      start: this.dateForm.controls.dateRange.value.startDate.format('Yyyy-MM-dd HH:mm:ss'),
      end: this.dateForm.controls.dateRange.value.endDate.format('Yyyy-MM-dd HH:mm:ss')
    };
    this.subscription = this.usersService.getReportCommets(this.dateParamsReport)
      .subscribe((respExcel: ResponseService) => {
        if (respExcel.state === "Success") {
          this.openSnackBar(respExcel.userMessage, "Cerrar");
          this.dateForm.reset();
          if (this.dateForm.controls.dateRange.value.startDate === null) {
            this.disableButon = true;
          }
        }
      });
  }

  public getDeleteComments() {
    this.dateParamsReport = {
      start: this.dateForm.controls.dateRange.value.startDate.format("YYYY-MM-DD"),
      end: this.dateForm.controls.dateRange.value.endDate.format("YYYY-MM-DD")
    };
    this.subscription = this.usersService.getDeleteCommetsRest(this.dateParamsReport)
      .subscribe((respExcel: ResponseService) => {
        if (respExcel.state === "Success") {
          this.openSnackBar(respExcel.userMessage, "Cerrar");
          this.dateForm.reset();
          if (this.dateForm.controls.dateRange.value.startDate === null) {
            this.disableButon = true;
          }
        }
      });
  }

  public getRefers() {
    this.dateParamsReport = {
      start: this.dateForm.controls.dateRange.value.startDate.format("YYYY-MM-DD"),
      end: this.dateForm.controls.dateRange.value.endDate.format("YYYY-MM-DD")
    };
    this.subscription = this.usersService.getReportReferral(this.dateParamsReport)
      .subscribe((respReferral: ResponseService) => {
        if (respReferral.state === "Success") {
          this.openSnackBar(respReferral.userMessage, "Cerrar");
          this.dateForm.reset();
          if (this.dateForm.controls.dateRange.value.startDate === null) {
            this.disableButon = true;
          }
        }
      });
  }

  public getAnyReport() {
    if (this.dateForm.controls.tipoReport.value === "1") {
      this.getUserExcel();
    } else if (this.dateForm.controls.tipoReport.value === "2") {
      this.exportusers();
    } else if (this.dateForm.controls.tipoReport.value === "3") {
      this.getReportChangeExcel();
    } else if (this.dateForm.controls.tipoReport.value === "4") {
      this.getGamification();
    } else if (this.dateForm.controls.tipoReport.value === "5") {
      this.getComments();
    } else if (this.dateForm.controls.tipoReport.value === "6") {
      this.getDeleteComments();
    } else if (this.dateForm.controls.tipoReport.value === "7") {
      this.getRefers();
    }
  }

  public exportUsersFilter(){
    this.filterData[0].export = true;
    this.subscription = this.file.searchUsers(this.filterData).subscribe(() => {
      this.openSnackBar('Al terminar de procesar el archivo se enviará un correo', 'Cerrar');
    });
  }

  public infoFilter(data) {

    this.filterData = [{
      searchtext: this.paginate,
      from: 1,
      to: 50,
      datestart: data.dateStart,
      dateend:data.dateEnd,
      state: data.state,
      comunications: data.comunications,
      commissions: data.commissions,
      business: data.business,
      stateverification: data.stateVerification,
      documents: data.documents,
      export: this.export,
      orderby:  "IDENTIFICATION",
      ordination: "ASC"
    }]

    this.pageIndex = 0;

    this.subscription = this.file.searchUsers(this.filterData).subscribe((user: any) => {
      this.totalItems = user.total;
      this.dataSource = user.users
    });

  }

}
