import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LinksService } from 'src/app/services/links.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { ResponseService } from 'src/app/interfaces/response';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-refers',
  templateUrl: './refers.component.html',
  styleUrls: ['./refers.component.scss'],
})
export class RefersComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder, private file: LinksService, private _snackBar: MatSnackBar, public utils: UtilsService) {}

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

  private subscription: Subscription = new Subscription();

  comissionForm: FormGroup;
  referedForm: FormGroup;
  clickerForm: FormGroup;

  email: string;
  disButon: boolean;
  amount: number;
  amountMin: number;
  amountNewClicker: number;

  numberPattern = '^(0|[0-9][0-9]*)$';

  ngOnInit() {
    this.comissionClickerForm();
    this.referedClickerForm();
    this.newClickerForm();
    this.getAmountClicker();
    this.checkRole();
  }

  checkRole() {
    this.utils.checkPermision();
  }

  public comissionClickerForm() {
    this.comissionForm = this.fb.group({
      amount: [this.amount, [Validators.required, Validators.pattern(this.numberPattern)]],
    });
  }

  public referedClickerForm() {
    this.referedForm = this.fb.group({
      refered: [this.amountMin, [Validators.required, Validators.pattern(this.numberPattern)]],
    });
  }

  public newClickerForm() {
    this.clickerForm = this.fb.group({
      newClicker: [this.amountNewClicker, [Validators.required, Validators.pattern(this.numberPattern)]],
    });
  }

  public changeState() {
    this.disButon = false;
  }

  public getAmountClicker() {
    this.subscription = this.file.getAmount().subscribe((amount: any) => {
      this.amount = amount.amountsCommission;
      this.amountMin = amount.amountsReferred;
      this.amountNewClicker = amount.amountsCommissionNewClicker;

      this.comissionForm.controls.amount.setValue(this.amount);
      this.referedForm.controls.refered.setValue(this.amountMin);
      this.clickerForm.controls.newClicker.setValue(this.amountNewClicker);
    });
  }

  /**
   * Abre el mensaje de confirmacion
   * @param message mensaje
   * @param action accion
   */

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  public saveCommission(key: string) {
    let commission = { amount: null, code: null };
    switch (key) {
      case 'amounts-commission':
        commission = { amount: this.comissionForm.controls.amount.value, code: key };
        break;

      case 'amounts-referred':
        commission = { amount: this.referedForm.controls.refered.value, code: key };
        break;
      case 'amounts-newclicker':
        commission = { amount: this.clickerForm.controls.newClicker.value, code: key };
        break;

      default:
        break;
    }
    this.subscription = this.file.saveAmountCommission(commission).subscribe((save: ResponseService) => {
      if (save.state === 'Success') {
        this.openSnackBar(save.userMessage, 'Cerrar');
        this.getAmountClicker();
      } else {
        this.openSnackBar(save.userMessage, 'Cerrar');
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
