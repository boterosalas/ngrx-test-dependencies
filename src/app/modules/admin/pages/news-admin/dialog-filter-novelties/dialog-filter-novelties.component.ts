import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-dialog-filter-novelties',
  templateUrl: './dialog-filter-novelties.component.html',
  styleUrls: ['./dialog-filter-novelties.component.scss'],
})
export class DialogFilterNoveltiesComponent implements OnInit, OnDestroy {
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
  maxDate = moment(new Date());
  dateParams: any;
  showDate = true;
  filterNovelties: FormGroup;

  status = [
    { name: 'Pendiente', value: 'Pendiente' },
    { name: 'En revisión', value: 'En revisión' },
    { name: 'Solucionado', value: 'Solucionado' },
    { name: 'Rechazado', value: 'Rechazado' },
  ];

  bussiness = [];
  chipsBussiness = [];
  chipsBussinessId = [];

  selectable = true;
  removable = true;
  addOnBlur = true;
  @Output() objectSend = new EventEmitter();
  @Output() close = new EventEmitter();

  constructor(private fb: FormBuilder, private content: ContentService) { }

  ngOnInit() {
    this.filterForm();
    this.getAllBusiness();

    const filterData = localStorage.getItem('formFilterNovelties');
    const bussinesss = localStorage.getItem('bussinessNovelties');

    if (filterData !== null) {
      const obFr = JSON.parse(filterData);
      this.filterNovelties.controls.status.setValue(obFr.status);
      const startDate = obFr.dateRange.startDate === null ? '' : obFr.dateRange.startDate;
      const endDate = obFr.dateRange.endDate === null ? '' : obFr.dateRange.endDate;
      this.filterNovelties.controls.dateRange.setValue({
        startDate: startDate,
        endDate: endDate,
      });
    }

    if (bussinesss !== null) {
      const obbus = JSON.parse(bussinesss);
      this.chipsBussiness = obbus;
    }
  }

  public getAllBusiness() {
    this.subscription = this.content.getAllBusiness().subscribe((resp) => {
      this.bussiness = resp;
    });
  }
  
  public resetStatusNovelties() {
    this.filterNovelties.controls.status.setValue(null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public clearFilters() {
    this.filterNovelties.reset();
    this.chipsBussiness = [];
    this.chipsBussinessId = [];
    localStorage.removeItem('bussinessNovelties');
    localStorage.removeItem('formFilterNovelties');
  }

  public filterForm() {
    this.filterNovelties = this.fb.group({
      dateRange: [''],
      status: [null],
      bussiness: [''],
      chipBussiness: [''],
    });
  }

  remove(bussiness: any): void {
    const index = this.chipsBussiness.indexOf(bussiness);

    if (index >= 0) {
      this.chipsBussiness.splice(index, 1);
    }
  }

  public aplyFilters() {
    this.chipsBussinessId = [];
    this.chipsBussiness.forEach((element) => {
      this.chipsBussinessId.push(element.id);
    });

    const validDateStart =
      this.filterNovelties.controls.dateRange.value.startDate === undefined ||
      this.filterNovelties.controls.dateRange.value.startDate === null ||
      this.filterNovelties.controls.dateRange.value.startDate === '';
    const validDateEnd =
      this.filterNovelties.controls.dateRange.value.endDate === undefined ||
      this.filterNovelties.controls.dateRange.value.endDate === null ||
      this.filterNovelties.controls.dateRange.value.endDate === '';

    const data = {
      dateStart: validDateStart ? '' : this.filterNovelties.controls.dateRange.value.startDate,
      dateEnd: validDateEnd ? '' : this.filterNovelties.controls.dateRange.value.endDate,
      state: this.filterNovelties.controls.status.value,
      business: this.chipsBussinessId,
    };

    this.objectSend.emit(data);

    localStorage.setItem('formFilterNovelties', JSON.stringify(this.filterNovelties.value));
  }

  public closeModal() {
    this.close.emit();
  }

  public onChangeSelected(val) {
    if (this.chipsBussiness.length === 0) {
      this.chipsBussiness.push(val);
      localStorage.setItem('bussinessNovelties', JSON.stringify(val));
    } else {
      if (this.chipsBussiness.includes(val) === false) {
        this.chipsBussiness.push(val);
      }
    }
    localStorage.setItem('bussinessNovelties', JSON.stringify(this.chipsBussiness));
  }
}
