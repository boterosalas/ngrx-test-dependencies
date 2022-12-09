import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent implements OnInit {
  blobUrl = environment.URL_BLOB;
  @Input() file = '';
  @Input() nameFile = '';
  @Input() errorFile = '';
  @Input() maxSize;
  @Input() showDocumentIn: boolean = false;
  @Input() validFormats;
  @Input() idControl: string = `inputFile${new Date().getTime()}`;
  @Input() placeholder = 'ADJUNTAR ARCHIVO';
  @Output() fileOutput: EventEmitter<any> = new EventEmitter();
  @Output() showDocumentOut: EventEmitter<any> = new EventEmitter();
  validFormatsParam: string = '';

  constructor() { }

  ngOnInit(): void {
    this.validFormatsParam = this.validFormats ? `.${this.validFormats.join(', .')}` : '';
  }

  uploadFileImage(event) {
    const file = event.target.files[0];
    const nameFile = file.name;
    const sizeFile = file.size;
    const splitExt = nameFile.split('.');
    const getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    let isValid = true;

    if (this.validFormats && !this.validFormats.includes(getExt)) {
      isValid = false;
      this.errorFile = `Formato inválido, sólo se pueden subir archivos con las siguientes extensiones: '${this.validFormats.join("', '")}'.`;
    } else if (this.maxSize && sizeFile / 1000 > this.maxSize) {
      isValid = false;
      this.errorFile = `El archivo supera el tamaño máximo permitido. El tamaño máximo es ${this.maxSize}kB.`;
    } else {
      this.errorFile = '';
    }
    if (isValid) {
      const reader = new FileReader();
      const fileBlob = new Blob([file]);
      const fileTemp = new File([fileBlob], nameFile);
      reader.readAsDataURL(fileTemp);
      this.nameFile = nameFile;
      reader.onload = () => {
        const stringFile = reader.result as string;
        this.file = stringFile.split('data:application/octet-stream;base64,')[1];
        this.fileOutput.emit({
          file: this.file,
          name: this.nameFile,
          error: this.errorFile
        })
      }
    } else {
      this.fileOutput.emit({
        file: this.file,
        name: this.nameFile,
        error: this.errorFile
      })
    }
  }

  showDocument(event: any){
    event.preventDefault();
    this.showDocumentOut.emit('');
  }

}
