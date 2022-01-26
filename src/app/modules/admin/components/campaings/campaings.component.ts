import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataRangeInterface } from 'src/app/interfaces/dateRangeInterface';
import { UserService } from 'src/app/services/user.service';
import { FormCampaignComponent } from '../form-campaign/form-campaign.component';

@Component({
  selector: 'app-campaings',
  templateUrl: './campaings.component.html',
  styleUrls: ['./campaings.component.scss'],
})
export class CampaingsComponent implements OnInit, OnDestroy {
  startDate: string;
  endDate: string;

  size: number;
  p: number;
  totalItems: number;

  pageIndex = 0;
  pageSize = 50;
  pageTo = 50;
  paginate: string;
  from: any;
  to: any;

  orderBy: string;
  ordination: string;

  private subscription: Subscription = new Subscription();

  displayedColumns: string[] = ['createdate', 'pubdate', 'campaign', 'link', 'clics', 'userscampaign','usersactive','actions'];

  dataSource = [
    {createdate: '2022/01/08', publicationdate: '2022/01/08', campaign: 'Acensores', link:'https://clickam.com.co/inicio?campaign=acensores&register=true', clics:200, userscampaign: 150, usersactive: 120, register:false },
    {createdate: '2022/01/08', publicationdate: '2022/01/08', campaign: 'Acensores', link:'https://clickam.com.co/inicio?campaign=acensores&register=true', clics:200, userscampaign: 150, usersactive: 120, register:false },
    {createdate: '2022/01/08', publicationdate: '2022/01/08', campaign: 'Acensores', link:'https://clickam.com.co/inicio?campaign=acensores&register=true', clics:200, userscampaign: 150, usersactive: 120, register:false },
    {createdate: '2022/01/08', publicationdate: '2022/01/08', campaign: 'Acensores', link:'https://clickam.com.co/inicio?campaign=acensores&register=true', clics:200, userscampaign: 150, usersactive: 120, register:false },
    {createdate: '2022/01/08', publicationdate: '2022/01/08', campaign: 'Acensores', link:'https://clickam.com.co/inicio?campaign=acensores&register=true', clics:200, userscampaign: 150, usersactive: 120, register:false },
    {createdate: '2022/01/08', publicationdate: '2022/01/08', campaign: 'Acensores', link:'https://clickam.com.co/inicio?campaign=acensores&register=true', clics:200, userscampaign: 150, usersactive: 120, register:false },
    {createdate: '2022/01/08', publicationdate: '2022/01/08', campaign: 'Acensores', link:'https://clickam.com.co/inicio?campaign=acensores&register=true', clics:200, userscampaign: 150, usersactive: 120, register:false },
    {createdate: '2022/01/08', publicationdate: '2022/01/08', campaign: 'Acensores', link:'https://clickam.com.co/inicio?campaign=acensores&register=true', clics:200, userscampaign: 150, usersactive: 120, register:false },
    {createdate: '2022/01/08', publicationdate: '2022/01/08', campaign: 'Acensores', link:'https://clickam.com.co/inicio?campaign=acensores&register=true', clics:200, userscampaign: 150, usersactive: 120, register:false },
    {createdate: '2022/01/08', publicationdate: '2022/01/08', campaign: 'Acensores', link:'https://clickam.com.co/inicio?campaign=acensores&register=true', clics:200, userscampaign: 150, usersactive: 120, register:false },
    {createdate: '2023/01/08', publicationdate: '2023/01/08', campaign: 'otro',      link:'https://clickam.com.co/inicio?campaign=otro&register=false', clics:100, userscampaign: 50, usersactive: 20, register: true },
  ];


  constructor(private dialog:MatDialog, private user:UserService) {}

  ngOnInit(): void {
    this.size = 10;
    // this.getCampaigns();
  }

  public getDate(e: DataRangeInterface) {
    this.startDate = e.startDate;
    this.endDate = e.endDate;
  }

  public exportCampaign() {
    const params = {
      startDate: this.startDate,
      endDate: this.endDate,
    };

    // this.user.getreportordersnotinvoiced(params).subscribe((orders: ResponseService) => {
    //   this.openSnackBar(orders.userMessage, 'Cerrar');
    // })
  }

  public addCampaign() {
    const dialog = this.dialog.open(FormCampaignComponent, {
      width: '450px',
    });

    dialog.beforeClosed().subscribe(() => {
      this.getCampaigns(this.from, this.to, this.orderBy, this.ordination, this.startDate, this.endDate);
    });
  }

  public edit(item: any) {
    const data = {
      edit: true,
      item
    }
    const dialog = this.dialog.open(FormCampaignComponent, {
      data,
      width: '450px',
    });
  }

  public pagination(paginate: any) {
    this.pageIndex = paginate;
    this.from = this.pageSize * this.pageIndex + 1 - 50;
    this.to = this.pageSize * (this.pageIndex + 1) - 50;
    this.getCampaigns(this.from, this.to, this.orderBy, this.ordination, this.startDate, this.endDate);
  }

  public sortData(event) {
    let name = event.active.toUpperCase();
    const direction = event.direction.toUpperCase();
    if (direction === '') {
      name = '';
    }
    this.orderBy = name;
    this.ordination = direction;
    this.getCampaigns(this.from, this.to, this.orderBy, this.ordination, this.startDate, this.endDate);
  }

  public getCampaigns(from = 1, to = this.pageTo, orderBy = '' , orderOrigin = '', startDate = '', endDate = '') {
    const params = { from, to, orderOrigin , orderBy, startDate, endDate };
    this.subscription = this.user.getCampaigns(params).subscribe((resp) => {
      this.totalItems = resp.total;
      this.dataSource = resp.linkHistory;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
