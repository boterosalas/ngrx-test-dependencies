import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { LinksService } from 'src/app/services/links.service';
import { ResponseService } from 'src/app/interfaces/response';
import {
  MatSnackBar} from "@angular/material";

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
  ) { }

  dateForm: FormGroup;
  private subscription: Subscription = new Subscription();
  maxDate = moment(new Date());
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


  ngOnInit() {
    this.subscription = this.usersService.userInfo$
    .subscribe(val => {
      if (!!val) {
       this.email = val.email;
      }
    });

    this.dateForm = this.fb.group(
      {
        dateRange: [null, Validators.required]
      }
    );

  }

  // Metodo para exportar la auditoria

  public exportAudit() {
    this.dateParams = {
      // email: this.email,
      start: this.dateForm.controls.dateRange.value.startDate.format(),
      end: this.dateForm.controls.dateRange.value.endDate.format()
    }
    
   this.subscription = this.file.getAudit(this.dateParams).subscribe((resp: ResponseService) => {
      if(resp.state === 'Success') {
        this.openSnackBar(resp.userMessage + ' a ' + this.email, 'Cerrar');
        this.dateForm.reset();
        if (this.dateForm.controls.dateRange.value.startDate === null) {
          this.disButon = true;
        }
      }
    });
  }

  change() {
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
