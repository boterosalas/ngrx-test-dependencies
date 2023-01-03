import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BreakpointService } from '../../../../../../services/breakpoint.service';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';
import { DateFormat } from 'src/app/modules/shared/helpers/date-format';

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
})
export class PurchaseDetailComponent implements OnInit, OnDestroy {
  @Input() dataSource = ELEMENT_DATA;
  dataSourceOwn: any;
  hourDate: any = '';
  minHours: any = '';
  datePublication: any = '';
  @Input() totalItems: any = 41;
  @Input() pageSize: any = 20;
  @Input() pageIndex: any = 0;
  from: any;
  pageTo: any;
  breakpointService$ = new Subscription();
  getPayment$: Subscription = new Subscription();
  showInfoCard: boolean = false;
  @Input() userId: string;

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

  hourChange(horu) {
    const data = new Date();
    const dataH = DateFormat.format(data, 'YYYY-MM-DD');
    const dataOp = DateFormat.format(horu.value, 'YYYY-MM-DD');
    if (dataH === dataOp) {
      this.hourDate = '';
      this.minHours = DateFormat.timeFormat(data);
    } else {
      this.hourDate = '';
      this.minHours = '12:00 AM';
    }
  }

  getPayments(from = 1, to = this.pageTo) {
    const params = { from, to };
    this.getPayment$ = this.payment.getPayment(this.userId, params).subscribe((payment: any) => {
      console.log({ payment })
    });
  }

  columnsStatus = [
    {
      label: 'Fecha',
      className: 'fecha',
      hideInMobile: false,
    },
    {
      label: 'Negocio',
      className: 'negocio',
      hideInMobile: true,
    },
    {
      label: 'Producto',
      className: 'producto',
      hideInMobile: true,
    },
    {
      label: 'Cantidad',
      className: 'cantidad',
      hideInMobile: true,
    },
    {
      label: 'Venta',
      className: 'venta',
      hideInMobile: true,
    },
    {
      label: 'Recompensa',
      className: 'recompensa',
      hideInMobile: false,
    },
    {
      label: 'Estado',
      className: 'estado',
      hideInMobile: false,
    },
  ];

  columnsToDisplay: any = this.columnsStatus.map((x) => x.className);

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
    this.pageIndex = paginate;
    this.from = this.pageSize * this.pageIndex + 1 - 20;
    this.pageTo = this.pageSize * (this.pageIndex + 1) - 20;
    this.getPayments(this.from, this.pageTo);
  }

  ngOnDestroy(): void {
    this.breakpointService$.unsubscribe();
  }
}

const ELEMENT_DATA: any = [
  {
    fecha: '10/01/2022',
    producto: 'Camisa rosa',
    cantidad: 1,
    negocio: 'Almacenes Éxito',
    venta: 132000,
    recompensa: 13000,
    estado: 'Por validar',
  },
  {
    fecha: '10/01/2022',
    producto: 'Camisa rosa',
    cantidad: 1,
    negocio: 'Almacenes Éxito',
    venta: 132000,
    recompensa: 13000,
    estado: 'Rechazada',
  },
  {
    fecha: '10/01/2022',
    producto: 'Camisa rosa',
    cantidad: 1,
    negocio: 'Almacenes Éxito',
    venta: 132000,
    recompensa: 13000,
    estado: 'Acumulado',
  },
  {
    fecha: '10/01/2022',
    producto: 'Camisa rosa',
    cantidad: 1,
    negocio: 'Almacenes Éxito',
    venta: 132000,
    recompensa: 13000,
    estado: 'Por pagar',
  },
  {
    fecha: '10/01/2022',
    producto: 'Camisa rosa',
    cantidad: 1,
    negocio: 'Almacenes Éxito',
    venta: 132000,
    recompensa: 13000,
    estado: 'Por pagar',
  },
  {
    fecha: '10/01/2022',
    producto: 'Camisa rosa',
    cantidad: 1,
    negocio: 'Almacenes Éxito',
    venta: 132000,
    recompensa: 13000,
    estado: 'Por pagar',
  },
  {
    fecha: '10/01/2022',
    producto: 'Camisa rosa',
    cantidad: 1,
    negocio: 'Almacenes Éxito',
    venta: 132000,
    recompensa: 13000,
    estado: 'Por pagar',
  },
];
