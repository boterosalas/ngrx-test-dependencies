import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() productName: string;
  @Input() productDescription: string;
  @Input() price: string;
  @Input() image: string;
  @Input() alt: string;

  constructor() { }


  ngOnInit() {
  }

}
