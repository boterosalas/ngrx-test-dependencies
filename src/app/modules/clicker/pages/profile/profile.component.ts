import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ResponseService } from 'src/app/interfaces/response';
import { ActivatedRoute } from '@angular/router';
import { MatTabGroup } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  userId: string;
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
  verified: boolean;
  @ViewChild('tabGroup', { static: true }) tabGroup: MatTabGroup;
  managedPayments: boolean;
  isEmployee: boolean;
  profile = false;

  constructor(private user: UserService, public auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.user.getProfile();
    this.getUserData();
    this.subscription = this.user.userInfo$.subscribe((val) => {
      if (!!val) {
        this.userId = val.userId;
        this.id = val.identification;
        this.verified = val.verified;
      }
    });

    this.route.params.subscribe((param) => {
      if (param.pagos === 'pagos') {
        const interval = setInterval(() => {
          this.tabGroup.selectedIndex = 3;
          if (document.querySelector('.mat-tab-label[aria-posinset="3"]')) {
            clearInterval(interval);
          }
        }, 1000);
      }
    });

    setTimeout(() => {
      document.querySelector('.mat-tab-label[aria-posinset="1"]').classList.add('gtmPerfilClicCuentaClickam');

      if (document.querySelector('.mat-tab-label[aria-posinset="2"]')) {
        document.querySelector('.mat-tab-label[aria-posinset="2"]').classList.add('gtmPerfilClicInfoirmacionAdicionalClickam');
      }

      if (document.querySelector('.mat-tab-label[aria-posinset="3"]')) {
        document.querySelector('.mat-tab-label[aria-posinset="3"]').classList.add('gtmPerfilClicGestionarPagosClickam');
      }
    }, 1000);
  }

  public reset(file) {
    file.nameFileCed1 = '';
    file.fileIdentificationCard1 = null;
    file.nameFileCed2 = '';
    file.fileIdentificationCard2 = null;
    file.nameFileCert = '';
    file.fileBankCertificate = null;
    // file.nameFileRut = "";
    // file.fileRut = null;
  }

  /**
   * Metodo para enviar los archivos bancarios y de identificacion del usuario
   * @param files archivos
   */

  public sendFiles(files) {
    const sendvalues = {
      userid: this.userId,
      value: true,
      identification: this.id,
      identificationCard1: files.fileIdentificationCard1,
      identificationCard2: files.fileIdentificationCard2,
      bankCertificate: files.fileBankCertificate,
      // RUT: files.fileRut,
    };

    this.subscription = this.user.uploadFiles(sendvalues).subscribe((res: ResponseService) => {
      if (res.state !== 'Error') {
        Swal.fire({
          title: 'Carga de archivos correcta',
          text: res.userMessage,
          type: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'upload-success',
        }).then(() => {
          this.reset(files);
        });
      } else {
        Swal.fire({
          title: 'Error en la Carga de archivos',
          text: res.userMessage,
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'upload-error',
        });
      }
    });
  }

  public getUserData() {
    this.subscription = this.user.getuserdata().subscribe((user) => {
      this.managedPayments = user.managedPayments;
      this.isEmployee = user.isEmployeeGrupoExito;
      this.profile = true;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
