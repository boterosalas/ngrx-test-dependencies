import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-works-refer',
  templateUrl: './works-refer.component.html',
  styleUrls: ['./works-refer.component.scss'],
})
export class WorksReferComponent implements OnInit {
  amount: any;
  amountReferred: any;

  constructor() {}

  ngOnInit() {
    this.amount = localStorage.getItem('Amount');
    this.amountReferred = localStorage.getItem('AmonuntReferred');
  }
}
