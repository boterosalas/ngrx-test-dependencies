import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-download-center',
  templateUrl: './download-center.component.html',
  styleUrls: ['./download-center.component.scss']
})
export class DownloadCenterComponent implements OnInit {

  size: number;
  p: number;
  totalItems: number;

  pageIndex = 0;
  pageSize = 10;
  pageTo = 10;
  paginate: string;
  from: any;
  to: any;

  orderBy: string;
  ordination: string;

  private subscription: Subscription = new Subscription();

  displayedColumns: string[] = ['createdate', 'name','link'];

  dataSource = [
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/08', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
    {createdate: '2022/01/10', name: '2022/01/08',  link:'http://clickam.com.co/reportes/ndjfa823njsdf91.xls'},
  ];


  constructor() {}

  ngOnInit(): void {
    this.size = 12;
  }

  public pagination(paginate: any) {
    this.pageIndex = paginate;
    this.from = this.pageSize * this.pageIndex + 1 - 10;
    this.to = this.pageSize * (this.pageIndex + 1) - 10;
    this.getCampaigns(this.from, this.to, this.orderBy, this.ordination);
  }

  public sortData(event) {
    let name = event.active.toUpperCase();
    const direction = event.direction.toUpperCase();
    if (direction === '') {
      name = '';
    }
    this.orderBy = name;
    this.ordination = direction;
    this.getCampaigns(this.from, this.to, this.orderBy, this.ordination,);
  }

  public getCampaigns(from = 1, to = this.pageTo, orderBy = '' , orderOrigin = '') {
    const params = { from, to, orderOrigin , orderBy };
    // this.subscription = this.user.getCampaigns(params).subscribe((resp) => {
    //   this.totalItems = resp.total;
    //   this.dataSource = resp.linkHistory;
    // });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
