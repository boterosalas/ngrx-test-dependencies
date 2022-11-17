import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-bussiness',
  templateUrl: './product-bussiness.component.html',
  styleUrls: ['./product-bussiness.component.scss'],
})
export class ProductBussinessComponent {
  @Input() textoboton: string;
  @Input() gtm: string;
  @Input() clickear: boolean;
  @Input() nombreProducto: string;
  @Input() precio: number;
  @Input() porcentaje: string;
  @Input() descuento: number;
  @Input() imagen: string;
  @Input() pluexito: string;
  @Output() infoProduct = new EventEmitter();

  public product(clickFrom: string) {
    this.infoProduct.emit(clickFrom);
  }

}
