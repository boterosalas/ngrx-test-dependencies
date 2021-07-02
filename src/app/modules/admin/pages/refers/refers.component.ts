import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LinksService } from 'src/app/services/links.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { ResponseService } from 'src/app/interfaces/response';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-refers',
  templateUrl: './refers.component.html',
  styleUrls: ['./refers.component.scss']
})
export class RefersComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private file: LinksService,
    private _snackBar: MatSnackBar,
    public utils: UtilsService

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


  private subscription: Subscription = new Subscription();
  
  comissionForm: FormGroup;
  referedForm: FormGroup;
  email: string;
  disButon: boolean;
  amount: number;
  amountMin: number;
  numberPattern = "^(0|[0-9][0-9]*)$";

  ngOnInit() {
    this.comissionClickerForm();
    this.referedClickerForm();
    this.getAmountClicker();
    this.checkRole();
  }

  checkRole() {
    this.utils.checkPermision();
  }

  public comissionClickerForm() {
    this.comissionForm = this.fb.group(
      {
        amount: [this.amount, [
          Validators.required,
          Validators.pattern(this.numberPattern)
        ]]
      }
    );
  }

  public referedClickerForm() {
    this.referedForm = this.fb.group(
      {
        refered: [this.amountMin, [
          Validators.required,
          Validators.pattern(this.numberPattern)
        ]]
      }
    );
  }

  public changeState() {
    this.disButon = false;
  }

  public getAmountClicker() {
    this.subscription = this.file.getAmount().subscribe(amount => {
      this.amount = amount.amountsCommission;
      this.amountMin = amount.amountsReferred;
      this.comissionForm.controls.amount.setValue(this.amount);
      this.referedForm.controls.refered.setValue(this.amountMin);
    })
  }

  /**
 * Abre el mensaje de confirmacion
 * @param message
 * @param action
 */

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  public saveCommission() {
    let commission = {
      amount: this.comissionForm.controls.amount.value
    }
    this.subscription = this.file.saveAmountCommission(commission).subscribe((save: ResponseService) => {
      if (save.state === 'Success') {
        this.openSnackBar(save.userMessage, 'Cerrar');
        this.getAmountClicker();
      } else {
        this.openSnackBar(save.userMessage, 'Cerrar');
      }
    })
  }

  public saveRefered() {
    let commission = {
      amount: this.referedForm.controls.refered.value
    }
    this.subscription = this.file.saveAmountReferred(commission).subscribe((resp: ResponseService) => {
      if (resp.state === 'Success') {
        this.openSnackBar(resp.userMessage, 'Cerrar');
        this.getAmountClicker();
      } else {
        this.openSnackBar(resp.userMessage, 'Cerrar');
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
