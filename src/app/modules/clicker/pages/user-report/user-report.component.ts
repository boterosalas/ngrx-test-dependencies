import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent implements OnInit, OnDestroy {

  getPayment$: Subscription = new Subscription();
  getReportUser$: Subscription = new Subscription();
  resumeCards: any;
  userId: string;
  pageTo: number = 20;

  constructor(
    private payment: LinksService,
    private token: TokenService,
  ) {
    this.userId = this.token.user.userid;
  }

  ngOnInit(): void {
    this.getPayments();
    this.getInfoMonth();
  }

  getPayments(from = 1, to = this.pageTo) {
    const params = { from, to };
    this.getPayment$ = this.payment.getPayment(this.userId, params).subscribe((payment: any) => {
      console.log({ payment })
    });
  }

  getInfoMonth() {
    this.getReportUser$ = this.payment.getReportUser(this.userId).subscribe((resp: any) => {
      console.log({ getReportUser: resp });
      this.resumeCards = {
        recompensas: parseInt(resp.objectResponse.money.cutOffValue) || 0,
        enValidacion: parseInt(resp.objectResponse.money.validation) || 0,
        pendientePorPago: parseInt(resp.objectResponse.money.accumulated) || 0,
        rechazados: parseInt(resp.objectResponse.money.rejected) || 0
      }
      // this.totalAcumulated = resp.objectResponse.generalResume.totalCommissions;
      // this.available = resp.objectResponse.money.accumulated;
      // this.validation = resp.objectResponse.money.validation;
      // this.account = resp.objectResponse.money.cutOffValue;
      // this.rejected = resp.objectResponse.money.rejected || '0';
      // this.conversionRate = resp.objectResponse.generalResume.conversionRate;
      // this.totalLinks = resp.objectResponse.generalResume.totalLinks;
      // this.totalProducts = resp.objectResponse.generalResume.totalProducts;
    });
  }

  ngOnDestroy(): void {
    this.getPayment$.unsubscribe();
    this.getReportUser$.unsubscribe();
  }

}
