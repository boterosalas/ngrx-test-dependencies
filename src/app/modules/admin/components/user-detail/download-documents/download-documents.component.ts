import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DataFiles } from 'src/app/interfaces/data-files';
import { Users } from 'src/app/interfaces/users';
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
    private utils: UtilsService
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
        if (this.dataFiles.fileIdentificationCard1 !== '') {
          if (this.dataFiles.extensionIdentificationCard1 === '.jpg') {
            this.utils.openpreviewImage(this.dataFiles.fileIdentificationCard1);
          } else {
            this.utils.openpreviewPdf(this.dataFiles.fileIdentificationCard1);
          }
        } else {
          this.utils.openSnackBar('El archivo no existe.', 'Cerrar');
        }
        break;
      case 'IdentificationCard2':
        if (this.dataFiles.fileIdentificationCard2 !== '') {
          if (this.dataFiles.extensionIdentificationCard2 === '.jpg') {
            this.utils.openpreviewImage(this.dataFiles.fileIdentificationCard2);
          } else {
            this.utils.openpreviewPdf(this.dataFiles.fileIdentificationCard2);
          }
        } else {
          this.utils.openSnackBar('El archivo no existe.', 'Cerrar');
        }
        break;
      case 'BankCertificate':
        if (this.dataFiles.fileBankCertificate !== '') {
          if (this.dataFiles.extensionBankCertificate === '.jpg') {
            this.utils.openpreviewImage(this.dataFiles.fileBankCertificate);
          } else {
            this.utils.openpreviewPdf(this.dataFiles.fileBankCertificate);
          }
        } else {
          this.utils.openSnackBar('El archivo no existe.', 'Cerrar');
        }
        break;
      case 'Rut':
        if (this.dataFiles.fileRUT !== '') {
          if (this.dataFiles.extensionRUT === '.jpg') {
            this.utils.openpreviewImage(this.dataFiles.fileRUT);
          } else {
            this.utils.openpreviewPdf(this.dataFiles.fileRUT);
          }
        } else {
          this.utils.openSnackBar('El archivo no existe.', 'Cerrar');
        }
        break;
    }
  }

  changeValue(event, item) {
    this.addOrRemoveItem(event.checked, item);
  }

  private addOrRemoveItem(value, item) {
    if (value && !this.selectedFiles.includes(item)) {
      this.selectedFiles.push(item);
    } else if (!value) {
      this.selectedFiles = this.selectedFiles.filter((val) => val !== item);
    }
  }

  downloadSelectedFiles() {
    if (this.selectedFiles.length > 0) {
      const data = {
        userId: this.data.userId,
        typeDocument: this.selectedFiles,
      };
      // this.downloadFiles.emit(data);
    } else {
      this.utils.openSnackBar('No ha seleccionado ningún archivo.', 'Cerrar');
    }
  }

}
