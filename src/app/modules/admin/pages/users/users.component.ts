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
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DialogEditComponent } from "src/app/modules/clicker/components/dialog-edit/dialog-edit.component";
moment.locale("es");
import Swal from "sweetalert2";

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
  private subscription: Subscription = new Subscription();
  ext: string;
  contentType: string;
  // email: string;
  maxDate = moment(new Date());
  orderOrigin: string;
  orderBy: string;
  from: any;
  to: any;
  dateParams: any;
  disButon: boolean;
  @ViewChild("templateDialogEmail", { static: false })
  templateEmail: TemplateRef<any>;
  emailPattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
  userId: string;
  userMail: string;

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
    private fb: FormBuilder
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

    this.getRangeLabel = function(page, pageSize, length) {
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
      return startIndex + 1 + " de " + endIndex + " items de " + length;
    };
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.searchUser("");
    this.formEmail();

    // this.usersService.userInfo$
    //     .subscribe(val => {
    //       if (!!val) {
    //        this.email = val.email;
    //       }
    //     });

    this.dateForm = this.fb.group({
      dateRange: [null, Validators.required]
    });
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

  public changeEmail(){
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
      if(resp.dismiss !== 'cancel') {
        this.updateEmail();
      }
    })
  }

  public updateEmail() {
    const id = this.userId;
    let email = this.emailForm.controls.email.value;
    this.subscription = this.usersService.updateUserEmail(id, email).subscribe(
      (resp: ResponseService) => {
          this.dialog.closeAll();
          this.openSnackBar(resp.userMessage, "Cerrar");
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
    const receiveCommunications = user.receiveCommunications;
    const isEmployeeGrupoExito = user.isEmployeeGrupoExito;
    const verified = user.verified;
    const fileIdentificationCard1 = user.fileIdentificationCard1;
    const fileIdentificationCard2 = user.fileIdentificationCard2;
    const fileBankCertificate = user.fileBankCertificate;

    if (state === "Inactivo") {
      state = false;
    } else {
      if (state === "Activo" || state === "Registrado" || state === "Migrado") {
        state = true;
      }
    }

    const dialogRef = this.dialog.open(DialogUserComponent, {
      width: "649px",
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
        fileBankCertificate
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
          .subscribe((resp: ResponseService) => {
            this.download(resp);
          });
      }
    );

    this.subscription = dialogRef.componentInstance.IdentificationCard2.subscribe(
      () => {
        this.usersService
          .downloadFile(identification, "IdentificationCard2")
          .subscribe((resp: ResponseService) => {
            this.download(resp);
          });
      }
    );

    this.subscription = dialogRef.componentInstance.bankCertificate.subscribe(
      () => {
        this.usersService
          .downloadFile(identification, "BankCertificate")
          .subscribe((resp: ResponseService) => {
            this.download(resp);
          });
      }
    );

    this.subscription = dialogRef.beforeClosed().subscribe(() => {
      this.searchUser(this.paginate);
    });
  }

  private changeComunications(userId, value) {
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

  private changeStateUser(userId, value) {
    this.subscription = this.usersService
      .statusUser(userId, value)
      .subscribe(() => {
        if (value === true) {
          this.openSnackBar("El usuario ha sido activado", "Cerrar");
        } else {
          this.openSnackBar("El usuario ha sido inactivado", "Cerrar");
        }
      });
  }

  private changeVerified(userId, value) {
    this.subscription = this.usersService
      .verifiedUser(userId, value)
      .subscribe(() => {
        if (value === true) {
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
      .subscribe((resp: ResponseService) => {
        if (resp.state === "Success") {
          this.openSnackBar(resp.userMessage, "Cerrar");
          this.dateForm.reset();
          if (this.dateForm.controls.dateRange.value.startDate === null) {
            this.disButon = true;
          }
        }
      });
  }

  change() {
    this.disButon = false;
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
    this.subscription = this.usersService.updateEmployees().subscribe((resp: ResponseService)=> {
      this.openSnackBar(resp.userMessage, 'Cerrar');
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
