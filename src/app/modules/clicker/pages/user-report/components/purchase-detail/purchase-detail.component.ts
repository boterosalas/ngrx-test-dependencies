import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BreakpointService } from '../../../../../../services/breakpoint.service';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';
import { DateFormat } from 'src/app/modules/shared/helpers/date-format';
import { FormControl } from '@angular/forms';
import { formatPurchaseData } from '../../helpers/formatPurchaseDetail';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', minHeight: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  encapsulation: ViewEncapsulation.None
})
export class PurchaseDetailComponent implements OnInit, OnDestroy {
  initDate: FormControl = new FormControl(null);
  endDate: FormControl = new FormControl(null);
  @Input() dataSource = [];
  dataSourceOwn: any;
  hourDate: any = '';
  minHours: any = '';
  datePublication: any = '';
  @Input() totalItems: any = 0;
  pageSize: any = 20;
  pageIndex: any = 0;
  from: number = 1;
  pageTo: number = 20;
  breakpointService$ = new Subscription();
  getReportUser$: Subscription = new Subscription();
  showInfoCard: boolean = false;
  @Input() userId: string;
  search: boolean = true;
  isLoading: boolean = false;

  constructor(
    private breakpointService: BreakpointService,
    private payment: LinksService,
  ) { }

  ngOnInit() {
    this.detectDevice();
  }

  getHistory() {
    console.log('getHistory');
  }

  searchIsValid() {
    if (this.initDate.value && this.endDate.value) {
      if (
        new Date(this.initDate.value) instanceof Date &&
        isFinite(this.initDate.value) &&
        new Date(this.endDate.value) instanceof Date &&
        isFinite(this.endDate.value)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false
    }
  }

  applyFilter(datepicker: any) {
    if (this.initDate.value && this.endDate.value) {
      if (
        !isNaN(new Date(this.initDate.value).getTime()) &&
        !isNaN(new Date(this.endDate.value).getTime())
      ) {
        console.log('Buscando info')
        const initDate = DateFormat.format(this.initDate.value, 'YYYY-MM-DD');
        const endDate = DateFormat.format(this.endDate.value, 'YYYY-MM-DD');
        console.log({ initDate, endDate });
        this.getPayments({ initDate, endDate });
        this.search = false;
      } else {
        console.log('Fechas inválidas')
      }
    } else {
      console.log('Ingresar fechas')
      datepicker.open();
    }
  }

  openDatePicker(datepicker: any) {
    datepicker.open();
    this.search = true;
  };


  getPayments(dates: any = {}) {
    this.isLoading = true;
    const { initDate, endDate } = dates;
    const params: any = {
      from: this.from,
      to: this.pageTo,
      userId: this.userId
    };
    if (initDate) { params.start = initDate }
    if (endDate) { params.end = endDate }
    console.log({ params });
    this.getReportUser$ = this.payment.getRewardsReportById(params).subscribe({
      next: (resp: any) => {
        console.log({ purchaseDetail: resp })
        this.dataSource = formatPurchaseData(resp.objectResponse.generalResumeRewards.cutOffValueRewards);
        this.totalItems = resp.objectResponse.generalResumeRewards.total;
      },
      error: () => {
        this.dataSource = [];
        this.totalItems = 0;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  cleanFilter() {
    this.initDate.reset();
    this.endDate.reset();
    this.search = true;
    this.getPayments();
  }

  columnsStatus = [
    {
      label: 'Desplegar',
      code: 'desplegar',
      className: 'showMore',
      hideInMobile: false,
    },
    {
      label: 'Fecha',
      code: 'commissionGenerationDate',
      className: 'fecha',
      hideInMobile: false,
    },
    {
      label: 'Negocio',
      code: 'business',
      className: 'negocio',
      hideInMobile: true,
    },
    {
      label: 'Producto',
      code: 'productName',
      className: 'producto',
      hideInMobile: true,
    },
    {
      label: 'Cantidad',
      code: 'quantity',
      className: 'cantidad',
      hideInMobile: true,
    },
    {
      label: 'Venta',
      code: 'totalSale',
      className: 'venta',
      hideInMobile: true,
    },
    {
      label: 'Recompensa',
      code: 'commissionValue',
      className: 'recompensa',
      hideInMobile: false,
    },
    {
      label: 'Estado',
      code: 'statusCommission',
      className: 'estado',
      hideInMobile: false,
    },
  ];

  columnsToDisplay: any = this.columnsStatus.map((x) => x.code);

  expandedElement: any | null;

  detectDevice() {
    this.breakpointService$ = this.breakpointService.isWidthLessThanBreakpoint('840').subscribe((data) => {
      this.showInfoCard = data;
    });
  }

  convertString(value: string) {
    return value.toLowerCase().replace(' ', '');
  }

  pagination(paginate: any) {
    console.log({ paginate });
    this.pageIndex = paginate;
    this.from = this.pageSize * this.pageIndex + 1 - 20;
    this.pageTo = this.pageSize * (this.pageIndex + 1) - 20;
    const initDate = this.initDate.value ? DateFormat.format(this.initDate.value, 'YYYY-MM-DD') : '';
    const endDate = this.endDate.value ? DateFormat.format(this.endDate.value, 'YYYY-MM-DD') : '';
    this.getPayments({ initDate, endDate });
  }

  ngOnDestroy(): void {
    this.breakpointService$.unsubscribe();
  }
}

const ELEMENT_DATA: any = [
  {
    commissionGenerationDate: '10/01/2022',
    productName: 'Camisa rosa',
    quantity: 1,
    business: 'Almacenes Éxito',
    totalSale: 132000,
    commissionValue: 13000,
    statusCommission: 'Por validar',
  },
  {
    commissionGenerationDate: '10/01/2022',
    productName: 'Camisa rosa',
    quantity: 1,
    business: 'Almacenes Éxito',
    totalSale: 132000,
    commissionValue: 13000,
    statusCommission: 'Rechazada',
  },
  {
    commissionGenerationDate: '10/01/2022',
    productName: 'Camisa rosa',
    quantity: 1,
    business: 'Almacenes Éxito',
    totalSale: 132000,
    commissionValue: 13000,
    statusCommission: 'Acumulado',
  },
  {
    commissionGenerationDate: '10/01/2022',
    productName: 'Camisa rosa',
    quantity: 1,
    business: 'Almacenes Éxito',
    totalSale: 132000,
    commissionValue: 13000,
    statusCommission: 'Por pagar',
  },
  {
    commissionGenerationDate: '10/01/2022',
    productName: 'Camisa rosa',
    quantity: 1,
    business: 'Almacenes Éxito',
    totalSale: 132000,
    commissionValue: 13000,
    statusCommission: 'Por pagar',
  },
  {
    commissionGenerationDate: '10/01/2022',
    productName: 'Camisa rosa',
    quantity: 1,
    business: 'Almacenes Éxito',
    totalSale: 132000,
    commissionValue: 13000,
    statusCommission: 'Por pagar',
  },
  {
    commissionGenerationDate: '10/01/2022',
    productName: 'Camisa rosa',
    quantity: 1,
    business: 'Almacenes Éxito',
    totalSale: 132000,
    commissionValue: 13000,
    statusCommission: 'Por pagar',
  },
];
