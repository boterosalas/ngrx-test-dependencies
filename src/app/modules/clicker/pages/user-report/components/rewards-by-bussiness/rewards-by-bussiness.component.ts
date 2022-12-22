import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rewards-by-bussiness',
  templateUrl: './rewards-by-bussiness.component.html',
  styleUrls: ['./rewards-by-bussiness.component.scss'],
})
export class RewardsByBussinessComponent implements OnInit {
  ojbRewards = [
    {
      img: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-business/20220218113151.svg',
      title: 'Almaecnes Éxito',
      money: '23.000.000',
      count: '12 productos',
    },
    {
      img: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-business/20220223110021.svg',
      title: 'Almaecnes Éxito',
      money: '23.000.000',
      count: '12 productos',
    },
    {
      img: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-business/20220329163519.svg',
      title: 'Almaecnes Éxito',
      money: '23.000.000',
      count: '12 productos',
    },
    {
      img: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-business/ico-seguros.svg',
      title: 'Almaecnes Éxito',
      money: '23.000.000',
      count: '12 productos',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
