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
  @Input() price: string;
  @Input() image: string;
  @Input() alt: string;
  @Input() textbutton: string;


  constructor() { }


  ngOnInit() {
  }

  public product() {
    this.infoProduct.emit();
  }

}
