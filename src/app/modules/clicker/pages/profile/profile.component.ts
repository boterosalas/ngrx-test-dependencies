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

  constructor(
    private user: UserService,
    private auth: AuthService
  ) { }

  ngOnInit() {
   this.user.userInfo$.subscribe((val)=> {
     if(!!val) {
       this.userId = val.userId;
       this.id = val.identification;
     }
   })
  }
  
  public sendFiles(files) {

    let file1 = files.fileIdentificationCard1;
    let file1Split = file1.split('data:application/octet-stream;base64,');
    let file1bs64 = file1Split[1];
    let file2 = files.fileIdentificationCard2;
    let file2Split = file2.split('data:application/octet-stream;base64,');
    let file2bs64 = file2Split[1];
    let file3 = files.fileBankCertificate;
    let file3Split = file3.split('data:application/octet-stream;base64,');
    let file3bs64 = file3Split[1];

    let sendvalues = {
      userid: this.userId,
      value: true,
      identification: this.id,
      identificationCard1: file1bs64,
      identificationCard2: file2bs64,
      bankCertificate: file3bs64
    }

    

    this.user.uploadFiles(sendvalues).subscribe((res:ResponseService) => {
      if(res.state !== 'Error') {
        Swal.fire({
          title: "Carga de archivos correcta",
          text: res.userMessage,
          type: "success",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "upload-success"
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
