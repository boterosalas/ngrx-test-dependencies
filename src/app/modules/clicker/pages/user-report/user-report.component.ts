import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';
import { TokenService } from 'src/app/services/token.service';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss'],
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
  objResponseRewards = [];
  objResponsePurchaseDetail: any;

  subjectReward: BehaviorSubject<any> = new BehaviorSubject<any>([
    {
      img: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-business/20220218113151.svg',
      title: 'Almaecnes Éxito',
      money: 23000000,
      count: '12 productos',
    },
    {
      img: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-business/20220223110021.svg',
      title: 'Almaecnes Éxito',
      money: 23000000,
      count: '12 productos',
    },
    {
      img: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-business/20220329163519.svg',
      title: 'Almaecnes Éxito',
      money: 23000000,
      count: '12 productos',
    },
    {
      img: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-business/ico-seguros.svg',
      title: 'Almaecnes Éxito',
      money: 23000000,
      count: '12 productos',
    },
  ]);

  subjectDetalleRecompensa: BehaviorSubject<any> = new BehaviorSubject<any>([
    {
      date: '10/01/20',
      product: 'Camisa rosa',
      amout: 1,
      business: 'Almacenes Éxito',
      saleValue: 132000,
      reward: 13000,
      status: 'Por validar',
    },
    {
      date: '10/01/20',
      product: 'Camisa rosa',
      amout: 1,
      business: 'Almacenes Éxito',
      saleValue: 132000,
      reward: 13000,
      status: 'Rechazada',
    },
    {
      date: '10/01/20',
      product: 'Camisa rosa',
      amout: 1,
      business: 'Almacenes Éxito',
      saleValue: 132000,
      reward: 13000,
      status: 'Acumulado',
    },
    {
      date: '10/01/20',
      product: 'Camisa rosa',
      amout: 1,
      business: 'Almacenes Éxito',
      saleValue: 132000,
      reward: 13000,
      status: 'Por pagar',
    },
  ]);

  ngOnInit(): void {
    this.getPayments();
    this.getInfoMonth();
    this.subjectReward.subscribe((data) => {
      this.objResponseRewards = data;
    });

    this.subjectDetalleRecompensa.subscribe((data) => {
      this.objResponsePurchaseDetail = new MatTableDataSource<any>(data);
    });
  }
}
