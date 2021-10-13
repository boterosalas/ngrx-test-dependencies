import { Component, OnInit, Inject, Output, EventEmitter, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseService } from 'src/app/interfaces/response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { UtilsService } from 'src/app/services/utils.service';
moment.locale('es');
@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss'],
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
    private utils: UtilsService
  ) {}
  dateFormHoja: FormGroup;
  dataAddImagen: FormGroup;
  dataRejectionMessage: FormGroup;
  dateSelectedState: FormGroup;
  nextPayment: any;
  afterPayment: any;
  displayedColumns: string[] = ['negocio', 'linksgenerator', 'linksclicker', 'commision', 'sells'];
  selectedTab = 1;
  dateLastPayment: any;
  placeholder: string;
  @ViewChild('templateInfoPersonal', { static: false })
  templateAddImagenCarousel: TemplateRef<any>;
  @ViewChild('templateRejectionMessage', { static: false })
  templateRejectionMessageCarousel: TemplateRef<any>;
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
    firstDay: 1, // first day is monday
  };
  accountStatements: any;
  enableRejectionMessage = false;
  rejectionMessage: string;
  selectedFiles = [];

  changeStatus() {
    this.state.emit(event);
  }

  changeInternal(e) {
    const changeUser = {
      userId: this.data.userId,
      isEmployeeGrupoExito: e.checked
    }
    this.user.changeOrigin(changeUser).subscribe((respInternal:any) => {
      this.openSnackBar(respInternal.userMessage, 'Cerrar');
    });
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
        typeDocument: this.selectedFiles,
      };
      this.downloadFiles.emit(data);
    } else {
      this.openSnackBar('No ha seleccionado ningún archivo.', 'Cerrar');
    }
  }

  private showFilemsg() {
    this.openSnackBar('El archivo no existe.', 'Cerrar');
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

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  public getStatusVerificationUser() {
    this.subscription = this.user.getStatusVerification().subscribe(
      (resp: ResponseService) => {
        if (resp.state === 'Success') {
          this.accountStatements = resp.objectResponse.map((state) => {
            return { ...state, value: this.capitalizeFirstLetter(state.value) };
          });
          const objectState = this.accountStatements.find((state) => state.value === this.capitalizeFirstLetter(this.data.verified));
          if (objectState) {
            this.dateSelectedState.controls.state.setValue(objectState.id.toString());
            this.enableDisabledEditMessage();
          }
        } else {
          this.openSnackBar(resp.userMessage, 'Cerrar');
        }
      },
      (err) => {
        this.openSnackBar(err.userMessage, 'Cerrar');
      }
    );
  }

  private capitalizeFirstLetter(str: string) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
  }

  enableDisabledEditMessage() {
    const idRejected = this.accountStatements.find((state) => state.code === 'REJECTED').id;
    if (this.dateSelectedState.controls.state.value === idRejected.toString()) {
      this.enableRejectionMessage = true;
    } else {
      this.enableRejectionMessage = false;
    }
  }

  changeTabs(tabSelected: number) {
    this.selectedTab = tabSelected;
    if (this.selectedTab === 2) {
      const endDate = new Date();
      const m = endDate.getMonth() + 1;
      const datesEnd = endDate.getFullYear() + '-' + this.pad(m) + '-' + this.pad(endDate.getDate());
      const datesStart = endDate.getFullYear() + '-' + this.pad(m) + '-' + '01';
      const datos = {
        start: datesStart,
        end: datesEnd,
        userId: this.data.userId,
      };
      this.placeholder =
        endDate.getFullYear() +
        '/' +
        this.pad(m) +
        '/' +
        '01' +
        ' a ' +
        endDate.getFullYear() +
        '/' +
        this.pad(m) +
        '/' +
        this.pad(endDate.getDate());
      this.dateFormHoja = this.fb.group({
        dateRange: [null, Validators.required],
      });
      this.getDatasHoja(datos);
    }
  }
  getDatas() {
    if (this.dateFormHoja.controls.dateRange.value != null) {
      const data = {
        start: this.dateFormHoja.controls.dateRange.value.startDate.format('YYYY-MM-DD'),
        end: this.dateFormHoja.controls.dateRange.value.endDate.format('YYYY-MM-DD'),
        userId: this.data.userId,
      };
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
        negocio: 'TOTAL',
        icondashboard: '',
        linksgenerados: resp.objectResponse[0].totallinkgenerados,
        linkclickeados: resp.objectResponse[0].totallinkclickeados,
        comisiones: resp.objectResponse[0].totalcomisiones,
        ventas: resp.objectResponse[0].totalventas,
      });
    });
  }
  editInfoPersonal() {
    const title = 'Editar datos personales';
    const idBussiness = 1;
    const edit = 0;
    const template = this.templateAddImagenCarousel;

    this.dataAddImagen.reset();
    this.dataAddImagen.controls.number.setValue(this.data.identification);
    this.dataAddImagen.controls.cellphone.setValue(this.data.cellphone);
    this.dataAddImagen.controls.email.setValue(this.data.email);
    this.dialogRef2 = this.dialog.open(ModalGenericComponent, {
      width: '450px',
      data: {
        title,
        idBussiness,
        template,
        edit,
      },
    });
  }
  
  editRejectionMessage() {
    const title = 'Editar mensaje de rechazo';
    const idBussiness = 2;
    const edit = 0;
    const template = this.templateRejectionMessageCarousel;

    this.dataRejectionMessage.reset();
    this.dialogRef2 = this.dialog.open(ModalGenericComponent, {
      width: '450px',
      data: {
        title,
        idBussiness,
        template,
        edit,
      },
    });
  }
  public saveInfoPersonal() {
    const datos = {
      userId: this.data.userId,
      email: this.dataAddImagen.controls.email.value,
      cellPhone: this.dataAddImagen.controls.cellphone.value,
      identification: this.dataAddImagen.controls.number.value,
    };
    this.user.updateInfoClicker(datos).subscribe((resp: ResponseService) => {
      if (resp.state === 'Success') {
        this.data.identification = this.dataAddImagen.controls.number.value;
        this.data.cellphone = this.dataAddImagen.controls.cellphone.value;
        this.data.email = this.dataAddImagen.controls.email.value;
        this.onNoClickEdit();
      } else {
        this.openSnackBar(resp.userMessage, 'Cerrar');
      }
    });
  }

  public saveRejectionMessage() {
    const datos = {
      userId: this.data.userId,
      message: this.dataRejectionMessage.controls.message.value,
    };
    this.user.postUpdateResponseAccountBank(datos).subscribe((resp) => {
      this.data.responseAccountBank = this.dataRejectionMessage.controls.message.value;
      this.onNoClickEdit();
    });
  }

  private addOrRemoveItem(value, item) {
    if (value && !this.selectedFiles.includes(item)) {
      this.selectedFiles.push(item);
    } else if (!value) {
      this.selectedFiles = this.selectedFiles.filter((val) => val !== item);
    }
  }

  public previewDocument(typeDocument: string) {
    switch (typeDocument) {
      case 'IdentificationCard1':
        if (this.data.fileIdentificationCard1 !== '') {
          if (this.data.extensionIdentificationCard1 === '.jpg') {
            this.utils.openpreviewImage(this.data.fileIdentificationCard1);
          } else {
            this.utils.openpreviewPdf(this.data.fileIdentificationCard1);
          }
        } else {
          this.showFilemsg();
        }
        break;
      case 'IdentificationCard2':
        if (this.data.fileIdentificationCard2 !== '') {
          if (this.data.extensionIdentificationCard2 === '.jpg') {
            this.utils.openpreviewImage(this.data.fileIdentificationCard2);
          } else {
            this.utils.openpreviewPdf(this.data.fileIdentificationCard2);
          }
        } else {
          this.showFilemsg();
        }
        break;
      case 'BankCertificate':
        if (this.data.fileBankCertificate !== '') {
          if (this.data.extensionBankCertificate === '.jpg') {
            this.utils.openpreviewImage(this.data.fileBankCertificate);
          } else {
            this.utils.openpreviewPdf(this.data.fileBankCertificate);
          }
        } else {
          this.showFilemsg();
        }
        break;
      case 'Rut':
        if (this.data.fileRUT !== '') {
          if (this.data.extensionRUT === '.jpg') {
            this.utils.openpreviewImage(this.data.fileRUT);
          } else {
            this.utils.openpreviewPdf(this.data.fileRUT);
          }
        } else {
          this.showFilemsg();
        }
        break;
    }
  }
}
