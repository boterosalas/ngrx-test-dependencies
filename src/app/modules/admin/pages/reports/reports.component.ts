import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { ResponseService } from 'src/app/interfaces/response';
import { LoaderService } from 'src/app/services/loader.service';
import { Subscription } from 'rxjs';
import { ValidateDate } from 'src/app/validators/validate-date.validators';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from 'src/app/services/utils.service';
import { SellReportFormComponent } from '../../components/sell-report-form/sell-report-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  @ViewChild('templateCardReport, templateCardCross, templateCardPayReward', { static: false })
  template: TemplateRef<any>;

  fileUrl: string;
  fileForm: FormGroup;
  fileFormPicking: FormGroup;
  fileFormPayment: FormGroup;
  nameFile: string;
  nameFilePayment: string;
  nameFilePicking: string;
  dateForm: FormGroup;
  dateFormSell: FormGroup;
  showErrorExt: boolean;
  showErrorExtPayment: boolean;
  showErrorExtPicking: boolean;
  validFormat: boolean;
  isLoggedIn: any;
  userName: string;
  tmpPath: string;
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  private subscription: Subscription = new Subscription();
  maxDate = moment(new Date());
  maxDate2 = new Date();

  date: any;

  dateParams: any;
  disButon: boolean;
  email: string;

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

  constructor(
    private file: LinksService,
    private fb: FormBuilder,
    private auth: AuthService,
    private user: UserService,
    private loading: LoaderService,
    private cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private usersService: UserService,
    public utils: UtilsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.nameFile = '';
    this.nameFilePayment = '';
    this.nameFilePicking = '';

    this.dateFormSell = this.fb.group({
      dateRange: [null, Validators.required],
    });

    this.fileForm = this.fb.group({
      file: [null],
    });

    this.fileFormPayment = this.fb.group({
      file: [null],
    });

    this.fileFormPicking = this.fb.group({
      file: [null],
    });

    this.dateForm = this.fb.group(
      {
        dateStart: ['', Validators.required],
        dateEnd: ['', Validators.required],
      },
      {
        validator: [ValidateDate.CompareDates],
      }
    );
    this.checkRole();
    this.CutOffDate();
  }

  checkRole() {
    this.utils.checkPermision();
  }

  public getFileReport() {
    this.subscription = this.file.getFileReport().subscribe((file) => {
      if (file.state === 'Success') {
        this.openSnackBar(file.userMessage, 'Cerrar');
        this.dateFormSell.reset();
        if (this.dateFormSell.controls.dateRange.value.startDate === null) {
          this.disButon = true;
        }
      }
    });
  }

  change() {
    this.disButon = false;
  }

  public onFileChangeTrip(event) {
    this.nameFile = event.target.files[0].name;
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileBlob = new Blob([file], { type: this.EXCEL_TYPE });
      const file2 = new File([fileBlob], this.nameFile, {
        type: this.EXCEL_TYPE,
      });
      reader.readAsDataURL(file2);

      reader.onload = () => {
        this.fileForm.controls.file.patchValue({
          file: reader.result,
        });
        this.getExtension(this.nameFile);
        if (this.validFormat === true) {
          this.showErrorExt = false;
          this.sendFileTrip();
        } else {
          this.showErrorExt = true;
        }
      };
    }
  }

  public onFileChangePayment(event) {
    this.nameFilePayment = event.target.files[0].name;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileBlob = new Blob([file], { type: this.EXCEL_TYPE });
      const file2 = new File([fileBlob], this.nameFilePayment, {
        type: this.EXCEL_TYPE,
      });
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.fileFormPayment.controls.file.patchValue({
          file: reader.result,
        });
        this.getExtension(this.nameFilePayment);
        if (this.validFormat === true) {
          this.showErrorExtPayment = false;
          this.sendFilePayment();
        } else {
          this.showErrorExtPayment = true;
        }
      };
    }
  }

  public onFileChangePicking(event) {
    this.nameFilePicking = event.target.files[0].name;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileBlob = new Blob([file], { type: this.EXCEL_TYPE });
      const filePicking = new File([fileBlob], this.nameFilePicking, {
        type: this.EXCEL_TYPE,
      });
      reader.readAsDataURL(filePicking);
      reader.onload = () => {
        this.fileFormPicking.controls.file.patchValue({
          file: reader.result,
        });
        this.getExtension(this.nameFilePicking);
        if (this.validFormat === true) {
          this.showErrorExtPicking = false;
          this.sendFilePicking();
        } else {
          this.showErrorExtPicking = true;
        }
      };
    }
  }

  private getExtension(nameFile: string) {
    const splitExt = nameFile.split('.');
    const getExt = splitExt[1];
    this.validFormat = false;
    if (getExt === 'xlsx' || getExt === 'xls') {
      this.validFormat = true;
    }
  }

  private sendFileTrip() {
    const fileSplit = this.fileForm.controls.file.value.file.split(',');
    const file = fileSplit[1];
    const data = {
      fileBase64: file,
      email: this.userName,
    };
    this.loading.show();
    this.subscription = this.file.sendfile(data).subscribe(
      (res: ResponseService) => {
        this.loading.hide();
        if (res.state !== 'Error') {
          Swal.fire({
            title: 'Carga exitosa',
            text: res.userMessage,
            type: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'upload-success',
          }).then(() => {
            this.nameFile = '';
          });
        } else {
          Swal.fire({
            title: 'Error en la Carga',
            text: res.userMessage,
            type: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'upload-error',
          }).then(() => {
            this.nameFile = '';
          });
        }
      },
      (error) => {
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          text: error.error.userMessage,
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'upload-invalid',
        }).then(() => {
          this.nameFile = '';
        });
      }
    );
  }

  private sendFilePayment() {
    const fileSplit = this.fileFormPayment.controls.file.value.file.split(',');
    const file = fileSplit[1];
    const data = {
      fileBase64: file,
      business: 'seguros',
      email: this.userName,
    };

    this.subscription = this.file.updatePaymentDate(data).subscribe(
      (res: ResponseService) => {
        if (res.state !== 'Error') {
          Swal.fire({
            title: 'Carga exitosa',
            text: res.userMessage,
            type: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'upload-success',
          }).then(() => {
            this.nameFilePayment = '';
          });
        } else {
          Swal.fire({
            title: 'Error en la Carga',
            text: res.userMessage,
            type: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'upload-error',
          }).then(() => {
            this.nameFilePayment = '';
          });
        }
      },
      (error) => {
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          text: error.error.userMessage,
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'upload-invalid',
        }).then(() => {
          this.nameFilePayment = '';
        });
      }
    );
  }

  private sendFilePicking() {
    const fileSplit = this.fileFormPicking.controls.file.value.file.split(',');
    const file = fileSplit[1];
    const data = {
      file: file,
    };
    this.loading.show();
    this.subscription = this.file.sendPickingfile(data).subscribe(
      (picking: ResponseService) => {
        this.loading.hide();
        if (picking.state !== 'Error') {
          Swal.fire({
            title: 'Carga exitosa',
            text: picking.userMessage,
            type: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'upload-success',
          }).then(() => {
            this.nameFilePicking = '';
          });
        } else {
          Swal.fire({
            title: 'Error en la Carga',
            text: picking.userMessage,
            type: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'upload-error',
          }).then(() => {
            this.nameFilePicking = '';
          });
        }
      },
      (errorPicking) => {
        this.loading.hide();
        Swal.fire({
          title: errorPicking.statusText,
          text: errorPicking.error.userMessage,
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'upload-invalid',
        }).then(() => {
          this.nameFilePicking = '';
        });
      }
    );
  }

  public downloadReferal() {
    const dates = {
      dateStart: this.dateForm.controls.dateStart.value,
      dateEnd: this.dateForm.controls.dateEnd.value,
    };
    this.subscription = this.file.downloadReferrals(dates).subscribe((resp: ResponseService) => {
      const file = resp.objectResponse;
      const contentType = 'application/vnd.ms-excel';
      const linkSource = `data:${contentType};base64,${file}`;
      const downloadLink = document.createElement('a');
      const fileName = `reporte.xlsx`;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
      this.dateForm.reset();
      this.dateForm.controls.dateStart.setValue('');
      this.dateForm.controls.dateEnd.setValue('');
      setTimeout(() => {
        this.dateForm.controls.dateEnd.setErrors(null);
        this.dateForm.controls.dateStart.setErrors(null);
      });
    });
  }

  /**
   * Abre el mensaje de confirmacion de copiado del link
   * @param message mensaje
   * @param action accion
   */

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  public getReportClickam() {
    this.dateParams = {
      start: this.dateFormSell.controls.dateRange.value.startDate.format(),
      end: this.dateFormSell.controls.dateRange.value.endDate.format(),
    };

    this.subscription = this.file.getReportClickam(this.dateParams).subscribe((resp: ResponseService) => {
      if (resp.state === 'Success') {
        this.openSnackBar(resp.userMessage, 'Cerrar');
        this.dateFormSell.reset();
        if (this.dateFormSell.controls.dateRange.value.startDate === null) {
          this.disButon = true;
        }
      }
    });
  }

  public changeMonth(value: number) {
    Swal.fire({
      html: "<h3>Cambio de corte</h3> <p class='w-container'>¿Está seguro que desea realizar el cambio de mes?</p>",
      confirmButtonText: 'Confirmar cambio de corte',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonClass: 'month order-last',
      cancelButtonClass: 'updatecancel',
      allowOutsideClick: false,
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.subscription = this.file.saveCutOffDate(value).subscribe((save: ResponseService) => {
          this.utils.openSnackBar(save.userMessage, 'Cerrar');
          this.CutOffDate();
        });
      }
    });
  }

  public CutOffDate() {
    this.subscription = this.file.getCutOffDate().subscribe((resp) => {
      this.date = moment(resp).format('MMMM, y');
    });
  }

  public openModalFilters() {
    this.dialog.open(SellReportFormComponent, {
      width: '450px',
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
