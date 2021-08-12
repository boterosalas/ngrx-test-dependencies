import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from 'src/app/services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
moment.locale('es');
@Component({
  selector: 'app-edit-blog-admin',
  templateUrl: './edit-blog-admin.component.html',
  styleUrls: ['./edit-blog-admin.component.scss'],
})
export class EditBlogAdminComponent implements OnInit, OnDestroy {
  validFormat: boolean;
  fileImgCat: any;
  formData: FormData = new FormData();
  nameFileCert = '';
  showErrorCert: boolean;
  activebutton: boolean;
  visualizationImag: any;
  titleArticle = '';
  author = '';
  etiquetas = '';
  visible = false;
  datePublication: any = '';
  hourDate: any = '';
  id: any = '';
  private subscription: Subscription = new Subscription();
  minDate = new Date();
  minHours: any;
  constructor(public router: Router, private content: ContentService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.subscription = this.route.params.subscribe((route) => {
      if (route.id === undefined && route.titulo === undefined && route.imagen === undefined) {
        this.id = '1';
      } else {
        this.id = route.id;
      }
    });
  }

  formDataContent: FormGroup;
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
  };
  htmlContent: string;
  disabledButtonEraser = true;
  datePublicationHolder: string;
  disabledButtonPublication = true;
  contadorDates = 0;

  ngOnInit() {
    this.formDataContent = this.fb.group({
      titulo: [null, Validators.maxLength(250)],
      autor: [null, Validators.required],
      etiquetas: [null, Validators.required],
      html: [null, Validators.required],
    });
    this.datePublication = '';
    this.hourDate = '';
    this.content.getIndividualBlogId(this.id).subscribe((resp) => {
      this.visible = resp.objectResponse.visible;
      this.formDataContent.controls.titulo.setValue(resp.objectResponse.title);
      this.formDataContent.controls.autor.setValue(resp.objectResponse.author);
      this.formDataContent.controls.etiquetas.setValue(resp.objectResponse.tags);
      this.formDataContent.controls.html.setValue(resp.objectResponse.content);
      if (resp.objectResponse.publicationdate != null) {
        this.datePublication = moment(resp.objectResponse.publicationdate).format();
        const hour = resp.objectResponse.publicationdate.split('T');
        this.hourDate = this.timeFormat(hour[1]);
      }

      if (resp.objectResponse.imageurl !== '') {
        this.visualizationImag = resp.objectResponse.imageurl;
        const datos = resp.objectResponse.imageurl.split('/');
        this.nameFileCert = datos[datos.length - 1];
      }
      this.disabledButtonPublication = true;
      this.disabledButtonEraser = true;
    });
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileList: FileList = event.target.files;
      this.getExtension(fileList[0].name, fileList[0].size);
      if (this.validFormat === true) {
        this.formData.append('File', fileList[0], fileList[0].name.replace(' ', '_'));
        const nameFile = event.target.files[0].name;
        this.nameFileCert = nameFile;
        const reader = new FileReader();
        reader.onload = (e) => (this.visualizationImag = reader.result);
        reader.readAsDataURL(file);
        this.checkAllDates();
      }
    }
  }

  saveeraser() {
    const datePublication = moment(this.datePublication).format('YYYY-MM-DD');
    let hour;
    if (this.hourDate !== undefined) {
      hour = this.HoraMilitar(this.hourDate);
    } else {
      hour = '';
    }
    this.formData.append('id', this.id);
    this.formData.append('title', this.formDataContent.controls.titulo.value);
    this.formData.append('content', this.formDataContent.controls.html.value);
    this.formData.append('author', this.formDataContent.controls.autor.value);
    this.formData.append('tags', this.formDataContent.controls.etiquetas.value);
    this.formData.append('visible', '' + this.visible);
    this.formData.append('publicationDate', datePublication + ' ' + hour + ':00');
    this.content.saveBlog(this.formData).subscribe((resp) => {
      this.regresarBlogs();
    });
  }
  regresarBlogs() {
    this.router.navigate(['/blog-admin']);
  }

  comprobarText(elemento) {
    this.disabledButtonEraser = false;
    if (elemento === 'Cambio') {
      this.contadorDates += 1;
    }
    if (this.contadorDates > 1) {
      this.disabledButtonPublication = false;
    } else {
      this.disabledButtonPublication = true;
    }
    if (this.visible === true) {
      this.disabledButtonPublication = false;
      this.disabledButtonEraser = true;
    }
    if (this.nameFileCert === '') {
      this.disabledButtonPublication = true;
      this.disabledButtonEraser = true;
    }
  }
  checkAllDates() {
    if (this.visible === true) {
      this.disabledButtonPublication = false;
      this.disabledButtonEraser = true;
    } else {
      this.disabledButtonPublication = true;
      this.disabledButtonEraser = false;
    }

    if (this.nameFileCert === '') {
      this.disabledButtonPublication = true;
      this.disabledButtonEraser = true;
    }
  }
  deleteArticle() {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar artículo</h3> <p class='w-container'>¿Estás seguro de eliminar el artículo seleccionado?</p>",
      confirmButtonText: 'Eliminar artículo',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonClass: 'updateokdelete order-last',
      cancelButtonClass: 'updatecancel',
      allowOutsideClick: false,
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.content.deleteBlog(this.id).subscribe(() => {
          this.regresarBlogs();
        });
      }
    });
  }

  private getExtension(nameFile: string, getSize: number) {
    const splitExt = nameFile.split('.');
    const getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    this.showErrorCert = true;
    if (getExt === 'jpg') {
      this.validFormat = true;
      this.showErrorCert = false;
    }
    if (getSize / 1000 > 300) {
      this.validFormat = false;
      this.showErrorCert = true;
    }
  }

  public HoraMilitar(time) {
    const format = time.toString().split(' ')[1];
    const hour = time.toString().split(' ')[0].split(':')[0];
    if (hour === 12) {
      const hour = time.toString().split(' ')[0];
      return hour;
    } else {
      if (format === 'PM') {
        const hour = time.toString().split(' ')[0];
        const h = parseInt(hour.split(':')[0]) + 12;
        const m = hour.split(':')[1];
        return h + ':' + m;
      } else {
        if (hour < 10) {
          const hour = 0 + time.toString().split(' ')[0];
          return hour;
        } else {
          const hour = time.toString().split(' ')[0];
          return hour;
        }
      }
    }
  }


  activate() {
    if (this.datePublication !== '' || this.hourDate !== '') {
      this.disabledButtonEraser = false;
    }
    if (this.datePublication !== '' && this.hourDate !== '') {
      this.disabledButtonPublication = false;
    }
    if (this.nameFileCert === '') {
      this.disabledButtonPublication = true;
      this.disabledButtonEraser = true;
    }
  }

  hourChange(horu) {
    const data = new Date();
    const dataH = moment(data).format('YYYY-MM-DD');
    const dataOp = moment(horu.value).format('YYYY-MM-DD');
    if (dataH === dataOp) {
      this.hourDate = '';
      this.minHours = moment(data).format('hh:mm A');
    } else {
      this.hourDate = '';
      this.minHours = '12:00 AM';
    }
  }

  timeFormat(time) {
    const hour = time.split(':')[0];
    const minute = time.split(':')[1];

    if (hour >= 12) {
      if (hour === 12) {
        const h = hour;
        const m = minute + ' PM';
        return h + ':' + m;
      } else {
        const h = hour - 12;
        const m = minute + ' PM';
        return h + ':' + m;
      }
    } else {
      const h = parseInt(hour);
      return h + ':' + minute + ' AM';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
