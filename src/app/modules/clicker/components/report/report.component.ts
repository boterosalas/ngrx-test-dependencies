import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator, MatPaginatorIntl, MatTableDataSource } from '@angular/material';
import { LinksService } from 'src/app/services/links.service';
import { TokenDataService } from 'src/app/services/token-data.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  paymentUser: Array<any>;
  dataSource: any;
  pageIndex: number = 0;
  pageSize: number;
  pageTo: number = 20;
  totalItems: number;
  paginate: string;
  private subscription: Subscription = new Subscription();

  constructor(private payment: LinksService) {
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getPayments();
  }

  public getPayments(from = 1, to = this.pageTo) {
    const params = {from, to};
    this.payment.getPayment(params).subscribe((payment) => {
      this.totalItems = payment.total;
      this.dataSource = new MatTableDataSource<any>(payment.users);
    });
  }

  public pagination(paginate: any) {
    this.pageIndex = paginate.pageIndex;
    paginate.length = this.totalItems;
    const from = paginate.pageSize * paginate.pageIndex + 1;
    const to = paginate.pageSize * (paginate.pageIndex + 1);
    this.getPayments(from, to)
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}
