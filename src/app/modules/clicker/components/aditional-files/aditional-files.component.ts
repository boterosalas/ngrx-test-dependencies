import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-aditional-files',
  templateUrl: './aditional-files.component.html',
  styleUrls: ['./aditional-files.component.scss']
})
export class AditionalFilesComponent implements OnInit {

  constructor(private fb: FormBuilder,  private user: UserService,) { }

  externalForm: FormGroup;
  files = {
    validFormat: true,
    nameFileCed1: '',
    nameFileCed2: '',
    nameFileCert: '',
    showErrorCed1: false,
    showErrorCed2: false,
    showErrorCert: false,
    fileIdentificationCard1: null,
    fileIdentificationCard2: null,
    fileBankCertificate: null,
    isEmployee:false,
  }
  @Output() uploadFile = new EventEmitter;
  @Output() resetFormEmit = new EventEmitter;
  
  ngOnInit() {
    this.formFiles();
    
    this.user.userInfo$
        .subscribe(val => {
          if (!!val) {
            this.files.isEmployee = val.isEmployeeGrupoExito;
          }
        });
  }

  public formFiles() {
    this.externalForm = this.fb.group({
      ced1: [null],
      ced2: [null],
      cert: [null],
    });
  }

  public onFileChangeFiles(event, param: string) {
    let reader = new FileReader();
    let name = event.target.files[0].name;
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let fileBlob = new Blob([file])
      let file2 = new File(([fileBlob]), name);
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.getExtension(name);
        if (this.files.validFormat === true) {
          if(param === 'cedula1') {
            this.files.fileIdentificationCard1 = reader.result;
            this.files.nameFileCed1 = name;
            this.files.showErrorCed1 = false;
          } else {
            if(param === 'cedula2') {
              this.files.fileIdentificationCard2 = reader.result;
              this.files.nameFileCed2 = name;
              this.files.showErrorCed2 = false;
            }
            else {
              this.files.fileBankCertificate = reader.result;
              this.files.nameFileCert = name;
              this.files.showErrorCert = false;
            }
          }
          
        } else {
          if(param === 'cedula1') {
            this.files.showErrorCed1 = true;
            this.files.nameFileCed1 = name;
          } else {
            if(param === 'cedula2') {
              this.files.showErrorCed2 = true;
              this.files.nameFileCed2 = name;
            }
            else {
              this.files.showErrorCert = true;
              this.files.nameFileCert = name;
            }
          }
        }
      };
    }
  }

  private getExtension(name: string) {
    let splitExt = name.split(".");
    let getExt = splitExt[1].toLocaleLowerCase();
    this.files.validFormat = false;
    if (getExt === "jpg" || getExt === "pdf" || getExt === "jpeg") {
      this.files.validFormat = true;
    }
  }

  public sendInfo() {
    this.uploadFile.emit(this.files);
  }

  public resetForm() {
    this.resetFormEmit.emit(
      this.files = {
        validFormat: true,
        nameFileCed1: '',
        nameFileCed2: '',
        nameFileCert: '',
        showErrorCed1: false,
        showErrorCed2: false,
        showErrorCert: false,
        fileIdentificationCard1: null,
        fileIdentificationCard2: null,
        fileBankCertificate: null,
        isEmployee:false,
      }
      );
  }

}
