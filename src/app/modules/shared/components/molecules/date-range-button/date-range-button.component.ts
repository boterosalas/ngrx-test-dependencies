import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-date-range-button',
  templateUrl: './date-range-button.component.html',
  styleUrls: ['./date-range-button.component.scss'],
})
export class DateRangeButtonComponent implements OnInit {
  @Output() dates = new EventEmitter();
  @Output() compareDates = new EventEmitter();
  @Output() reset = new EventEmitter();
  @Output() called = new EventEmitter();
  @Input() direction = 'row';
  @Input() classLayout: string;
  @Input() compare = false;
  @Input() range: boolean = true;
  @Input() clear: boolean = false;
  @Input() custom: boolean = false;
  @Output() selectDate = new EventEmitter(true);

  clearButton = true;

  ranges: any = {
    Hoy: [moment(), moment()],
    Ayer: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Este mes': [moment().startOf('month'), moment().endOf('month')],
    'El mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  };

  empty = {};

  maxDate = moment(new Date());
  dateRangeForm: FormGroup;
  placeholder = 'Seleccione las fechas';
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dateRangeForm = this.fb.group({
      dateRange: ['', Validators.required],
      compareRange: [{ value: '', disabled: this.selectDate }],
    });
  }

  public getDate(e) {
    if (e.endDate !== null && e.startDate) {
      const dates = {
        startDate: moment(e.startDate._d).format('YYYY-MM-DD'),
        endDate: moment(e.endDate._d).format('YYYY-MM-DD'),
      };
      this.dates.emit(dates);
      this.clearButton = false;
      //NOSONAR
      this.selectDate.emit(this.dateRangeForm.controls.compareRange.enable());
    }
  }

  public getCompareDate(e) {
    if (e.endDate !== null && e.startDate) {
      const dates = {
        startDate: moment(e.startDate._d).format('YYYY-MM-DD'),
        endDate: moment(e.endDate._d).format('YYYY-MM-DD'),
      };
      this.compareDates.emit(dates);
    }
  }

  public call() {
    this.called.emit();
  }

  public clearAction(){
    this.dateRangeForm.controls.dateRange.setValue(null);
    this.dateRangeForm.controls.compareRange.setValue(null);
    this.dateRangeForm.controls.dateRange.addValidators(Validators.required);
    this.reset.emit();
    this.clearButton = true;
    //NOSONAR
    this.selectDate.emit(this.dateRangeForm.controls.compareRange.disable());
  }

}
