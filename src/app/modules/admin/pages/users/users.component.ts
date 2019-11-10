import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatSnackBar,
  MatPaginatorIntl
} from "@angular/material";
import { DialogUserComponent } from "../../components/dialog-user/dialog-user.component";
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent extends MatPaginatorIntl implements OnInit, OnDestroy {
  users: Array<any>;
  dataSource: any;
  pageIndex: number = 0;
  pageSize: number;
  pageTo: number = 50;
  totalItems: number;
  paginate: string;
  private subscription: Subscription = new Subscription();

  constructor(
    private dialog: MatDialog,
    private usersService: UserService,
    private _snackBar: MatSnackBar
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
    this.searchUser('');
  }

  public searchUser(term, from = 1, to = this.pageTo) {
    if (term !== this.paginate) {
      this.paginate = term;
      this.pageIndex = 0;
    }
    const params = { term, from, to };
    this.subscription = this.usersService.searchUsers(params).subscribe((user:any) => {
      this.users = user.users;
      this.totalItems = user.total;
      this.dataSource = new MatTableDataSource<any>(this.users);
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

    this.subscription =  dialogRef.beforeClosed().subscribe(() => {
      this.searchUser(this.paginate);
    })

  }

  private changeComunications(userId, value) {
    this.usersService.comunitcations(userId, value).subscribe(()=> {
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

  private changeStateUser(userId, value) {
    this.usersService.statusUser(userId, value).subscribe(()=> {
      if (value === true) {
        this.openSnackBar("El usuario ha sido activado", "Cerrar");
      } else {
        this.openSnackBar("El usuario ha sido inactivado", "Cerrar");
      }
    });
  }

  private changeVerified(userId, value) {
    this.usersService.verifiedUser(userId, value).subscribe(()=> {
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
      duration: 2000
    });
  }

  public pagination(paginate: any) {
    this.pageIndex = paginate.pageIndex;
    paginate.length = this.totalItems;
    const from = paginate.pageSize * paginate.pageIndex + 1;
    const to = paginate.pageSize * (paginate.pageIndex + 1);
    this.searchUser(this.paginate, from, to);
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}
