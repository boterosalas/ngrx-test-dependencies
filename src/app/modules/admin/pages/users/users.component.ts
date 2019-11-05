import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { DialogUserComponent } from "../../components/dialog-user/dialog-user.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  users = [
    {
      identification: "123456789",
      firstNames: "David",
      lastNames: "Betancur Jaramillo",
      cellphone: "123456789",
      email: "david.betancur@pragma.com.co",
      address: 'cll falsa 123 # 12sur - 21 Medellín, Antioquía',
      bank: 'Bancolombia',
      typeBankAccount: 'Ahorros',
      bankAccountNumber:'5894523687',
      status: true,
      comunications: false,
      origin: false,
      verified: true,
      fileIdentificationCard1: 'https://wsr.registraduria.gov.co/IMG/jpg/cedula_frontal.jpg',
      fileIdentificationCard2: 'https://wsr.registraduria.gov.co/IMG/jpg/cedula_frontal.jpg',
      fileBankCertificate: 'https://assets.website-files.com/5c4ba48132b5c62df3e9c1b4/5d291b7b96131e248826184c_Bancolombia%20-%20Certificado%20Retenci%C3%B3n%20en%20la%20fuente-01.jpg'
    }
  ];

  dataSource = new MatTableDataSource<any>(this.users);

  constructor(private dialog: MatDialog) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  public userData(user) {
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
    const status = user.status;
    const comunications = user.comunications;
    const origin = user.origin;
    const verified = user.verified;
    const fileIdentificationCard1 = user.fileIdentificationCard1;
    const fileIdentificationCard2 = user.fileIdentificationCard2;
    const fileBankCertificate = user.fileBankCertificate;
    this.dialog.open(DialogUserComponent, {
      data: {
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
        status,
        comunications,
        origin,
        verified,
        fileIdentificationCard1,
        fileIdentificationCard2,
        fileBankCertificate
      }
    });
  }
}
