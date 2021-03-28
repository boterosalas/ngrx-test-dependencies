import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';
import * as moment from "moment";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from 'src/app/services/content.service';
import { Router } from '@angular/router';
moment.locale("es");
@Component({
  selector: 'app-add-edit-blog-admin',
  templateUrl: './add-edit-blog-admin.component.html',
  styleUrls: ['./add-edit-blog-admin.component.scss']
})
export class AddEditBlogAdminComponent implements OnInit {
  validFormat: boolean;
  fileImgCat: any;
  formData: FormData = new FormData();
  nameFileCert: string = '';
  showErrorCert: boolean;
  activebutton: boolean;
  visualizationImag: any;
  titleArticle: string = "";
  author: string = "";
  etiquetas: string = "";
  visible: boolean = false;
  datePublication: any = "";
  hourDate: any = "";
  constructor(
    public router: Router,
    private content: ContentService,
  ) { }
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
        'superscript', 'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull']
    ]
  };
  htmlContent: string;
  disabledButtonEraser: boolean = true;
  disabledButtonPublication: boolean = true;
  ngOnInit() {

  }

  private getExtension(nameFile: string, getSize: number) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    this.showErrorCert = true;
    if (getExt === "jpg") {
      this.validFormat = true;
      this.showErrorCert = false;
    }
    if (getSize / 1000 > 300) {
      this.validFormat = false;
      this.showErrorCert = true;
    }
  }
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let fileList: FileList = event.target.files;
      this.getExtension(fileList[0].name, fileList[0].size);
      if (this.validFormat === true) {
        this.formData.append('File', fileList[0], fileList[0].name.replace(' ', '_'));
        this.formData.append('imageUrl', file.name.replace(' ', '_'));
        let nameFile = event.target.files[0].name;
        this.nameFileCert = nameFile;
        const reader = new FileReader();
        reader.onload = e => this.visualizationImag = reader.result;
        reader.readAsDataURL(file);
        this.comprobarText();
      }
    }
  }
  saveeraser() {
    let datePublication = moment(this.datePublication).format("YYYY-MM-DD");
    let hour;

    if (this.hourDate != undefined) {
      hour = this.HrFormat(this.hourDate);
    } else {
      hour = ""
    }

    //console.log(datePublication + ' ' + hour);
    this.formData.append('title', this.titleArticle);
    this.formData.append('content', this.htmlContent);
    this.formData.append('author', this.author);
    this.formData.append('tags', this.etiquetas);
    this.formData.append('visible', '' + this.visible);
    this.formData.append('publicationDate', datePublication + ' ' + hour + ':00');
    this.content.saveBlog(this.formData).subscribe((resp) => {
      this.router.navigate([
        "/blog-admin"
      ]);
    })

  }
  public HrFormat(time) {
    let format = time.toString().split(" ")[1]
    let hour = time.toString().split(" ")[0].split(":")[0]
    if (hour == 12) {
      let hour = time.toString().split(" ")[0]
      return hour
    } else {
      if (format === 'PM') {
        let hour = time.toString().split(" ")[0]
        let h = parseInt(hour.split(":")[0]) + 12
        let m = hour.split(":")[1]
        return h + ":" + m
      } else {
        if (hour < 10) {
          let hour = 0 + time.toString().split(" ")[0]
          return hour
        }
        else {
          let hour = time.toString().split(" ")[0]
          return hour
        }
      }
    }
  }

  comprobarText() {
    if (this.titleArticle != "" && this.htmlContent != "" && this.author != "" && this.etiquetas != "") {
      this.disabledButtonEraser = false;
    }
    if (this.titleArticle != "" && this.htmlContent != "" && this.author != "" && this.etiquetas != "" && this.datePublication != "" && this.hourDate != "") {
      this.disabledButtonPublication = false;
    }
    if (this.nameFileCert === "") {
      this.disabledButtonPublication = true;
      this.disabledButtonEraser = true;
    }
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
        this.router.navigate([
          "/blog-admin"
        ]);
      }
    })
  }

}

