import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { faTshirt } from "@fortawesome/free-solid-svg-icons";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { ResponseService } from "src/app/interfaces/response";
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
  idNotification:any;
  urlDownload:any = null;

  maxDate = moment(new Date());
  showDate = false;

  locale = {
    locale: 'es',
    direction: 'ltr', // could be rtl
    weekLabel: 'W',
    separator: ' a ', // default is ' - '
    cancelLabel: 'Cancelar', // detault is 'Cancel'
    applyLabel: 'Aplicar', // detault is 'Apply'
    clearLabel: 'Limpiar', // detault is 'Clear'
    customRangeLabel: 'Custom range',
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: 1 // first day is monday
  }

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

  title = 'crear';
  titleBoton="Publicar"

  constructor(
    private _content: ContentService,
    private fb: FormBuilder,
    private utils: UtilsService,
    private router:Router,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(data => {
      this.idNotification= data.id;
    })
  }

  ngOnInit() {
    this.nameFileNotification = "";
    this.formNotification();

    this.fileFormNotification = this.fb.group({
      file: [null],
    });

    if(this.idNotification !== undefined){
      this.getNotification();
      this.title = "editar";
      this.titleBoton ="Editar";
    }

  }
  
  public getNotification() {
    this._content.getNotificationDetailAdmin(this.idNotification).subscribe((notification:ResponseService) =>{
      this.notificationForm.controls.title.setValue(notification.objectResponse.title);
      this.notificationForm.controls.termsEditor.setValue(notification.objectResponse.content);
      this.notificationForm.controls.filterUsers.setValue(notification.objectResponse.filter);
      let filterName = notification.objectResponse.filter;
      this.getName(filterName);
      this.notificationForm.controls.dateRange.setValue({startDate: notification.objectResponse.datestart, endDate: notification.objectResponse.datestart});
      let splitDatepublish = notification.objectResponse.datepublish.split('T');
      let date = splitDatepublish[0];
      let hour = splitDatepublish[1];
      let transformStandart = this.utils.toStandardTime(hour);
      this.notificationForm.controls.date.setValue(date);
      this.notificationForm.controls.hour.setValue(transformStandart);
      this.urlDownload = notification.objectResponse.url;
    });
  }

  private getName(value) {
    if (value === "PERSONALIZADO") {
      this.showUploadFile = true;
      this.uploadFile = true;
      this.showDate = false;
      this.notificationForm.controls.dateRange.setValue(null);
    } else {
      this.showUploadFile = false;
      this.fileFormNotification.reset();
      this.showErrorExtNotification = false;
      this.nameFileNotification = "";
      this.uploadFile = false;
      this.showDate = true;
    }

    if (value=== "TODOS") {
      this.showDate = false;
      this.notificationForm.controls.dateRange.setValue(null);
    }
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
      dateRange:[null]
    });
  }

  showOption(e) {
    if (e.value === "PERSONALIZADO") {
      this.showUploadFile = true;
      this.uploadFile = true;
      this.showDate = false;
      this.notificationForm.controls.dateRange.setValue(null);
    } else {
      this.showUploadFile = false;
      this.fileFormNotification.reset();
      this.showErrorExtNotification = false;
      this.nameFileNotification = "";
      this.uploadFile = false;
      this.showDate = true;
    }
    
    if (e.value === "TODOS") {
      this.showDate = false;
      this.notificationForm.controls.dateRange.setValue(null);
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
      id: this.idNotification === undefined ? 0 : this.idNotification,
      title: this.notificationForm.controls.title.value,
      content: this.notificationForm.controls.termsEditor.value,
      publish: this.publish,
      datepublish: this.publicationDate,
      datestart: this.notificationForm.controls.dateRange.value !== null ? this.notificationForm.controls.dateRange.value.startDate : null,
      dateend:  this.notificationForm.controls.dateRange.value !== null ? this.notificationForm.controls.dateRange.value.endDate : null,
      filter: this.notificationForm.controls.filterUsers.value,
      file: this.file,
    };

    this._content.saveNotificationAdmin(data).subscribe(()=> {
      this.router.navigate(['/notificaciones-admin'])
    })

  }
}