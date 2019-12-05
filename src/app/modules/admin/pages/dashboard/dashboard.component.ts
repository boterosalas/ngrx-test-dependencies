import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private kpi: LinksService) { }

  totalUsers: string;
  totalActiveUsers: string;
  totalMonthRegisterUsers:string;
  todayRegisterUsers:string;
  totalMonthRegisterActive:string;
  todayActiveUsers:string;
  salesMonth: string;
  salesMonthYesterday: string;
  salesMonthTotalYesterday: string;
  commissionMonth: string;
  commissionMonthYesterday: string;
  commissionMonthTotalYesterday: string;
  linksMonth: string;
  linksMonthYesterday: string;
  linksMonthTotalYesterday: string;
  percent: any;
  links = true;

  monthActiveUsersQuantity:string;

  ngOnInit() {
    this.getKPI();
  }

  public getKPI(){
    this.kpi.getKPI().subscribe(resp=> {
      this.totalUsers = resp.historicalUsersQuantity;
      this.totalActiveUsers = resp.historicalActiveUsersQuantity;
      this.totalMonthRegisterUsers = resp.monthUsersQuantity;
      this.todayRegisterUsers = resp.todayUsersQuantity;
      this.totalMonthRegisterActive = resp.historicalActiveUsersQuantity;
      this.todayActiveUsers = resp.yesterdayActiveUsersQuantity;
      this.salesMonth = resp.monthSales;
      this.salesMonthYesterday = resp.yesterdaySales;
      this.salesMonthTotalYesterday = resp.historicalSales;
      this.commissionMonth = resp.monthCommissionValue;
      this.commissionMonthYesterday = resp.yesterdayCommissionValue;
      this.commissionMonthTotalYesterday = resp.historicalCommissionValue;
      this.linksMonth = resp.monthGeneratedLinks;
      this.linksMonthYesterday = resp.todayGeneratedLinks;
      this.linksMonthTotalYesterday = resp.historicalGeneratedLinks;
      this.percent = (resp.historicalActiveUsersQuantity /resp.historicalUsersQuantity) * 100;
      this.monthActiveUsersQuantity = resp.monthActiveUsersQuantity;
    })
  }

}
