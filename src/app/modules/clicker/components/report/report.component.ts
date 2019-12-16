import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { LinksService } from 'src/app/services/links.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

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
  available: string;
  account:string;
  isLoggedIn: any;
  identification: string;
  private subscription: Subscription = new Subscription();

  constructor(
    private payment: LinksService,
    private auth: AuthService,
    private token: TokenService
    ) {
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    if (this.isLoggedIn) {
      this.identification = this.token.userInfo().identification;
      this.getInfomonth();
      this.getPayments();
    }
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

   /**
   * Metodo para obtener el resumen del mes generados
   */

  private getInfomonth() {
    this.payment.getReports(this.identification).subscribe((resume: any) => {
      this.available = resume.money.available;
      this.account = resume.money.account;
    });
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}
