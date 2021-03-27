import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MasterDataService } from 'src/app/services/master-data.service';
@Component({
  selector: 'app-legales',
  templateUrl: './legales.component.html',
  styleUrls: ['./legales.component.scss']
})
export class LegalesComponent implements OnInit {

  constructor(
    private personalInfo: MasterDataService
  ) { }
  terminos: [{
    seccion: 1
    titulo: "",
    contenido: "Contenido"
  },
    {
      seccion: 2
      titulo: "",
      contenido: "Contenido"
    },
    {
      seccion: 3
      titulo: "",
      contenido: "Contenido"
    },
    {
      seccion: 4
      titulo: "",
      contenido: "Contenido"
    }]
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: '720px',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Escriba su articulo...',
    defaultParagraphSeparator: 'p',
    defaultFontName: '',
    defaultFontSize: '',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['heading', 'insertImage', 'insertVideo',
        'customClasses', 'link', 'unlink',
        'removeFormat', 'fontName', 'backgroundColor',
        'insertHorizontalRule', 'toggleEditorMode', 'undo',
        'redo', 'strikeThrough', 'subscript',
        'superscript']
    ]
  };
  htmlContent1: string;
  htmlContent2: string;
  htmlContent3: string;
  htmlContent4: string;
  texto1: string;
  texto2: string;
  texto3: string;
  texto4: string;

  ngOnInit() {
  }
  getTerms() {
    this.personalInfo.getTerms().subscribe((resp) => {

    })
  }
  setTerms(elemento) {
    if (elemento === 1) {
      let datos = {
        texto1: this.texto1,
        htmlContent1: this.htmlContent1
      }
      this.personalInfo.setTerms(datos).subscribe((resp) => {

      })
    }
    else if (elemento === 2) {
      let datos = {
        texto1: this.texto2,
        htmlContent1: this.htmlContent2
      }
      this.personalInfo.setTerms(datos).subscribe((resp) => {

      })
    }
    else if (elemento === 3) {
      let datos = {
        texto1: this.texto3,
        htmlContent1: this.htmlContent3
      }
      this.personalInfo.setTerms(datos).subscribe((resp) => {

      })
    }
    else if (elemento === 4) {
      let datos = {
        texto1: this.texto4,
        htmlContent1: this.htmlContent4
      }
      this.personalInfo.setTerms(datos).subscribe((resp) => {

      })
    }


  }
}
