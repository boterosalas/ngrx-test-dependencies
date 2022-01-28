import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';

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
  pageSize = 50;
  pageTo = 50;
  paginate: string;
  from: any;
  to: any;

  orderBy: string;
  ordination: string;

  private subscription: Subscription = new Subscription();

  displayedColumns: string[] = ['createdate', 'name','link'];

  dataSource = [];


  constructor(private link:LinksService) {}

  ngOnInit(): void {
    this.getReport();
  }

  public pagination(paginate: any) {
    this.pageIndex = paginate;
    this.from = this.pageSize * this.pageIndex + 1 - 10;
    this.to = this.pageSize * (this.pageIndex + 1) - 10;
    this.getReport(this.from, this.to);
  }

  public getReport(from = 1, to = this.pageTo) {
    const params = { from, to};
    this.subscription = this.link.getReport(params).subscribe((resp:any) => {
      this.size = resp.total;
      this.dataSource = resp.reports;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
