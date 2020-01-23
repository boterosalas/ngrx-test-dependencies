import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { LinksService } from "src/app/services/links.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";
import { ResponseService } from "src/app/interfaces/response";
import { LoaderService } from "src/app/services/loader.service";
import { Subscription } from "rxjs";
import { ValidateDate } from "src/app/validators/validate-date.validators";
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"]
})
export class ReportsComponent implements OnInit, OnDestroy {
  @ViewChild("templateCardReport, templateCardCross", { static: false })
  template: TemplateRef<any>;

  fileUrl: string;
  fileForm: FormGroup;
  fileFormPayment: FormGroup;
  nameFile: string;
  nameFilePayment: string;
  dateForm: FormGroup;
  dateFormSell: FormGroup;
  showErrorExt: boolean;
  showErrorExtPayment: boolean;
  validFormat: boolean;
  isLoggedIn: any;
  userName: string;
  tmpPath: string;
  EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  private subscription: Subscription = new Subscription();
  maxDate = moment(new Date());
  maxDate2 = new Date();

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
    firstDay: 1 // first day is monday
}



  constructor(
    private file: LinksService,
    private fb: FormBuilder,
    private auth: AuthService,
    private user: UserService,
    private loading: LoaderService,
    private cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private usersService: UserService,
  ) {}

  ngOnInit() {
    this.getFileReport();

    this.usersService.userInfo$
    .subscribe(val => {
      if (!!val) {
       this.email = val.email;
      }
    });

    this.nameFile = "";
    this.nameFilePayment = "";

    this.dateFormSell = this.fb.group(
      {
        dateRange: [null, Validators.required]
      }
    );

    this.fileForm = this.fb.group({
      file: [null]
    });

    this.fileFormPayment = this.fb.group({
      file: [null]
    });

    this.dateForm = this.fb.group(
      {
        dateStart: ["", Validators.required],
        dateEnd: ["", Validators.required]
      },
      {
        validator: [ValidateDate.CompareDates]
      }
    );
  }

  public getFileReport() {
    this.subscription = this.file.getFileReport().subscribe(file => {
      this.fileUrl = file;
    });
  }

  change() {
    this.disButon = false;
  }

  public onFileChangeTrip(event) {
    this.nameFile = event.target.files[0].name;
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let fileBlob = new Blob([file], { type: this.EXCEL_TYPE });
      let file2 = new File([fileBlob], this.nameFile, {
        type: this.EXCEL_TYPE
      });
      reader.readAsDataURL(file2);

      reader.onload = () => {
        this.fileForm.controls.file.patchValue({
          file: reader.result
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
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let fileBlob = new Blob([file], {type: this.EXCEL_TYPE} )
      let file2 = new File(([fileBlob]), this.nameFilePayment, { type: this.EXCEL_TYPE });
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.fileFormPayment.controls.file.patchValue({
          file: reader.result
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

  private getExtension(nameFile: string) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[1];
    this.validFormat = false;
    if (getExt === "xlsx" || getExt === "xls") {
      this.validFormat = true;
    }
  }

  private sendFileTrip() {
    let fileSplit = this.fileForm.controls.file.value.file.split(",");
    let file = fileSplit[1];
    let data = {
      fileBase64: file,
      email: this.userName
    };
    this.loading.show();
    this.subscription = this.file.sendfile(data).subscribe(
      (res: ResponseService) => {
        this.loading.hide();
        if (res.state !== "Error") {
          Swal.fire({
            title: "Carga exitosa",
            text: res.userMessage,
            type: "success",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "upload-success"
          }).then(() => {
            this.nameFile = "";
          });
        } else {
          Swal.fire({
            title: "Error en la Carga",
            text: res.userMessage,
            type: "error",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "upload-error"
          }).then(() => {
            this.nameFile = "";
          });
        }
      },
      error => {
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          text: error.error.userMessage,
          type: "error",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "upload-invalid"
        }).then(() => {
          this.nameFile = "";
        });
      }
    );
  }

  private sendFilePayment() {
    let fileSplit = this.fileFormPayment.controls.file.value.file.split(',');
    let file =  fileSplit[1];
    let data = {
      fileBase64:file,
      business: "seguros",
      email: this.userName
    };

    this.subscription = this.file.updatePaymentDate(data).subscribe(
      (res: ResponseService) => {
        if(res.state !== 'Error') {
          Swal.fire({
            title: "Carga exitosa",
            text: res.userMessage,
            type: "success",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "upload-success"
          }).then(()=> {
            this.nameFilePayment ="";
          });
        } else {
          Swal.fire({
            title: 'Error en la Carga',
            text: res.userMessage,
            type: "error",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "upload-error"
          }).then(()=> {
            this.nameFilePayment ="";
          });
        }
      },
      error => {
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          text: error.error.userMessage,
          type: "error",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "upload-invalid"
        }).then(()=> {
          this.nameFilePayment ="";
        });
      }
    );
  }

  public downloadReferal() {
    let dates = {
      dateStart: this.dateForm.controls.dateStart.value,
      dateEnd: this.dateForm.controls.dateEnd.value
    };
    this.subscription = this.file.downloadReferrals(dates).subscribe((resp: ResponseService) => {
      let file = resp.objectResponse;
      let contentType = "application/vnd.ms-excel";
      const linkSource = `data:${contentType};base64,${file}`;
      const downloadLink = document.createElement("a");
      const fileName = `reporte.xlsx`;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
      this.dateForm.reset();
      this.dateForm.controls.dateStart.setValue("");
      this.dateForm.controls.dateEnd.setValue("");
      setTimeout(() => {
        this.dateForm.controls.dateEnd.setErrors(null);
        this.dateForm.controls.dateStart.setErrors(null);
      });
    });
  }

    /**
   * Abre el mensaje de confirmacion de copiado del link
   * @param message
   * @param action
   */

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  public getReportClickam() {
    this.dateParams = {
      start: this.dateFormSell.controls.dateRange.value.startDate.format(),
      end: this.dateFormSell.controls.dateRange.value.endDate.format()
    }
    
   this.subscription = this.file.getReportClickam(this.dateParams).subscribe((resp: ResponseService) => {
      if(resp.state === 'Success') {
        this.openSnackBar(resp.userMessage + ' a ' + this.email, 'Cerrar');
        this.dateFormSell.reset();
        if (this.dateFormSell.controls.dateRange.value.startDate === null) {
          this.disButon = true;
        }
      }
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
