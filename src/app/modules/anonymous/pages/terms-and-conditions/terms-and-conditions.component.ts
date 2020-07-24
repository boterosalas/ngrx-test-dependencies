import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {

  constructor(
    private link: LinksService
  ) { }

  amount: any;
  amountReferred:any;
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    
    this.amount = localStorage.getItem('Amount');
    this.amountReferred = localStorage.getItem('AmonuntReferred');
    this.getAmount();

    setTimeout(() => {
      document.querySelector('.mat-tab-label[aria-posinset="1"]').classList.add("gtmTerminosCondicionesClicTerminosLegales");
      document.querySelector('.mat-tab-label[aria-posinset="2"]').classList.add("gtmTerminosCondicionesClicEmprendedor");
      document.querySelector('.mat-tab-label[aria-posinset="3"]').classList.add("gtmTerminosCondicionesClicProteccionDatos");
      document.querySelector('.mat-tab-label[aria-posinset="4"]').classList.add("gtmTerminosCondicionesClicProgramaReferidos");
    }, 1000);
  
  }

  public getAmount() {
    this.subscription = this.link.getAmount().subscribe((amount) => {
      localStorage.setItem("Amount", amount.amountsCommission);
      localStorage.setItem("AmonuntReferred", amount.amountsReferred);
    });
  }

}
