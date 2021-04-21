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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
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
  ) {
  }
  dateFormHoja: FormGroup;
  dataAddImagen: FormGroup;
  nextPayment: any;
  afterPayment: any;
  displayedColumns: string[] = ['negocio', 'linksgenerator', 'linksclicker', 'commision', 'sells'];
  selectedTab: number = 1;
  dateLastPayment: any;
  placeholder: string;
  @ViewChild("templateInfoPersonal", { static: false }) templateAddImagenCarousel: TemplateRef<any>;
  @Output() state = new EventEmitter();
  @Output() comunications = new EventEmitter();
  @Output() verified = new EventEmitter();
  @Output() IdentificationCard1 = new EventEmitter();
  @Output() IdentificationCard2 = new EventEmitter();
  @Output() bankCertificate = new EventEmitter();
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
  changeStatus() {
    this.state.emit(event);
  }

  changeComunications() {
    this.comunications.emit(event);
  }

  changeVerified() {
    this.verified.emit(event);
  }

  IdentificationCard1Download() {
    this.IdentificationCard1.emit(event);
  }

  IdentificationCard2Download() {
    this.IdentificationCard2.emit(event);
  }

  bankCardDownload() {
    this.bankCertificate.emit(event);
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

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
  public saveInfoPersonal() {
    let datos = {
      userId: this.data.userId,
      email: this.dataAddImagen.controls.email.value,
      cellPhone: this.dataAddImagen.controls.cellphone.value,
      identification: this.dataAddImagen.controls.number.value,
    }
    this.user.updateInfoClicker(datos).subscribe((resp) => {
      this.onNoClickEdit();
    })
  }
}
