import { AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit, OnDestroy {

  @Input() data: any;
  dateFormHoja: FormGroup;
  dataSourceBusi = [];
  nextPayment: any;
  afterPayment: any;
  displayedColumns: string[] = ['negocio', 'linksgenerator', 'linksclicker', 'commision', 'sells'];
  dateLastPayment: any;
  placeholder: string;
  private subscription: Subscription = new Subscription();
  userId: string;
  actualDate = moment(new Date());
  dataFilter = {};

  maxDate = moment(new Date());
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
    private fb: FormBuilder,
    private user: UserService
  ) { }


  ngOnInit(): void {

    this.dateFormHoja = this.fb.group({
      dateRange: [{ startDate: this.actualDate, endDate: this.actualDate }],
    });

    setTimeout(() => {
      this.getDatas();
    }, 1000);

  }


  public getDatas() {
    const data = {
      start: this.dateFormHoja.controls.dateRange.value.startDate.format('YYYY-MM-DD'),
      end: this.dateFormHoja.controls.dateRange.value.endDate.format('YYYY-MM-DD'),
      userId: this.data
    };

    this.getDatasHoja(data);
  }


  getDatasHoja(data: any) {
    this.subscription = this.user.getHojaVida(data).subscribe((resp: any) => {
      this.dataSourceBusi = resp.objectResponse;
      this.nextPayment = resp.objectResponse[0].proximopago;
      this.afterPayment = resp.objectResponse[0].ultimovalorpagado;
      this.dateLastPayment = resp.objectResponse[0].ultimafechapago;
      this.dataSourceBusi.push({
        negocio: 'TOTAL',
        icondashboard: '',
        linksgenerados: resp.objectResponse[0].totallinkgenerados,
        linkclickeados: resp.objectResponse[0].totallinkclickeados,
        comisiones: resp.objectResponse[0].totalcomisiones,
        ventas: resp.objectResponse[0].totalventas,
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
