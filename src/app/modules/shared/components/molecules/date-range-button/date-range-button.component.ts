import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-date-range-button',
  templateUrl: './date-range-button.component.html',
  styleUrls: ['./date-range-button.component.scss']
})
export class DateRangeButtonComponent implements OnInit {

  @Output() dates = new EventEmitter();
  @Output() called = new EventEmitter();
  @Input() direction = 'row';
  @Input() classLayout:string;

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

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.dateRangeForm = this.fb.group({
      dateRange: ['', Validators.required],
    });
  }

  public getDate(e) {
    if(e.endDate !== null && e.startDate) {
      const dates = {
        startDate: moment(e.startDate._d).format('YYYY-MM-DD'),
        endDate: moment(e.endDate._d).format('YYYY-MM-DD')
      };
      this.dates.emit(dates);
    }
  }

  public call() {
    this.called.emit();
  }


}
