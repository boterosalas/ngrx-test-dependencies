import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { LinksService } from 'src/app/services/links.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-links-historial',
  templateUrl: './links-historial.component.html',
  styleUrls: ['./links-historial.component.scss']
})
export class LinksHistorialComponent implements OnInit, OnDestroy {

  dataSource: any;
  pageIndex: number = 0;
  pageSize: number = 20;
  pageTo: number = 20;
  totalItems: number;
  paginate: string;
  private subscription: Subscription = new Subscription();
  orderBy: string;
  from: any;
  to: any;
  orderOptions: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  orderValue: any;

  constructor(
    private links: LinksService
  ) { }

  ngOnInit() {

    this.orderOptions = [
      {value: 'DATEASC', description: 'Más recientes'},
      {value: 'DATEDESC', description: 'Menos recientes'},
      {value: 'EFFECTIVEASC', description: 'Más efectivo'},
      {value: 'EFFECTIVEDESC', description: 'Menos efectivo'},
    ]

      this.getLinksHistory();

  }

  public pagination(paginate: any) {
    this.pageIndex = paginate.pageIndex;
    paginate.length = this.totalItems;
    this.from = paginate.pageSize * paginate.pageIndex + 1;
    this.to = paginate.pageSize * (paginate.pageIndex + 1);
    this.getLinksHistory(this.from, this.to);
  }

  public getLinksHistory(from = 1, to = this.pageTo, orderBy = "DATEASC") {
    const params = { from, to, orderBy };
    this.subscription = this.links.getLinkHistory(params).subscribe(resp => {
      this.dataSource = new MatTableDataSource<any>(resp);
      this.totalItems = resp.total;
    });
  }

  public order(option:string) {
    this.pageIndex = 0;
    this.getLinksHistory(1, this.pageTo, option );
    this.orderValue = option;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
