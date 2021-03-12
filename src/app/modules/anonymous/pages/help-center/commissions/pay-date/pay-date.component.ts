import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-date',
  templateUrl: './pay-date.component.html',
  styleUrls: ['./pay-date.component.scss']
})
export class PayDateComponent implements OnInit {

  constructor() { }
  month: number;
  ngOnInit() {
    let meses = new Date();
    this.month = meses.getMonth() + 1;
    console.log(this.month)
  }

}
