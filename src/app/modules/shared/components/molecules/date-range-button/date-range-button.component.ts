import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
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

  ranges = {
    Hoy: [moment(), moment()],
    Ayer: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Los últimos 7 días': [moment().subtract(6, 'days'), moment()],
    'Los últimos 15 días': [moment().subtract(14, 'days'), moment()],
    'Los últimos 30 días': [moment().subtract(29, 'days'), moment()],
    'Este Mes': [moment().startOf('month'), moment().endOf('month')],
    'El mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Últimos 3 meses': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  };
  
  empty = {};

  maxDate = moment(new Date());
  dateRangeForm: UntypedFormGroup;
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

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.dateRangeForm = this.fb.group({
      dateRange: ['', Validators.required],
      compareRange: [{ value: '', disabled: this.selectDate }],
    });
  }

  public getDate(e) {
    if (e.startDate && e.endDate) {
      const dates = {
        startDate: moment(e.startDate._d).format('YYYY-MM-DD'),
        endDate: moment(e.endDate._d).format('YYYY-MM-DD'),
      };
      this.dates.emit(dates);
      this.clearButton = false;
      const getCompare = this.dateRangeForm.get('compareRange');
      this.selectDate.emit(getCompare.enable());
    }
  }

  public getCompareDate(e) {
    if (e.startDate && e.endDate) {
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
    const getCompare = this.dateRangeForm.get('compareRange');
    this.selectDate.emit(getCompare.disable());
  }

}
