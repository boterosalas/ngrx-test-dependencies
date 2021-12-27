import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-reward',
  templateUrl: './top-reward.component.html',
  styleUrls: ['./top-reward.component.scss']
})
export class TopRewardComponent implements OnInit {

 dataSource = [
   {
    commission: 0,
    date: "2021-12-23T14:47:41.383",
    link: "https://webclickamqa.z13.web.core.windows.net/url/u1tteneuos",
    productname: "Freidora De Aire Bioceramic Oster ",
    products: 0,
    visits: 0,
  },
  {
    commission: 0,
    date: "2021-12-23T14:47:41.383",
    link: "https://webclickamqa.z13.web.core.windows.net/url/u1tteneuos",
    productname: "Freidora De Aire Bioceramic Oster ",
    products: 0,
    visits: 0,
  },
  {
    commission: 0,
    date: "2021-12-23T14:47:41.383",
    link: "https://webclickamqa.z13.web.core.windows.net/url/u1tteneuos",
    productname: "Freidora De Aire Bioceramic Oster ",
    products: 0,
    visits: 0,
  },
  {
    commission: 0,
    date: "2021-12-23T14:47:41.383",
    link: "https://webclickamqa.z13.web.core.windows.net/url/u1tteneuos",
    productname: "Freidora De Aire Bioceramic Oster ",
    products: 0,
    visits: 0,
  },
  {
    commission: 0,
    date: "2021-12-23T14:47:41.383",
    link: "https://webclickamqa.z13.web.core.windows.net/url/u1tteneuos",
    productname: "Freidora De Aire Bioceramic Oster ",
    products: 0,
    visits: 0,
  }
 ]

  displayedColumns: string[] = ['productname', 'date', 'comission', 'total', 'visits'];

  ngOnInit() {}

}
