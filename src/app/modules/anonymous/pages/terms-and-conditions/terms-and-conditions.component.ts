import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';
import { MasterDataService } from 'src/app/services/master-data.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit, OnDestroy {
  constructor(private personalInfo: MasterDataService, private link: LinksService, @Inject(PLATFORM_ID) private platformId: object) { }
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
      localStorage.setItem('Amount', amount.amountsCommission);
      localStorage.setItem('AmonuntReferred', amount.amountsReferred);
    });
  }

  public addTagsclass() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        document.querySelector('.mat-tab-label[aria-posinset="1"]').classList.add('gtmTerminosCondicionesClicTerminosLegales');
        document.querySelector('.mat-tab-label[aria-posinset="2"]').classList.add('gtmTerminosCondicionesClicEmprendedor');
        document.querySelector('.mat-tab-label[aria-posinset="3"]').classList.add('gtmTerminosCondicionesClicProteccionDatos');
        document.querySelector('.mat-tab-label[aria-posinset="4"]').classList.add('gtmTerminosCondicionesClicProgramaReferidos');
      }, 1000);
    }
  }
  getTerms() {
    this.subscription = this.personalInfo.getTerms().subscribe((resp: any) => {
      this.contentTerminos = resp.objectResponse[0].sectionvalue;
      this.contentProteccion = resp.objectResponse[1].sectionvalue;
      this.contentTransparencia = resp.objectResponse[2].sectionvalue;
      this.contentPrograma = resp.objectResponse[3].sectionvalue;
      this.textTerminos = resp.objectResponse[0].sectiontitle;
      this.textProteccion = resp.objectResponse[1].sectiontitle;
      this.textTransparencia = resp.objectResponse[2].sectiontitle;
      this.textPrograma = resp.objectResponse[3].sectiontitle;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
