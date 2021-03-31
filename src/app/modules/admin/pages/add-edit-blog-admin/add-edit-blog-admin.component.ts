import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as moment from "moment";
import { ContentService } from 'src/app/services/content.service';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
moment.locale("es");
@Component({
  selector: 'app-add-edit-blog-admin',
  templateUrl: './add-edit-blog-admin.component.html',
  styleUrls: ['./add-edit-blog-admin.component.scss']
})
export class AddEditBlogAdminComponent implements OnInit {

  constructor(
    public router: Router,
    private content: ContentService,
    private fb: FormBuilder
  ) { }
  validFormat: boolean;
  fileImgCat: any;
  formData: FormData = new FormData();
  nameFileCert: string = '';
  showErrorCert: boolean;
  activebutton: boolean;
  visualizationImag: any;
  escritor: string = "";
  etiquetas: string = "";
  disabledButtonEr: boolean = true;
  disabledButtonPu: boolean = true;
  visible: boolean = false;
  datePublication: any = "";
  hourDate: any = "";
  dateForm: FormGroup;
  contadorDates: number = 0;
  maxDate = new Date();
  minHours: any;
  configurationEditor: AngularEditorConfig = {
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
  contenidoHTML: string;

  ngOnInit() {
    this.minHours = moment(this.maxDate).format("hh:mm A");
    this.dateForm = this.fb.group({
      title: [null, Validators.maxLength(250)],
      author: [null, Validators.required],
      tags: [null, Validators.required],
      contenido: [null, Validators.required]
    });
  }

  private setExten(nameFile: string, getSize: number) {
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
      this.setExten(fileList[0].name, fileList[0].size);
      if (this.validFormat === true) {
        this.formData.append('File', fileList[0], fileList[0].name.replace(' ', '_'));
        let nameFile = event.target.files[0].name;
        this.nameFileCert = nameFile;
        const reader = new FileReader();
        reader.onload = e => this.visualizationImag = reader.result;
        reader.readAsDataURL(file);
        this.checkInput("texto");
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
    this.formData.append('title', this.dateForm.controls.title.value);
    this.formData.append('content', this.dateForm.controls.contenido.value);
    this.formData.append('author', this.dateForm.controls.author.value);
    this.formData.append('tags', this.dateForm.controls.tags.value);
    this.formData.append('visible', '' + this.visible);
    if (this.visible === true) {
      this.formData.append('publicationDate', "");
    }
    else {
      this.formData.append('publicationDate', datePublication + ' ' + hour + ':00');
    }
    this.content.saveBlog(this.formData).subscribe((resp) => {
      this.GoToBack()
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
  checkAllDates() {
    if (this.visible === true) {
      this.disabledButtonPu = false;
      this.disabledButtonEr = true;
    } else {
      this.disabledButtonPu = true;
      this.disabledButtonEr = false;
    }

    if (this.nameFileCert === "") {
      this.disabledButtonPu = true;
      this.disabledButtonEr = true;
    }
  }
  checkInput(elemento) {
    this.disabledButtonEr = false;
    if (elemento === 'Cambio') {
      this.contadorDates += 1
    }
    if (this.dateForm.controls.contenido.value != "") {
      if (this.contadorDates > 1) {
        this.disabledButtonPu = false;
      } else {
        this.disabledButtonPu = true;
      }
    }
    if (this.nameFileCert === "") {
      this.disabledButtonPu = true;
      this.disabledButtonEr = true;
    }
  }
  GoToBack() {
    this.router.navigate([
      "/blog-admin"
    ]);
  }
  delete() {
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
        this.GoToBack()
      }
    })
  }

}

