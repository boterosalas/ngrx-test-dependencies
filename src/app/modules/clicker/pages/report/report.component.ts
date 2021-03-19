import { Component, OnInit, ViewChild, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { LinksService } from 'src/app/services/links.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { DialogHistoryComponent } from '../../components/dialog-history/dialog-history.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  paymentUser: Array<any>;
  dataSource: any;
  pageIndex: number = 0;
  pageSize: number;
  pageTo: number = 20;
  totalItems: number;
  paginate: string;
  available: string;
  conversionRate: any;
  totalLinks: number;
  totalProducts: number;
  account: string;
  isLoggedIn: any;
  identification: string;
  private subscription: Subscription = new Subscription();
  items = [];
  dataBreak1: any;
  dataBreak2: any;
  dataAcumulated: any;
  totalAcumulated: string;
  @ViewChild("templateBreak", { static: false })
  templateBreak: TemplateRef<any>;
  @ViewChild("templateBreak2", { static: false })
  templateBreak2: TemplateRef<any>;
  @ViewChild("templateAcumulated", { static: false })
  templateAcumulated: TemplateRef<any>;

  constructor(
    private payment: LinksService,
    private auth: AuthService,
    private token: TokenService,
    private dialog: MatDialog,
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

  /**
   * Metodo para listar los pagos
   * @param from 
   * @param to 
   */

  public getPayments(from = 1, to = this.pageTo) {
    const params = { from, to };
    this.subscription = this.payment.getPayment(params).subscribe((payment) => {
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

    //this.subscription = this.payment.getReports().subscribe((resume: any) => {
    //this.dataBreak1 = new MatTableDataSource<any>(resume.money.detail1);
    //this.dataBreak2 = new MatTableDataSource<any>(resume.money.detail2);
    //this.dataAcumulated = new MatTableDataSource<any>(resume.money.detailAccumulated);
    //});
    this.payment.getReportUser().subscribe((resp: any) => {
      this.totalAcumulated = resp.objectResponse.generalResume.totalCommissions;
      this.available = resp.objectResponse.money.accumulated;
      this.account = resp.objectResponse.money.cutOffValue;
      this.conversionRate = resp.objectResponse.generalResume.conversionRate;
      this.dataBreak1 = new MatTableDataSource<any>(resp.objectResponse.money.detailCutOff);
      this.dataBreak2 = new MatTableDataSource<any>(resp.objectResponse.money.detailAccumulated);
      this.totalLinks = resp.objectResponse.generalResume.totalLinks;
      this.totalProducts = resp.objectResponse.generalResume.totalProducts;
    })
  }

  /**
   * Metodo para listar la info bancaria del usuario
   * @param user 
   */

  public userData(user) {
    const paymentDate = user.paymentDate;
    const bank = user.bank;
    const amount = user.amount;
    const title = 'Pago';
    const detail = 'Detalle de ventas';
    let items;

    this.subscription = this.payment.getDetailPaymentClicker(paymentDate).subscribe(resp => {
      items = resp;

      this.dialog.open(DialogHistoryComponent, {
        width: "649px",
        data: {
          items,
          title,
          detail,
          paymentDate,
          bank,
          amount
        }
      });

    });

  }

  public break1() {
    const template = this.templateBreak;
    const title = "Detalle comisiones de este mes";
    const id = "break1-modal"

    this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        id,
        template,
      },
    });
  }

  public break2() {
    const template = this.templateBreak2;
    const title = "Detalle saldo pendiente por pagar";
    const id = "break2-modal"

    this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        id,
        template,
      },
    });
  }

  public acumulated() {
    const template = this.templateAcumulated;
    const title = "Detalle saldo acumulado";
    const id = "acumulated-modal"

    this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        id,
        template,
      },
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
