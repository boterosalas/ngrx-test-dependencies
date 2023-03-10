import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aditional-files',
  templateUrl: './aditional-files.component.html',
  styleUrls: ['./aditional-files.component.scss'],
})
export class AditionalFilesComponent implements OnInit, OnDestroy {
  constructor(private fb: UntypedFormBuilder, private user: UserService) {}

  externalForm: UntypedFormGroup;
  files = {
    validFormat: true,
    nameFileCed1: '',
    nameFileCed2: '',
    nameFileCert: '',
    nameRut: '',
    showErrorCed1: false,
    showErrorCed2: false,
    showErrorCert: false,
    showErrorRut: false,
    fileIdentificationCard1: null,
    fileIdentificationCard2: null,
    fileBankCertificate: null,
    fileRut: null,
    isEmployee: false,
  };
  @Output() uploadFile = new EventEmitter();
  @Output() resetFormEmit = new EventEmitter();
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.formFiles();

    // se valida si es empleado del exito
    this.subscription = this.user.userInfo$.subscribe((val) => {
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

  /**
   * Metodo para leer y subir archivos
   * @param event evento
   * @param param parametro
   */

  public onFileChangeFiles(event, param: string) {
    const reader = new FileReader();
    const name = event.target.files[0].name;
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileBlob = new Blob([file]);
      const file2 = new File([fileBlob], name);
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.getExtension(name);
        if (this.files.validFormat === true) {
          if (param === 'cedula1') {
            this.files.fileIdentificationCard1 = reader.result;
            this.files.nameFileCed1 = name;
            this.files.showErrorCed1 = false;
          } else {
            if (param === 'cedula2') {
              this.files.fileIdentificationCard2 = reader.result;
              this.files.nameFileCed2 = name;
              this.files.showErrorCed2 = false;
            } else {
              if(param === 'rut') {
              this.files.fileRut = reader.result;
              this.files.nameRut = name;
              this.files.showErrorCed2 = false;
            } else {
              this.files.fileBankCertificate = reader.result;
              this.files.nameFileCert = name;
              this.files.showErrorCert = false;
            }
          }
        }
      } else {
          if (param === 'cedula1') {
            this.files.showErrorCed1 = true;
            this.files.nameFileCed1 = name;
          } else {
            if (param === 'cedula2') {
              this.files.showErrorCed2 = true;
              this.files.nameFileCed2 = name;
            } else {
              this.files.showErrorCert = true;
              this.files.nameFileCert = name;
            }
          }
        }
      };
    }
  }

  /**
   * Metodo para validar que extension sea valida
   * @param name nombre
   */

  private getExtension(name: string) {
    const splitExt = name.split('.');
    const getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.files.validFormat = false;
    if (getExt === 'jpg' || getExt === 'pdf' || getExt === 'jpeg') {
      this.files.validFormat = true;
    }
  }

  public sendInfo() {
    this.uploadFile.emit(this.files);
  }

  public resetForm() {
    this.resetFormEmit.emit(
      (this.files = {
        validFormat: true,
        nameFileCed1: '',
        nameFileCed2: '',
        nameFileCert: '',
        nameRut: '',
        showErrorCed1: false,
        showErrorCed2: false,
        showErrorCert: false,
        showErrorRut: false,
        fileIdentificationCard1: null,
        fileIdentificationCard2: null,
        fileBankCertificate: null,
        fileRut: null,
        isEmployee: false,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
