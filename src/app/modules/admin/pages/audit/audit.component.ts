import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { LinksService } from 'src/app/services/links.service';
import { ResponseService } from 'src/app/interfaces/response';
import {
  MatSnackBar
} from "@angular/material";
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private file: LinksService,
    private usersService: UserService,
    private _snackBar: MatSnackBar,
    private utils: UtilsService
  ) { }

  dateForm: FormGroup;
  private subscription: Subscription = new Subscription();
  maxDate = moment(new Date());
  dateParams: any;
  disButon: boolean = false;
  email: string;
  showDate = true;

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

  selecteds = [{
    titulo: "General",
    value: "1"
  },
  {
    titulo: "Datos de usuario",
    value: "2"
  },
  {
    titulo: "Legales",
    value: "3"
  }
]
  ngOnInit() {

    this.dateForm = this.fb.group(
      {
        typeRepor: [null, Validators.required],
        dateRange: [null, Validators.required]
      }
    );
    this.checkRole();
  }
  checkRole() {
    this.utils.checkPermision();
  }
  // Metodo para exportar la auditoria

  public exportAudit() {
    if (this.dateForm.controls.typeRepor.value === "1") {
      this.dateParams = {
        start: this.dateForm.controls.dateRange.value.startDate.format("YYYY-MM-DD"),
        end: this.dateForm.controls.dateRange.value.endDate.format("YYYY-MM-DD")
      }

      this.subscription = this.file.getAuditoria(this.dateParams).subscribe((resp: ResponseService) => {
        if (resp.state === 'Success') {
          this.openSnackBar(resp.userMessage, 'Cerrar');
          this.dateForm.reset();
          if (this.dateForm.controls.dateRange.value.startDate === null) {
            this.disButon = true;
          }
        }
      });
    } 

    if (this.dateForm.controls.typeRepor.value === "2") {
    
      this.dateParams = {
        start: this.dateForm.controls.dateRange.value.startDate.format("YYYY-MM-DD"),
        end: this.dateForm.controls.dateRange.value.endDate.format("YYYY-MM-DD")
      }
      this.subscription = this.file.getAuditoriaDatosUser(this.dateParams).subscribe((resp: ResponseService) => {
        if (resp.state === 'Success') {
          this.openSnackBar(resp.userMessage, 'Cerrar');
          this.dateForm.reset();
          if (this.dateForm.controls.dateRange.value.startDate === null) {
            this.disButon = true;
          }
        }
      });
    }

    if (this.dateForm.controls.typeRepor.value === "3") {
      this.subscription = this.file.getReportTerms().subscribe((resp: ResponseService) => {
        if (resp.state === 'Success') {
          this.openSnackBar(resp.userMessage, 'Cerrar');
        }
      });
    }

  }

  change() {
    if(this.dateForm.controls.typeRepor.value === "3") {
      this.dateForm.get('dateRange').setValue(null)
      this.disButon = false;
      this.showDate = false;
    } else {
      this.disButon = false;
      this.showDate = true;
      this.dateForm.setValidators(Validators.required);
    }
  }

  enabled(){
    this.disButon = false;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
