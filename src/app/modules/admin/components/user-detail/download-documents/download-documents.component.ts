import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DataFiles } from 'src/app/interfaces/data-files';
import { Users } from 'src/app/interfaces/users';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-download-documents',
  templateUrl: './download-documents.component.html',
  styleUrls: ['./download-documents.component.scss']
})
export class DownloadDocumentsComponent implements OnInit, OnChanges {

  @Input() data: Users;
  @Input() dataFiles: DataFiles;

  dataSource = [];

  displayedColumns: string[] = ['check', 'name', 'type', 'first', 'last'];

  selectedFiles = [];

  constructor(
    private utils: UtilsService,
    private user: UserService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    this.dataSource = [
      { document: 'IdentificationCard1', name: 'Cédula parte frontal', type: this.data.maxextensiondateidentificationcard1, dateFirst: this.data.mindateidentificationcard1, dateLast: this.data.maxdateidentificationcard1 },
      { document: 'IdentificationCard2', name: 'Cedula parte posterior', type: this.data.maxextensiondateidentificationcard2, dateFirst: this.data.mindateidentificationcard1, dateLast: this.data.maxdateidentificationcard2 },
      { document: 'BankCertificate', name: 'Certificación Bancaria', type: this.data.maxextensiondatebankcertificate, dateFirst: this.data.mindatebankcertificate, dateLast: this.data.maxdatebankcertificate },
      { document: 'Rut', name: 'RUT', type: this.data.maxextensiondaterut, dateFirst: this.data.mindaterut, dateLast: this.data.maxdaterut },
    ];
  };

  public previewDocument(typeDocument: string) {
    switch (typeDocument) {
      case 'IdentificationCard1':
        if (this.dataFiles.identificationcard1 !== '') {
          if (this.data.maxextensiondateidentificationcard1 === '.jpg') {
            this.utils.openpreviewImage(this.dataFiles.identificationcard1);
          } else {
            this.utils.openpreviewPdf(this.dataFiles.identificationcard1);
          }
        } else {
          this.utils.openSnackBar('El archivo no existe.', 'Cerrar');
        }
        break;
      case 'IdentificationCard2':
        if (this.dataFiles.identificationcard2 !== '') {
          if (this.data.maxextensiondateidentificationcard2 === '.jpg') {
            this.utils.openpreviewImage(this.dataFiles.identificationcard2);
          } else {
            this.utils.openpreviewPdf(this.dataFiles.identificationcard2);
          }
        } else {
          this.utils.openSnackBar('El archivo no existe.', 'Cerrar');
        }
        break;
      case 'BankCertificate':
        if (this.dataFiles.bankcertificate !== '') {
          if (this.data.maxextensiondatebankcertificate === '.jpg') {
            this.utils.openpreviewImage(this.dataFiles.bankcertificate);
          } else {
            this.utils.openpreviewPdf(this.dataFiles.bankcertificate);
          }
        } else {
          this.utils.openSnackBar('El archivo no existe.', 'Cerrar');
        }
        break;
      case 'Rut':
        if (this.dataFiles.rut !== '') {
          if (this.data.maxextensiondaterut === '.jpg') {
            this.utils.openpreviewImage(this.dataFiles.rut);
          } else {
            this.utils.openpreviewPdf(this.dataFiles.rut);
          }
        } else {
          this.utils.openSnackBar('El archivo no existe.', 'Cerrar');
        }
        break;
    }
  }


  public changeValue(event:any, element:string) {
    if (event.checked) {
      this.selectedFiles.push(element);
    } else {
      const index = this.selectedFiles.indexOf(element);
      if (index >= 0) {
        this.selectedFiles.splice(index, 1);
      }
    }
  }

  downloadSelectedFiles() {
    if (this.selectedFiles.length > 0) {
      const data = {
        userId: this.data.userId,
        typeDocument: this.selectedFiles,
      };
      this.user.downloadFiles(data).subscribe((respid: any) => {
        this.downloadBlob(respid, 'application/zip');
      });
    } else {
      this.utils.openSnackBar('No ha seleccionado ningún archivo.', 'Cerrar');
    }
  }

  private downloadBlob(data, type) {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');

    downloadLink.href = url;
    downloadLink.download = 'archivo.zip';
    downloadLink.click();
  }

}
