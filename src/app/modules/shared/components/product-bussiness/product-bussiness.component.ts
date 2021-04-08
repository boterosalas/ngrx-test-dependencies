import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-bussiness',
  templateUrl: './product-bussiness.component.html',
  styleUrls: ['./product-bussiness.component.scss']
})
export class ProductBussinessComponent implements OnInit {

  @Output() infoProduct = new EventEmitter();

  @Input() productName: string;
  @Input() categoryName: string;
  @Input() productDescription: string;
  @Input() price: number;
  @Input() percent: string;
  @Input() discount: number;
  @Input() aliance: any;
  @Input() logo: any;
  @Input() image: string;
  @Input() plu: string;
  @Input() alt: string;
  @Input() textbutton: string;
  @Input() id: string;
  @Input() btnid: string;
  @Input() exito: boolean;
  @Input() other: boolean;
  @Input() category: boolean;
  @Input() container: boolean;
  @Input() photo: string;
  @Input() Class: string;

  constructor() { }


  ngOnInit() {
  }

  public product() {
    this.infoProduct.emit();
  }

}
