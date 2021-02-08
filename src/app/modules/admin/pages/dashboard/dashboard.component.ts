import { Component, OnInit, OnDestroy } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private kpi: LinksService, private formBuilder: FormBuilder) { }

  totalUsers: string;
  totalActiveUsers: string;
  totalMonthRegisterUsers: string;
  todayRegisterUsers: string;
  totalMonthRegisterActive: string;
  todayActiveUsers: string;
  salesMonth: string;
  salesMonthYesterday: string;
  salesMonthTotalYesterday: string;
  commissionMonth: string;
  commissionMonthYesterday: string;
  commissionMonthTotalYesterday: string;
  linksMonth: string;
  linksMonthYesterday: string;
  linksMonthTotalYesterday: string;
  percent: any;
  links = true;
  monthActiveUsersQuantity: string;
  dateParams: any;
  dataSource: any;
  resume = [];
  items = [];


  maxDate = moment(new Date());
  inlineDateTime;

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
  };

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

  form = this.formBuilder.group({
    selected: {
      startDate: moment(new Date(), "DD/MM/YYYY"),
      endDate: moment(new Date(), "DD/MM/YYYY"),
    },
    alwaysShowCalendars: true,
    keepCalendarOpeningWithRange: true,
    showRangeLabelOnInput: true,
  });

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.getKPI();
  }

  public getKPI() {
    let date = {
      start: this.form.controls.selected.value.startDate.format(),
      end: this.form.controls.selected.value.endDate.format()
    }

    //this.subscription = this.kpi.getKPI(date).subscribe(resp => {
    //  this.resume = resp.resume;
    //  this.items = resp.kpi;
    //  this.dataSource = new MatTableDataSource<any>(resp.listbusiness);
    //})
    this.subscription = this.kpi.getResume().subscribe(resp => {
      this.resume = resp;
    })
    this.subscription = this.kpi.getTotalKPI(date).subscribe(resp => {
      this.items = resp;
      console.log(this.items);
    })
    this.subscription = this.kpi.getBussinessKPI(date).subscribe(resp => {
      this.dataSource = new MatTableDataSource<any>(resp);
    })

  }

  public change() {
    this.dateParams = {
      start: this.form.controls.selected.value.startDate.format(),
      end: this.form.controls.selected.value.endDate.format()
    }
    //this.subscription = this.kpi.getKPI(this.dateParams).subscribe(dashboard => {
    //  this.resume = dashboard.resume;
    //  this.items = dashboard.kpi;
    //  this.dataSource = new MatTableDataSource<any>(dashboard.listbusiness);
    //})
    this.subscription = this.kpi.getResume().subscribe(resp => {
      this.resume = resp;
    })
    this.subscription = this.kpi.getTotalKPI(this.dateParams).subscribe(resp => {
      this.items = resp;
    })
    this.subscription = this.kpi.getBussinessKPI(this.dateParams).subscribe(resp => {
      this.dataSource = new MatTableDataSource<any>(resp);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
