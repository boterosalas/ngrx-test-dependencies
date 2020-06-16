import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {

  constructor() { }

  amount: any;
  amountReferred:any;

  ngOnInit() {
    
    this.amount = localStorage.getItem('Amount');
    this.amountReferred = localStorage.getItem('AmonuntReferred');

    setTimeout(() => {
      document.querySelector('.mat-tab-label[aria-posinset="1"]').classList.add("gtmTerminosCondicionesClicTerminosLegales");
      document.querySelector('.mat-tab-label[aria-posinset="2"]').classList.add("gtmTerminosCondicionesClicEmprendedor");
      document.querySelector('.mat-tab-label[aria-posinset="3"]').classList.add("gtmTerminosCondicionesClicProteccionDatos");
    }, 1000);
  
  }

}
