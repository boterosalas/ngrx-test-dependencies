import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss'],
})
export class UserReportComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {
    this.subjectReward.subscribe((data) => {
      this.objResponseRewards = data;
    });

    this.subjectDetalleRecompensa.subscribe((data) => {
      this.objResponsePurchaseDetail = new MatTableDataSource<any>(data);
    });
  }
}
