import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-edit-blog-admin',
  templateUrl: './add-edit-blog-admin.component.html',
  styleUrls: ['./add-edit-blog-admin.component.scss']
})
export class AddEditBlogAdminComponent implements OnInit {
  validFormat: boolean;
  fileImgCat: any;
  nameFileCert: string = '';
  showErrorCert: boolean;
  activebutton: boolean;
  visualizationImag: any;
  titleArticle: string;
  author: string;
  etiquetas: string;
  visible: boolean = false;
  datePublication: string;
  hourDate: string;
  constructor() { }
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '450px',
    minHeight: '0',
    maxHeight: 'auto',
    width: '710px',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Contenido...',
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
  htmlContent: string;
  ngOnInit() {
  }
  private getExtension(nameFile: string, getSize: number) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    if (getExt === "svg" || getExt === "jpg") {
      this.validFormat = true;
    }
    if (getSize / 1000 > 10000) {
      this.validFormat = false;
    }
  }
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let nameFile = event.target.files[0].name;
      this.nameFileCert = nameFile;
      const reader = new FileReader();
      reader.onload = e => this.visualizationImag = reader.result;
      reader.readAsDataURL(file);
    }
  }
  saveeraser() {
    let datos = {
      titleArticle: this.titleArticle,
      author: this.author,
      etiquetas: this.etiquetas,
      visible: this.visible,
      datePublication: this.datePublication,
      hourDate: this.hourDate,
      content: this.htmlContent
    }
    console.log(datos);
  }
  saveprogrammer() {
    let datos = {
      titleArticle: this.titleArticle,
      author: this.author,
      etiquetas: this.etiquetas,
      visible: this.visible,
      datePublication: this.datePublication,
      hourDate: this.hourDate,
      content: this.htmlContent
    }
    console.log(datos);
  }
  deleteArticle() {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar artículo</h3> <p class='w-container'>¿Estás seguro de eliminar el artículo seleccionado?</p>",
      confirmButtonText: "Eliminar artículo",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonClass: "updateokdelete order-last",
      cancelButtonClass: "updatecancel",
      allowOutsideClick: false
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {

      }
    })
  }

}
