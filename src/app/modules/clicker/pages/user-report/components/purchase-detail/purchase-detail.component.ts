import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BreakpointService } from '../../../../../../services/breakpoint.service';
import { Subscription } from 'rxjs';

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
  breakpointService$ = new Subscription();
  showInfoCard: boolean = false;

  constructor(private breakpointService: BreakpointService) {}

  ngOnInit() {
    this.detectDevice();
  }

  dataSource = ELEMENT_DATA;

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
      label: 'Valor de venta',
      className: 'valordeventa',
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
    valordeventa: 132000,
    recompensa: 13000,
    estado: 'Por validar',
  },
  {
    fecha: '10/01/2022',
    producto: 'Camisa rosa',
    cantidad: 1,
    negocio: 'Almacenes Éxito',
    valordeventa: 132000,
    recompensa: 13000,
    estado: 'Rechazada',
  },
  {
    fecha: '10/01/2022',
    producto: 'Camisa rosa',
    cantidad: 1,
    negocio: 'Almacenes Éxito',
    valordeventa: 132000,
    recompensa: 13000,
    estado: 'Acumulado',
  },
  {
    fecha: '10/01/2022',
    producto: 'Camisa rosa',
    cantidad: 1,
    negocio: 'Almacenes Éxito',
    valordeventa: 132000,
    recompensa: 13000,
    estado: 'Por pagar',
  },
  {
    fecha: '10/01/2022',
    producto: 'Camisa rosa',
    cantidad: 1,
    negocio: 'Almacenes Éxito',
    valordeventa: 132000,
    recompensa: 13000,
    estado: 'Por pagar',
  },
  {
    fecha: '10/01/2022',
    producto: 'Camisa rosa',
    cantidad: 1,
    negocio: 'Almacenes Éxito',
    valordeventa: 132000,
    recompensa: 13000,
    estado: 'Por pagar',
  },
  {
    fecha: '10/01/2022',
    producto: 'Camisa rosa',
    cantidad: 1,
    negocio: 'Almacenes Éxito',
    valordeventa: 132000,
    recompensa: 13000,
    estado: 'Por pagar',
  },
];
