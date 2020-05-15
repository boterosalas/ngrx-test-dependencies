import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LinksService } from 'src/app/services/links.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { ResponseService } from 'src/app/interfaces/response';

@Component({
  selector: 'app-refers',
  templateUrl: './refers.component.html',
  styleUrls: ['./refers.component.scss']
})
export class RefersComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private file: LinksService,
    private usersService: UserService,
    private _snackBar: MatSnackBar,
  ) { }

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

  dateRange: any;
  private subscription: Subscription = new Subscription();
  maxDate = moment(new Date());
  dateForm: FormGroup;
  email: string;
  disButon: boolean;

  ngOnInit() {

    this.dateForm = this.fb.group(
      {
        dateRange: [null, Validators.required]
      }
    );

  }

  public changeState() {
    this.disButon = false;
  }


  // Metodo para exportar los usuarios referidos

  public exportRefers() {
    this.dateRange = {
      start: this.dateForm.controls.dateRange.value.startDate.format(),
      end: this.dateForm.controls.dateRange.value.endDate.format()
    }
    
  //  this.subscription = this.file.getAudit(this.dateParams).subscribe((resp: ResponseService) => {
  //     if(resp.state === 'Success') {
  //       this.openSnackBar(resp.userMessage, 'Cerrar');
  //       this.dateForm.reset();
  //       if (this.dateForm.controls.dateRange.value.startDate === null) {
  //         this.disButon = true;
  //       }
  //     }
  //   });
  }

    /**
   * Abre el mensaje de confirmacion
   * @param message
   * @param action
   */

  // private openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, action, {
  //     duration: 5000
  //   });
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
