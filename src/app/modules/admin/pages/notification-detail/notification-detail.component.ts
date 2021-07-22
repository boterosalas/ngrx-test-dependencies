import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { ContentService } from "src/app/services/content.service";
import { UtilsService } from "src/app/services/utils.service";
moment.locale("es");

@Component({
  selector: "app-notification-detail",
  templateUrl: "./notification-detail.component.html",
  styleUrls: ["./notification-detail.component.scss"],
})
export class NotificationDetailComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  item: any;

  fileFormNotification: FormGroup;
  nameFileNotification: string;
  showErrorExtNotification: boolean;
  validFormat: boolean;
  showUploadFile = false;

  datePublication: any = "";
  hourDate: any = "";
  minDate = new Date();
  minHours: any;
  publish:boolean;
  date = null;
  hour = null;
  publicationDate:any;
  file:string;
  uploadFile = false;

  EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  notificationForm: FormGroup;
  configurarEditor: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "300px",
    minHeight: "0",
    maxHeight: "auto",
    width: "720px",
    minWidth: "0",
    translate: "yes",
    showToolbar: true,
    placeholder: "Escriba su articulo...",
    toolbarHiddenButtons: [
      [
        "heading",
        "insertImage",
        "insertVideo",
        "customClasses",
        "removeFormat",
        "fontName",
        "backgroundColor",
        "insertHorizontalRule",
        "toggleEditorMode",
        "undo",
        "redo",
        "strikeThrough",
        "subscript",
        "superscript",
        "justifyLeft",
        "justifyCenter",
        "justifyRight",
        "justifyFull",
      ],
    ],
    defaultParagraphSeparator: "p",
    defaultFontName: "",
    defaultFontSize: "",
    enableToolbar: true,
    sanitize: true,
    toolbarPosition: "top",
  };

  filters = [
    { name: "Total usuarios", value: "TODOS" },
    { name: "Usuarios registrados", value: "REGISTRADOS" },
    { name: "Usuarios activos", value: "ACTIVOS" },
    { name: "Personalizado (Archivo .xlsx)", value: "PERSONALIZADO" },
  ];

  constructor(
    private _content: ContentService,
    private fb: FormBuilder,
    private utils: UtilsService,
    private router:Router
  ) {}

  ngOnInit() {
    this.nameFileNotification = "";
    this.formNotification();

    this.fileFormNotification = this.fb.group({
      file: [null],
    });
  }

  public onFileChangeNotification(event) {
    this.nameFileNotification = event.target.files[0].name;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let fileBlob = new Blob([file], { type: this.EXCEL_TYPE });
      let file2 = new File([fileBlob], this.nameFileNotification, {
        type: this.EXCEL_TYPE,
      });
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.getExtension(this.nameFileNotification);
        if (this.validFormat === true) {
          this.fileFormNotification.controls.file.patchValue({
            file: reader.result,
          });
          this.uploadFile = false;
          this.showErrorExtNotification = false;
        } else {
          this.showErrorExtNotification = true;
          this.uploadFile = true;
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
      title: ["", Validators.required],
      termsEditor: ["", Validators.required],
      filterUsers: ["", Validators.required],
      date: [null],
      hour: [null],
    });
  }

  showOption(e) {
    if (e.value === "PERSONALIZADO") {
      this.showUploadFile = true;
      this.uploadFile = true;
    } else {
      this.showUploadFile = false;
      this.fileFormNotification.reset();
      this.showErrorExtNotification = false;
      this.nameFileNotification = "";
      this.uploadFile = false;
    }
  }

  saveNotification() {

    if(this.notificationForm.controls.date.value !== null) {
      this.date = moment(this.notificationForm.controls.date.value).format(
        "YYYY-MM-DD"
      );
    }
    if(this.notificationForm.controls.hour.value !== null) {
      this.hour = this.utils.HoraMilitar(
        this.notificationForm.controls.hour.value
      );
    }

    if(this.date !== null) {
      this.publicationDate = `${this.date} ${this.hour}`;
      this.publish = false;
    } else{
      this.publicationDate = null
      this.publish = true;
    }

    let fileValue = this.fileFormNotification.controls.file.value;

    if(fileValue !== null) {
      let split = fileValue.file.split('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,');
      this.file = split[1];
    }

    let data = {
      id: 0,
      title: this.notificationForm.controls.title.value,
      content: this.notificationForm.controls.termsEditor.value,
      publish: this.publish,
      datestart: this.publicationDate,
      dateend: null,
      filter: this.notificationForm.controls.filterUsers.value,
      file: this.file,
    };

    this._content.saveNotificationAdmin(data).subscribe(()=> {
      this.router.navigate(['/notificaciones-admin'])
    })

  }
}
