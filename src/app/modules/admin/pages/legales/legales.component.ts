import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MasterDataService } from 'src/app/services/master-data.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-legales',
  templateUrl: './legales.component.html',
  styleUrls: ['./legales.component.scss']
})
export class LegalesComponent implements OnInit {

  constructor(
    private personalInfo: MasterDataService,
    private _snackBar: MatSnackBar,
    private utils: UtilsService
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
        'customClasses',
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
    this.checkRole();
  }
  checkRole() {
    this.utils.checkPermision();
  }
  getTerms() {
    this.personalInfo.getTerms().subscribe((resp: any) => {
      this.htmlContentTerminos = resp.objectResponse[0].sectionvalue
      this.htmlContentProteccion = resp.objectResponse[1].sectionvalue
      this.htmlContentTransparencia = resp.objectResponse[2].sectionvalue
      this.htmlContentPrograma = resp.objectResponse[3].sectionvalue
      this.textoTerminos = resp.objectResponse[0].sectiontitle
      this.textoProteccion = resp.objectResponse[1].sectiontitle
      this.textoTransparencia = resp.objectResponse[2].sectiontitle
      this.textoPrograma = resp.objectResponse[3].sectiontitle
    })
  }
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }
  saveLegalEndpoint() {
    this.personalInfo.setTerms(this.datos).subscribe((resp) => {
      if (resp.state === "Success") {
        this.openSnackBar(resp.userMessage, 'Cerrar');
      }
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
