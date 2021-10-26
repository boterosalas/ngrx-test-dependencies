import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {

  @Output() dates = new EventEmitter();

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
      dateRange: [],
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

}
