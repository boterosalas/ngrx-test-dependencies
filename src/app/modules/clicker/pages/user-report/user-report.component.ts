import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';
import { TokenService } from 'src/app/services/token.service';
import { ContentService } from 'src/app/services/content.service';
import { formatPurchaseData } from './helpers/formatPurchaseDetail';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss'],
})
export class UserReportComponent implements OnInit, OnDestroy {

  cardsAreLoading: boolean = true;
  graphIsLoading: boolean = true;
  getPayment$: Subscription = new Subscription();
  getReportUser$: Subscription = new Subscription();
  getRewardsReport$: Subscription = new Subscription();
  bussinessList$: Subscription = new Subscription();
  graphData: any;
  purchaseDetailData: any = [];
  resumeCards: any;
  userId: string;
  pageTo: number = 20;
  bussinessList: any[];
  bussinessTopRewards = [];
  rewardsDetail: any[];
  cardRecompensas: number = 0;
  cardEnValidacion: number = 0;
  cardPendientePorPago: number = 0;
  cardRechazados: number = 0;
  recompensasPercent: number = 0;
  totalItems: number = 0;

  constructor(
    private payment: LinksService,
    private token: TokenService,
    private content: ContentService
  ) {
    this.userId = this.token.user.userid;
  }

  ngOnInit(): void {
    this.getBussinessByCategory();
  }

  getBussinessByCategory() {
    this.bussinessList$ = this.content
      .getAllBusiness(true)
      .subscribe((bussiness) => {
        this.bussinessList = bussiness;
        this.getRewardsReport();
        this.getReportUser();
      });
  }

  getReportUser() {
    this.getReportUser$ = this.payment.getReportUser(this.userId).subscribe({
      next: (resp: any) => {
        console.log({ getReportUser: resp });
        this.cardRecompensas = parseInt(resp.objectResponse.money.cutOffValue) || 0;
        this.cardEnValidacion = parseInt(resp.objectResponse.money.validation) || 0;
        this.cardPendientePorPago = parseInt(resp.objectResponse.money.accumulated) || 0;
        this.cardRechazados = parseInt(resp.objectResponse.money.rejected) || 0;
        this.recompensasPercent = Math.round(resp.objectResponse.money.cutOffValuePercent);
        this.cardsAreLoading = false;
      },
      error: () => {
        this.cardRecompensas = 0;
        this.cardEnValidacion = 0;
        this.cardPendientePorPago = 0;
        this.cardRechazados = 0;
        this.recompensasPercent = 0;
        this.cardsAreLoading = false;
      }
    });
  }

  getRewardsReport() {
    const params: any = {
      from: 1,
      to: 20,
      userId: this.userId
    };
    this.getRewardsReport$ = this.payment.getRewardsReportById(params).subscribe({
      next: (resp: any) => {
        console.log({ getRewardsReportById: resp });
        this.graphData = resp.objectResponse.generalResumeRewards.graph || [];
        this.bussinessTopRewards = this.formatBussinessRewardsTop(resp.objectResponse.generalResumeRewards.totalBusiness);
        this.purchaseDetailData = formatPurchaseData(resp.objectResponse.generalResumeRewards.cutOffValueRewards);
        this.totalItems = resp.objectResponse.generalResumeRewards.total;
        this.graphIsLoading = false;
      },
      error: () => {
        this.graphData = [];
        this.bussinessTopRewards = [];
        this.purchaseDetailData = [];
        this.totalItems = 0;
        this.graphIsLoading = false;
      }
    });
  }

  formatBussinessRewardsTop(bussiness: any[]) {
    if (!bussiness) return [];
    return bussiness.map(elem => {
      const currentBussiness = this.bussinessList.find(x => x.code === elem.business) || {};
      return {
        bussiness: currentBussiness ? currentBussiness.description || '--' : '--',
        total: parseFloat(elem.total),
        quantity: parseInt(elem.quantity),
        img: currentBussiness.imageurl
      }
    });
  }

  ngOnDestroy(): void {
    this.getPayment$.unsubscribe();
    this.getReportUser$.unsubscribe();
    this.getRewardsReport$.unsubscribe();
  }
}
