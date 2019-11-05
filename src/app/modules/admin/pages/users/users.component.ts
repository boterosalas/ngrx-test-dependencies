import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { DialogUserComponent } from "../../components/dialog-user/dialog-user.component";
import { RegisterUserService } from "src/app/services/register-user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  users: Array<any>;

  dataSource: any;

  constructor(
    private dialog: MatDialog,
    private usersService: RegisterUserService,
    private _snackBar: MatSnackBar
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.usersInfo();
    setTimeout(() => {
      this.dataSource = new MatTableDataSource<any>(this.users);
      this.dataSource.paginator = this.paginator;
    }, 1000);
  }

  public usersInfo() {
    this.usersService.getUsers().subscribe(user => {
      this.users = user;
    });
  }

  public searchUser(user) {
    console.log(user);
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

    const userStatus = dialogRef.componentInstance.state.subscribe(event => {
      if (event.target.checked === false) {
        this.changeStateUser(userId, event.target.checked);
      } else {
        if (event.target.checked === true) {
          this.changeStateUser(userId, event.target.checked);
        }
      }
    });

    const userComunications = dialogRef.componentInstance.comunications.subscribe(event => {
      if (event.target.checked === false) {
        this.changeComunications(userId, event.target.checked);
      } else {
        if (event.target.checked === true) {
          this.changeComunications(userId, event.target.checked);
        }
      }
    });

    const userVerified= dialogRef.componentInstance.verified.subscribe(event => {
      if (event.target.checked === false) {
        this.changeVerified(userId, event.target.checked);
      } else {
        if (event.target.checked === true) {
          this.changeVerified(userId, event.target.checked);
        }
      }
    });


  }

  private changeComunications(userId, value) {
    this.usersService.comunitcations(userId, value).subscribe(state => {
      if (value === true) {
        this.openSnackBar("Se ha guardado el usuario para que reciba comunicaciones", "Cerrar");
      } else {
        this.openSnackBar("Se ha guardado el usuario para que no reciba comunicaciones", "Cerrar");
      }
    });
  }

  private changeStateUser(userId, value) {
    this.usersService.statusUser(userId, value).subscribe(state => {
      if (value === true) {
        this.openSnackBar("El usuario ha sido activado", "Cerrar");
      } else {
        this.openSnackBar("El usuario ha sido inactivado", "Cerrar");
      }
    });
  }

  private changeVerified(userId, value) {
    this.usersService.verifiedUser(userId, value).subscribe(state => {
      if (value === true) {
        this.openSnackBar("Se ha verificado el usuario", "Cerrar");
      } else {
        this.openSnackBar("Se ha cambiado el usuario a no verificado", "Cerrar");
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
}
