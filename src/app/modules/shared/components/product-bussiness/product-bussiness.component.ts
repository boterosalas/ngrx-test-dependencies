import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-bussiness',
  templateUrl: './product-bussiness.component.html',
  styleUrls: ['./product-bussiness.component.scss'],
})
export class ProductBussinessComponent implements OnInit {
  @Input() altimagen: string;
  @Input() textoboton: string;
  @Input() idne: string;
  @Input() butonid: string;
  @Input() exito: boolean;
  @Input() otro: boolean;
  @Input() categoria: boolean;
  @Input() container: boolean;
  @Input() phygital: boolean;
  @Input() foto: string;
  @Input() Class: string;
  @Input() nombreProducto: string;
  @Input() precio: number;
  @Input() porcentaje: string;
  @Input() descuento: number;
  @Input() alianza: any;
  @Input() svglogo: any;
  @Input() imagen: string;
  @Input() pluexito: string;
  @Output() infoProduct = new EventEmitter();
  @Output() infoPhygital = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  public product() {
    this.infoProduct.emit();
  }

  public phygitalModal() {
    this.infoPhygital.emit();
  }

}
