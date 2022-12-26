import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss'],
})
export class UserReportComponent implements OnInit {
  objResponseRewards = [];

  subject: BehaviorSubject<any> = new BehaviorSubject<any>([
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

  constructor() {}

  ngOnInit(): void {
    this.subject.subscribe((data) => {
      this.objResponseRewards = data;
    });
  }
}
