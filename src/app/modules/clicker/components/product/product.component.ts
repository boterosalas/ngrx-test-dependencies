import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Output() infoProduct = new EventEmitter();

  @Input() productName: string;
  @Input() productDescription: string;
  @Input() price: number;
  @Input() discount: string;
  @Input() image: string;
  @Input() plu: string;
  @Input() alt: string;
  @Input() textbutton: string;
  @Input() id: string;
  @Input() btnid: string;
  @Input() exito: boolean;
  @Input() other: boolean;
  @Input() container: boolean;

  constructor() { }


  ngOnInit() {
  }

  public product() {
    this.infoProduct.emit();
  }

}
