import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-aditional-files',
  templateUrl: './aditional-files.component.html',
  styleUrls: ['./aditional-files.component.scss']
})
export class AditionalFilesComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  externalForm: FormGroup;
  validFormat: boolean;
  nameFileCed1: string;
  nameFileCed2: string;
  nameFileCert: string;
  showErrorCed1: boolean;
  showErrorCed2: boolean;
  showErrorCert: boolean;
  fileIdentificationCard1: any;
  fileIdentificationCard2: any;
  fileBankCertificate: any;

  ngOnInit() {
   
    this.formFiles();
    this.nameFileCed1 = '';
    this.nameFileCed2 = '';
    this.nameFileCert = '';
  }

  public formFiles() {
    this.externalForm = this.fb.group({
      ced1: [null, Validators.required],
      ced2: [null, Validators.required],
      cert: [null, Validators.required],
    });
  }

  public onFileChange(event, param: string) {
    let nameFile = event.target.files[0].name;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let fileBlob = new Blob([file])
      let file2 = new File(([fileBlob]), nameFile);
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.getExtension(nameFile);
        if (this.validFormat === true) {
          if(param === 'ced1') {
            this.fileIdentificationCard1 = reader.result;
            this.nameFileCed1 = nameFile;
            this.showErrorCed1 = false;
          } else {
            if(param === 'ced2') {
              this.fileIdentificationCard2 = reader.result;
              this.nameFileCed2 = nameFile;
              this.showErrorCed2 = false;
            }
            else {
              this.fileBankCertificate = reader.result;
              this.nameFileCert = nameFile;
              this.showErrorCert = false;
            }
          }
          
        } else {
          if(param === 'ced1') {
              this.showErrorCed1 = true;
          } else {
            if(param === 'ced2') {
              this.showErrorCed2 = true;
            }
            else {
              this.showErrorCert = true;
            }
          }
        }
      };
    }
  }

  private getExtension(nameFile: string) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[1];
    this.validFormat = false;
    if (getExt === "jpg" || getExt === "pdf") {
      this.validFormat = true;
    }
  }

}
