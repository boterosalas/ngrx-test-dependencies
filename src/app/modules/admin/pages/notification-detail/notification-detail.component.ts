import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss']
})
export class NotificationDetailComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  item:any;

  fileFormNotification: FormGroup;
  nameFileNotification: string;
  showErrorExtNotification: boolean;
  validFormat: boolean;
  showUploadFile = false;

  datePublication: any = "";
  hourDate: any = "";
  minDate = new Date();
  minHours: any;

  EXCEL_TYPE ="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  
 notificationForm: FormGroup;
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
      ['heading', 'insertImage', 'insertVideo',
        'customClasses',
        'removeFormat', 'fontName', 'backgroundColor',
        'insertHorizontalRule', 'toggleEditorMode', 'undo',
        'redo', 'strikeThrough', 'subscript',
        'superscript', 'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull']
    ],
    defaultParagraphSeparator: 'p',
    defaultFontName: '',
    defaultFontSize: '',
    enableToolbar: true,
    sanitize: true,
    toolbarPosition: 'top',

  };

  filters = [
    {name:"Total usuarios", value:"TODOS"},
    {name:"Usuarios registrados", value:"REGISTRADOS"},
    {name:"Usuarios activos", value:"ACTIVOS"},
    {name:"Personalizado (Archivo .xlsx)", value:"PERSONALIZADO"},
  ];

  constructor(
    private _content: ContentService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.nameFileNotification = "";
    this.formNotification();

    this.fileFormNotification = this.fb.group({
      file: [null]
    });
  }


  public onFileChangeNotification(event) {
    this.nameFileNotification = event.target.files[0].name;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let fileBlob = new Blob([file], { type: this.EXCEL_TYPE })
      let file2 = new File(([fileBlob]), this.nameFileNotification, { type: this.EXCEL_TYPE });
      reader.readAsDataURL(file2);
      reader.onload = () => {
        console.log(this.fileFormNotification);
        this.getExtension(this.nameFileNotification);
        if (this.validFormat === true) {
          this.fileFormNotification.controls.file.patchValue({
            file: reader.result
          });
          this.showErrorExtNotification = false;
        } else {
          this.showErrorExtNotification = true;
        }
      };
    }
  }

  private getExtension(nameFile: string) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[1];
    this.validFormat = false;
    if (getExt === "xlsx" || getExt === "xls") {
      this.validFormat = true;
    }
  }

  public formNotification() {
    this.notificationForm = this.fb.group({
      title: ['', Validators.required],
      termsEditor: ['', Validators.required],
      filterUsers: ['', Validators.required],
      fileExcel: [null]
    });
  }

  showOption(e) {
    if(e.value === "PERSONALIZADO") {
      this.showUploadFile = true;
    } else {
      this.showUploadFile = false;
      this.fileFormNotification.reset();
      this.showErrorExtNotification = false;
      this.nameFileNotification = "";
    }
  }

}
