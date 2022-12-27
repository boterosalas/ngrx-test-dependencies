import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss'],
})
export class PurchaseDetailComponent implements OnInit {
  constructor() {}

  @Input() dataSource: any;

  displayedColumns: string[] = ['fecha', 'producto', 'cantidad', 'negocio', 'valordeVenta', 'recompensa', 'estado'];

  ngOnInit() {}

  validateStatus(status: string) {
    const STATUS_COLOR = {
      porvalidar: '#F4B062',
      acumulado: '#5DB458',
      rechazada: '#F25C5C',
      porpagar: '#F27E5B',
    };
    const statusValue = this.convertString(status);
    return STATUS_COLOR[statusValue];
  }

  convertString(value: string) {
    return value.toLowerCase().replace(' ', '');
  }
}
