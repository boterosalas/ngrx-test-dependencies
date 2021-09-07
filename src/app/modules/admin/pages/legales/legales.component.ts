import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MasterDataService } from 'src/app/services/master-data.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-legales',
  templateUrl: './legales.component.html',
  styleUrls: ['./legales.component.scss'],
})
export class LegalesComponent implements OnInit {
  constructor(
    private personalInfo: MasterDataService,
    private _snackBar: MatSnackBar,
    private utils: UtilsService,
    private fb: FormBuilder
  ) {}

  configurarEditor: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: '720px',
    minWidth: '0',
    translate: 'yes',
    showToolbar: true,
    placeholder: 'Escriba su articulo...',
    toolbarHiddenButtons: [
      [
        'heading',
        'insertImage',
        'insertVideo',
        'customClasses',
        'removeFormat',
        'fontName',
        'backgroundColor',
        'insertHorizontalRule',
        'toggleEditorMode',
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
      ],
    ],
    defaultParagraphSeparator: 'p',
    defaultFontName: '',
    defaultFontSize: '',
    enableToolbar: true,
    sanitize: true,
    toolbarPosition: 'top',
  };
  htmlContentTerminos: string;
  dateTerms: string;
  htmlContentProteccion: string;
  dateProteccion: string;
  htmlContentTransparencia: string;
  dateTransparencia: string;
  htmlContentPrograma: string;
  datePrograma: string;
  textoTerminos: string;
  textoProteccion: string;
  textoTransparencia: string;
  textoPrograma: string;
  datos: any;
  changeTerms = true;
  changeProtection = true;
  changeTransparency = true;
  changeRefer = true;
  termsForm: FormGroup;
  protectionForm: FormGroup;
  transparencyForm: FormGroup;
  refersForm: FormGroup;

  ngOnInit() {
    this.getTerms();
    this.checkRole();
    this.createFormTerms();
    this.createFormProtection();
    this.createFormTransparency();
    this.createFormRefers();
  }

  checkRole() {
    this.utils.checkPermision();
  }

  getTerms() {
    this.personalInfo.getTerms().subscribe((resp: any) => {
      this.htmlContentTerminos = resp.objectResponse[0].sectionvalue;
      this.htmlContentProteccion = resp.objectResponse[1].sectionvalue;
      this.htmlContentTransparencia = resp.objectResponse[2].sectionvalue;
      this.htmlContentPrograma = resp.objectResponse[3].sectionvalue;
      this.textoTerminos = resp.objectResponse[0].sectiontitle;
      this.textoProteccion = resp.objectResponse[1].sectiontitle;
      this.textoTransparencia = resp.objectResponse[2].sectiontitle;
      this.textoPrograma = resp.objectResponse[3].sectiontitle;
      this.dateTerms = resp.objectResponse[0].date;
      this.dateProteccion = resp.objectResponse[1].date;
      this.dateTransparencia = resp.objectResponse[2].date;
      this.datePrograma = resp.objectResponse[3].date;
      setTimeout(() => {
        this.termsForm.controls.title.setValue(this.textoTerminos);
        this.termsForm.controls.termsEditor.setValue(this.htmlContentTerminos);
        this.protectionForm.controls.title.setValue(this.textoProteccion);
        this.protectionForm.controls.termsEditor.setValue(this.htmlContentProteccion);
        this.transparencyForm.controls.title.setValue(this.textoTransparencia);
        this.transparencyForm.controls.termsEditor.setValue(this.htmlContentTransparencia);
        this.refersForm.controls.title.setValue(this.textoPrograma);
        this.refersForm.controls.termsEditor.setValue(this.htmlContentPrograma);
      }, 500);
    });
  }

  public createFormTerms() {
    this.termsForm = this.fb.group({
      title: ['', Validators.required],
      termsEditor: ['', Validators.required],
    });
  }

  public createFormProtection() {
    this.protectionForm = this.fb.group({
      title: ['', Validators.required],
      termsEditor: ['', Validators.required],
    });
  }

  public createFormTransparency() {
    this.transparencyForm = this.fb.group({
      title: ['', Validators.required],
      termsEditor: ['', Validators.required],
    });
  }

  public createFormRefers() {
    this.refersForm = this.fb.group({
      title: ['', Validators.required],
      termsEditor: ['', Validators.required],
    });
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  saveLegalEndpoint() {
    this.personalInfo.setTerms(this.datos).subscribe((resp) => {
      if (resp.state === 'Success') {
        this.openSnackBar(resp.userMessage, 'Cerrar');
      }
    });
  }

  detectChanges() {
    const valueEditor = this.termsForm.controls.termsEditor.value;
    if (this.htmlContentTerminos === valueEditor) {
      this.changeTerms = true;
    } else {
      this.changeTerms = false;
    }
  }

  detectChangesProtection() {
    const valueEditor = this.protectionForm.controls.termsEditor.value;
    if (this.htmlContentProteccion === valueEditor) {
      this.changeProtection = true;
    } else {
      this.changeProtection = false;
    }
  }

  detectChangesTransparency() {
    const valueEditor = this.transparencyForm.controls.termsEditor.value;
    if (this.htmlContentTransparencia === valueEditor) {
      this.changeTransparency = true;
    } else {
      this.changeTransparency = false;
    }
  }

  detectChangesRefer() {
    const valueEditor = this.refersForm.controls.termsEditor.value;
    if (this.htmlContentPrograma === valueEditor) {
      this.changeRefer = true;
    } else {
      this.changeRefer = false;
    }
  }

  saveStatus(id, keyUp, texto, htmlContenido) {
    this.datos = {
      id: id,
      sectionKey: keyUp,
      sectionTitle: texto,
      sectionValue: htmlContenido,
    };
    this.saveLegalEndpoint();
  }

  saveLegal(elemento) {
    if (elemento === '1') {
      const titleTerminos = this.termsForm.controls.title.value;
      const contentTerminos = this.termsForm.controls.termsEditor.value;
      this.saveStatus(1, 'TerminosCondiciones', titleTerminos, contentTerminos);
    } else if (elemento === '2') {
      const titleProtection = this.protectionForm.controls.title.value;
      const contentProtection = this.protectionForm.controls.termsEditor.value;
      this.saveStatus(2, 'ProteccionDatos', titleProtection, contentProtection);
    } else if (elemento === '3') {
      const titleTransparency = this.transparencyForm.controls.title.value;
      const contentTransparency = this.transparencyForm.controls.termsEditor.value;
      this.saveStatus(3, 'Transparencia', titleTransparency, contentTransparency);
    } else if (elemento === '4') {
      const titleRefer = this.refersForm.controls.title.value;
      const contentRefer = this.refersForm.controls.termsEditor.value;
      this.saveStatus(4, 'ProgramaReferidos', titleRefer, contentRefer);
    } else {
      console.warn('Ocurrio algo extraño');
    }
  }
}
