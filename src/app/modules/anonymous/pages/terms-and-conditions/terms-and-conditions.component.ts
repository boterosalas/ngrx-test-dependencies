import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';
import { MasterDataService } from 'src/app/services/master-data.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {

  constructor(
    private personalInfo: MasterDataService,
    private link: LinksService
  ) { }
  contentTerminos: any;
  contentProteccion: any;
  contentTransparencia: any;
  contentPrograma: any;
  textTerminos: any;
  textProteccion: any;
  textTransparencia: any;
  textPrograma: any;
  amount: any;
  amountReferred: any;
  private subscription: Subscription = new Subscription();

  ngOnInit() {

    this.amount = localStorage.getItem('Amount');
    this.amountReferred = localStorage.getItem('AmonuntReferred');
    this.getTerms();
    this.getAmount();
    this.addTagsclass();
  }

  public getAmount() {
    this.subscription = this.link.getAmount().subscribe((amount) => {
      localStorage.setItem("Amount", amount.amountsCommission);
      localStorage.setItem("AmonuntReferred", amount.amountsReferred);
    });
  }

  public addTagsclass() {
    setTimeout(() => {
      document.querySelector('.mat-tab-label[aria-posinset="1"]').classList.add("gtmTerminosCondicionesClicTerminosLegales");
      document.querySelector('.mat-tab-label[aria-posinset="2"]').classList.add("gtmTerminosCondicionesClicEmprendedor");
      document.querySelector('.mat-tab-label[aria-posinset="3"]').classList.add("gtmTerminosCondicionesClicProteccionDatos");
      document.querySelector('.mat-tab-label[aria-posinset="4"]').classList.add("gtmTerminosCondicionesClicProgramaReferidos");
    }, 1000);

  }
  getTerms() {
    this.personalInfo.getTerms().subscribe((resp: any) => {
      console.log(resp);
      this.contentTerminos = resp.objectResponse[0].sectionValue
      this.contentProteccion = resp.objectResponse[1].sectionValue
      this.contentTransparencia = resp.objectResponse[2].sectionValue
      this.contentPrograma = resp.objectResponse[3].sectionValue
      this.textTerminos = resp.objectResponse[0].sectionTitle
      this.textProteccion = resp.objectResponse[1].sectionTitle
      this.textTransparencia = resp.objectResponse[2].sectionTitle
      this.textPrograma = resp.objectResponse[3].sectionTitle
    })
  }
}
