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

  configurarEditor: AngularEditorConfig = {
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
        'superscript', 'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull']
    ]
  };
  htmlContentTerminos: string;
  htmlContentProteccion: string;
  htmlContentTransparencia: string;
  htmlContentPrograma: string;
  textoTerminos: string;
  textoProteccion: string;
  textoTransparencia: string;
  textoPrograma: string;
  datos: any;
  ngOnInit() {
    this.getTerms();
  }
  getTerms() {
    this.personalInfo.getTerms().subscribe((resp: any) => {
      console.log(resp);
      this.htmlContentTerminos = resp.objectResponse[0].sectionValue
      this.htmlContentProteccion = resp.objectResponse[1].sectionValue
      this.htmlContentTransparencia = resp.objectResponse[2].sectionValue
      this.htmlContentPrograma = resp.objectResponse[3].sectionValue
      this.textoTerminos = resp.objectResponse[0].sectionTitle
      this.textoProteccion = resp.objectResponse[1].sectionTitle
      this.textoTransparencia = resp.objectResponse[2].sectionTitle
      this.textoPrograma = resp.objectResponse[3].sectionTitle
    })
  }
  saveLegalEndpoint() {
    this.personalInfo.setTerms(this.datos).subscribe((resp) => {

    })
  }
  saveStatus(id, keyUp, texto, htmlContenido) {
    this.datos = {
      id: id,
      sectionKey: keyUp,
      sectionTitle: texto,
      sectionValue: htmlContenido
    }
    this.saveLegalEndpoint();
  }
  saveLegal(elemento) {
    if (elemento === "1") {
      this.saveStatus(1, "TerminosCondiciones", this.textoTerminos, this.htmlContentTerminos)

    }
    else if (elemento === "2") {
      this.saveStatus(2, "ProteccionDatos", this.textoProteccion, this.htmlContentProteccion)

    }
    else if (elemento === "3") {
      this.saveStatus(3, "Transparencia", this.textoTransparencia, this.htmlContentTransparencia)
    }
    else if (elemento === "4") {
      this.saveStatus(4, "ProgramaReferidos", this.textoPrograma, this.htmlContentPrograma)

    } else {
      console.warn("Ocurrio algo extraño")
    }


  }
}
