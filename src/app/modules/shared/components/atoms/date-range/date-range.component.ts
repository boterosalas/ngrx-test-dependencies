import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent implements OnInit {
  maxDate = moment(new Date());

  @Output() dates = new EventEmitter();
  @Input() direction = 'row';
  @Input() drop = 'down';
  @Input() open = 'center';
  @Input() title = 'RANGO DE FECHAS';

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

  placeholder = 'Seleccione las fechas';
  dateRangeForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dateRangeForm = this.fb.group({
      dateRange: [],
    });
  }

  public getDate(e) {
    if (e.startDate && e.endDate !== null) {
      const dates = {
        endDate: moment(e.endDate._d).format('YYYY-MM-DD'),
        startDate: moment(e.startDate._d).format('YYYY-MM-DD'),
      };
      this.dates.emit(dates);
    }
  }
}
