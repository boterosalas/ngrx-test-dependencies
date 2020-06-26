import { Component, OnInit, OnDestroy } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private kpi: LinksService, private formBuilder: FormBuilder) { }

  totalUsers: string;
  totalActiveUsers: string;
  totalMonthRegisterUsers:string;
  todayRegisterUsers:string;
  totalMonthRegisterActive:string;
  todayActiveUsers:string;
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
  monthActiveUsersQuantity:string;
  dateParams: any;

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

  resume = [
    {
      icon: 'assets/img/dashboard/resumen/icon-total-registros.svg',
      number: '5.670',
      title: 'Total registros'
    },
    {
      icon: 'assets/img/dashboard/resumen/icon-total-activos.svg',
      number: '3.670',
      title: 'Total activos'
    },
    {
      icon: 'assets/img/dashboard/resumen/icon-total-ventas.svg',
      number: '3.670',
      title: 'Total ventas'
    },
    {
      icon: 'assets/img/dashboard/resumen/icon-total-comisiones.svg',
      number: '8.908',
      title: 'Total comisiones'
    },
    {
      icon: 'assets/img/dashboard/resumen/icon-links-generados.svg',
      number: '3.506',
      title: 'Total links generados'
    },
    {
      icon: 'assets/img/dashboard/resumen/icon-links-clickeados.svg',
      number: '2.506',
      title: 'Total links clickeados por cliente final'
    }
  ];

  items = [
    {
      icon: 'assets/img/dashboard/icon-registros.svg',
      title: 'Registros',
      number: '57',
      subtitle: 'Usuarios registrados'
    },
    {
      icon: 'assets/img/dashboard/icon-activos.svg',
      title: 'Activos',
      number: '985',
      subtitle: 'Usuarios Activos'
    },
    {
      icon: 'assets/img/dashboard/icon-ventas.svg',
      title: 'Ventas',
      number: '12',
      subtitle: 'Ventas'
    },
    {
      icon: 'assets/img/dashboard/icon-comisiones.svg',
      title: 'Comisiones',
      number: '18',
      subtitle: 'Comisiones'
    },
    {
      icon: 'assets/img/dashboard/icon-links-generados.svg',
      title: 'Links generados',
      number: '350',
      subtitle: 'Links generados'
    },
    {
      icon: 'assets/img/dashboard/icon-links-clickeados.svg',
      title: 'Links clickeados',
      number: '350',
      subtitle: 'Links clickeados'
    },
  ]

  dataSource = [
    {icon: 'assets/img/dashboard/exito.png', bussiness: 'Almacenes Éxito', linksGenerated:'120', linksClicked:'50', commission:'10000000', total:'50000000'},
    {icon: 'assets/img/dashboard/carulla.png', bussiness: 'Almacenes Carulla', linksGenerated:'120', linksClicked:'50', commission:'10000000', total:'50000000'},
  ];

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.getKPI();
  }

  public getKPI(){
    this.subscription = this.kpi.getKPI().subscribe(resp=> {
      this.totalUsers = resp.historicalUsersQuantity;
      this.totalActiveUsers = resp.historicalActiveUsersQuantity;
      this.totalMonthRegisterUsers = resp.monthUsersQuantity;
      this.todayRegisterUsers = resp.todayUsersQuantity;
      this.totalMonthRegisterActive = resp.historicalActiveUsersQuantity;
      this.todayActiveUsers = resp.yesterdayActiveUsersQuantity;
      this.salesMonth = resp.monthSales;
      this.salesMonthYesterday = resp.yesterdaySales;
      this.salesMonthTotalYesterday = resp.historicalSales;
      this.commissionMonth = resp.monthCommissionValue;
      this.commissionMonthYesterday = resp.yesterdayCommissionValue;
      this.commissionMonthTotalYesterday = resp.historicalCommissionValue;
      this.linksMonth = resp.monthGeneratedLinks;
      this.linksMonthYesterday = resp.todayGeneratedLinks;
      this.linksMonthTotalYesterday = resp.historicalGeneratedLinks;
      this.percent = (resp.historicalActiveUsersQuantity /resp.historicalUsersQuantity) * 100;
      this.monthActiveUsersQuantity = resp.monthActiveUsersQuantity;
    })
  }

  public change() {
    this.dateParams = {
      start: this.form.controls.selected.value.startDate.format(),
      end: this.form.controls.selected.value.endDate.format()
    }
    console.log(this.dateParams)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
