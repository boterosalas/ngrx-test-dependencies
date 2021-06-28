import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  TemplateRef
} from "@angular/core";
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { ResponseService } from "src/app/interfaces/response";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { ModalGenericComponent } from "src/app/modules/shared/components/modal-generic/modal-generic.component";
moment.locale("es");
@Component({
  selector: "app-dialog-user",
  templateUrl: "./dialog-user.component.html",
  styleUrls: ["./dialog-user.component.scss"]
})
export class DialogUserComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<any>,
    public dialogRef2: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private user: UserService,
    private auth: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ) {
  }
  dateFormHoja: FormGroup;
  dataAddImagen: FormGroup;
  dataRejectionMessage: FormGroup;
  dateSelectedState: FormGroup;
  nextPayment: any;
  afterPayment: any;
  displayedColumns: string[] = ['negocio', 'linksgenerator', 'linksclicker', 'commision', 'sells'];
  selectedTab: number = 1;
  dateLastPayment: any;
  placeholder: string;
  @ViewChild("templateInfoPersonal", { static: false }) templateAddImagenCarousel: TemplateRef<any>;
  @ViewChild("templateRejectionMessage", { static: false }) templateRejectionMessageCarousel: TemplateRef<any>;
  @Output() state = new EventEmitter();
  @Output() comunications = new EventEmitter();
  @Output() verified = new EventEmitter();
  @Output() downloadFiles = new EventEmitter();
  isLoggedIn: any;
  private subscription: Subscription = new Subscription();
  idAdmin: string;
  dataSourceBusi = [];
  maxDate = moment(new Date());
  locale = {
    locale: "es",
    direction: "ltr", // could be rtl
    weekLabel: "W",
    separator: " a ", // default is ' - '
    cancelLabel: "Cancelar", // detault is 'Cancel'
    applyLabel: "Aplicar", // detault is 'Apply'
    clearLabel: "Limpiar", // detault is 'Clear'
    customRangeLabel: "Custom range",
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: 1 // first day is monday
  };
  accountStatements: any;
  enableRejectionMessage: boolean = false;
  rejectionMessage: string;
  selectedFiles = [];
  base64IdentificationCard1: string = "";
  base64IdentificationCard2: string = "";
  base64BankCard: string = "";
  base64RUT: string = "";

  changeStatus() {
    this.state.emit(event);
  }

  changeComunications() {
    this.comunications.emit(event);
  }

  changeVerified() {
    this.enableDisabledEditMessage();
    this.verified.emit(this.dateSelectedState.controls.state.value);
  }
  
  downloadSelectedFiles() {
    if (this.selectedFiles.length > 0) {
      const data = {
        userId: this.data.userId,
        typeDocument: this.selectedFiles
      }
      this.downloadFiles.emit(data);
    } else {
      this.openSnackBar("No ha seleccionado ningún archivo.", "Cerrar");
    }
  }

  changeValue(event, item) {
    this.addOrRemoveItem(event.checked, item);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onNoClickEdit(): void {
    this.dialogRef2.close();
  }
  pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.dataAddImagen = this.fb.group({
      number: [null, Validators.required],
      email: [null, Validators.required],
      cellphone: [null, Validators.required],
    });
    this.dataRejectionMessage = this.fb.group({
      message: [null, Validators.required],
    });
    this.dateSelectedState = this.fb.group({
      state: [null, Validators.required],
    });

    this.getStatusVerificationUser();
    this.preloadImagesPreview();
    document.addEventListener("click", this.hiddenVisibilityPreview, false);
  }

  ngOnDestroy(): void {
    document.removeEventListener("click", this.hiddenVisibilityPreview, false);
    this.subscription.unsubscribe();
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  public getStatusVerificationUser() {
    this.subscription = this.user.getStatusVerification()
    .subscribe(
      (resp: ResponseService) => {
        if (resp.state === "Success") {
          this.accountStatements = resp.objectResponse.map(state => {
            return {...state, value: this.capitalizeFirstLetter(state.value)}
          });
          const objectState = this.accountStatements.find(state => state.value === this.capitalizeFirstLetter(this.data.verified));
          if (objectState) {
            this.dateSelectedState.controls.state.setValue(objectState.id.toString());
            this.enableDisabledEditMessage();
          }
        } else {
          this.openSnackBar(resp.userMessage, "Cerrar");
        }
      },
      (err) => {
        this.openSnackBar(err.userMessage, "Cerrar");
      }
    );
  }

  private capitalizeFirstLetter(str: string) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
  }

  enableDisabledEditMessage() {
    let idRejected = this.accountStatements.find((state) => state.code === "REJECTED").id;
    this.enableRejectionMessage = this.dateSelectedState.controls.state.value === idRejected.toString() ? true : false;
  }

  changeTabs(tabSelected: number) {
    //this.dateFormHoja.controls.dateRange.setValue(null);
    this.selectedTab = tabSelected;
    if (this.selectedTab === 2) {
      let endDate = new Date();
      let m = endDate.getMonth() + 1
      let datesEnd = endDate.getFullYear() + "-" + this.pad(m) + "-" + this.pad(endDate.getDate());
      let datesStart = endDate.getFullYear() + "-" + this.pad(m) + "-" + '01';
      let datos = {
        start: datesStart,
        end: datesEnd,
        userId: this.data.userId
      }
      this.placeholder = endDate.getFullYear() + "/" + this.pad(m) + "/" + '01' + " a " + endDate.getFullYear() + "/" + this.pad(m) + "/" + this.pad(endDate.getDate());
      this.dateFormHoja = this.fb.group({
        dateRange: [null, Validators.required],
      });
      this.getDatasHoja(datos);
    }
  }
  getDatas() {
    if (this.dateFormHoja.controls.dateRange.value != null) {
      let data = {
        start: this.dateFormHoja.controls.dateRange.value.startDate.format("YYYY-MM-DD"),
        end: this.dateFormHoja.controls.dateRange.value.endDate.format("YYYY-MM-DD"),
        userId: this.data.userId
      }
      this.getDatasHoja(data);
    }

  }
  getDatasHoja(data: any) {
    this.user.getHojaVida(data).subscribe((resp: any) => {
      this.dataSourceBusi = resp.objectResponse;
      this.nextPayment = resp.objectResponse[0].proximopago;
      this.afterPayment = resp.objectResponse[0].ultimovalorpagado;
      this.dateLastPayment = resp.objectResponse[0].ultimafechapago;
      this.dataSourceBusi.push({
        negocio: "TOTAL",
        icondashboard: "",
        linksgenerados: resp.objectResponse[0].totallinkgenerados,
        linkclickeados: resp.objectResponse[0].totallinkclickeados,
        comisiones: resp.objectResponse[0].totalcomisiones,
        ventas: resp.objectResponse[0].totalventas
      })
    });

  }
  editInfoPersonal() {
    const title = "Editar datos personales";
    const idBussiness = 1;
    const edit = 0;
    const template = this.templateAddImagenCarousel;

    this.dataAddImagen.reset();
    this.dataAddImagen.controls.number.setValue(this.data.identification)
    this.dataAddImagen.controls.cellphone.setValue(this.data.cellphone)
    this.dataAddImagen.controls.email.setValue(this.data.email)
    this.dialogRef2 = this.dialog.open(ModalGenericComponent, {
      width: "450px",
      data: {
        title,
        idBussiness,
        template,
        edit
      },
    });
  }
  editRejectionMessage() {
    const title = "Editar mensaje de rechazo";
    const idBussiness = 2;
    const edit = 0;
    const template = this.templateRejectionMessageCarousel;

    this.dataRejectionMessage.reset();
    this.dialogRef2 = this.dialog.open(ModalGenericComponent, {
      width: "450px",
      data: {
        title,
        idBussiness,
        template,
        edit
      },
    });
  }
  public saveInfoPersonal() {
    let datos = {
      userId: this.data.userId,
      email: this.dataAddImagen.controls.email.value,
      cellPhone: this.dataAddImagen.controls.cellphone.value,
      identification: this.dataAddImagen.controls.number.value,
    }
    this.user.updateInfoClicker(datos).subscribe((resp: ResponseService) => {
      if (resp.state === "Success") {
        this.data.identification = this.dataAddImagen.controls.number.value;
        this.data.cellphone = this.dataAddImagen.controls.cellphone.value;
        this.data.email = this.dataAddImagen.controls.email.value;
        this.onNoClickEdit();
      } else {
        this.openSnackBar(resp.userMessage, "Cerrar");
      }
    })
  }

  public saveRejectionMessage() {
    let datos = {
      userId: this.data.userId,
      message: this.dataRejectionMessage.controls.message.value
    }
    this.user.postUpdateResponseAccountBank(datos).subscribe((resp) => {
      this.data.responseAccountBank = this.dataRejectionMessage.controls.message.value;
      this.onNoClickEdit();
    })
  }

  private addOrRemoveItem(value, item) {
    if (value && !this.selectedFiles.includes(item)) {
      this.selectedFiles.push(item);
    } else if (!value) {
      this.selectedFiles = this.selectedFiles.filter(val => val !== item);
    }
  }

  private preloadImagesPreview() {
    const formats = [
      { extension: ".jpg", contentType: "image/jpeg" },
      { extension: ".jpeg", contentType: "image/jpeg" },
      { extension: ".png", contentType: "image/png" },
      { extension: ".pdf", contentType: "application/pdf" }
    ];
    
    const contentTypeIdentCard1 = formats.filter(format => format.extension === this.data.extensionIdentificationCard1); 
    const contentTypeIdentCard2 = formats.filter(format => format.extension === this.data.extensionIdentificationCard2); 
    const contentTypeBankCard = formats.filter(format => format.extension === this.data.extensionBankCertificate);
    const contentTypeRUT = formats.filter(format => format.extension === this.data.extensionRUT);

    if (this.data.fileIdentificationCard1) {
      this.base64IdentificationCard1 = `data:${contentTypeIdentCard1.length > 0 
        ? contentTypeIdentCard1[0].contentType 
        : "image/jpeg"};base64,${this.data.fileIdentificationCard1}`;
    }

    if (this.data.fileIdentificationCard2) {
      this.base64IdentificationCard2 = `data:${contentTypeIdentCard2.length > 0 
        ? contentTypeIdentCard2[0].contentType 
        : "image/jpeg"};base64,${this.data.fileIdentificationCard2}`;
    }

    if (this.data.fileBankCertificate && contentTypeBankCard[0].extension !== ".pdf") {
      this.base64BankCard = `data:${contentTypeBankCard.length > 0 
        ? contentTypeBankCard[0].contentType 
        : "image/jpeg"};base64,${this.data.fileBankCertificate}`;
    }

    if (this.data.fileRUT) {
      this.base64RUT = `data:${contentTypeRUT.length > 0 
        ? contentTypeRUT[0].contentType 
        : "image/jpeg"};base64,${this.data.fileRUT}`;
    }
  }

  private hiddenVisibilityPreview(event: any) {
    const previews = document.querySelectorAll(".preview-image.visibility");

    previews.forEach(preview => {
      const link = preview ? preview.parentElement.querySelector(":scope > a") : preview;

      if (preview && !preview.contains(event.target) && !link.contains(event.target)) {
        preview.classList.remove("visibility");
      }
    });
  }

  showVisibilityPreview(event) {
    const preview = event.target.parentElement.querySelector(":scope > .preview-image");

    if (preview && !preview.classList.contains("visibility")) {
      preview.classList.add("visibility");
    }
  }
}
