import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from "sweetalert2";
import { ResponseService } from 'src/app/interfaces/response';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  userId:string;
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

  constructor(
    private user: UserService,
    private auth: AuthService
  ) { }

  ngOnInit() {
   this.user.userInfo$.subscribe((val)=> {
     if(!!val) {
       this.userId = val.userId;
       this.id = val.identification;
       this.verified = val.verified;
     }
   })
  }

 public reset(file) {
    file.nameFileCed1 = "";
    file.fileIdentificationCard1 = null;
    file.nameFileCed2 = "";
    file.fileIdentificationCard2 = null;
    file.nameFileCert = "";
    file.fileBankCertificate = null;
  }
  
  public sendFiles(files) {

    let sendvalues = {
      userid: this.userId,
      value: true,
      identification: this.id,
      identificationCard1: files.fileIdentificationCard1,
      identificationCard2: files.fileIdentificationCard2,
      bankCertificate: files.fileBankCertificate
    }

    

    this.user.uploadFiles(sendvalues).subscribe((res:ResponseService) => {
      if(res.state !== 'Error') {
        Swal.fire({
          title: "Carga de archivos correcta",
          text: res.userMessage,
          type: "success",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "upload-success"
        }).then(() => {
           this.reset(files);
        })
      } else {
        Swal.fire({
          title: 'Error en la Carga de archivos',
          text: res.userMessage,
          type: "error",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "upload-error"
        })
      }
    });

  }

}
