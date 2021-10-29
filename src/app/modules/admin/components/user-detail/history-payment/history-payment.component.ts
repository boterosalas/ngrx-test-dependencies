import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogHistoryComponent } from 'src/app/modules/clicker/components/dialog-history/dialog-history.component';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-history-payment',
  templateUrl: './history-payment.component.html',
  styleUrls: ['./history-payment.component.scss'],
})
export class HistoryPaymentComponent implements OnInit, OnDestroy {
  @ViewChild('templateBreak', { static: false })
  templateBreak: TemplateRef<any>;
  @ViewChild('templateBreak2', { static: false })
  templateBreak2: TemplateRef<any>;
  @ViewChild('templateBreak3', { static: false })
  templateBreak3: TemplateRef<any>;
  @ViewChild('templateAcumulated', { static: false })
  templateAcumulated: TemplateRef<any>;

  dataBreak1: any;
  dataBreak2: any;
  dataBreak3: any;
  dataAcumulated: any;
  totalAcumulated: string;

  paymentUser: Array<any>;

  dataSource: any;

  available: string;
  conversionRate: any;

  totalLinks: number;
  totalProducts: number;
  account: string;
  rejected: string;
  identification: string;
  private subscription: Subscription = new Subscription();

  pageIndex = 0;
  pageSize = 20;
  pageTo = 20;
  from: any;
  to: any;
  items = [];
  paginate: string;
  totalItems: number;

  userId: string;

  constructor(private route: ActivatedRoute, private payment: LinksService, private dialog: MatDialog) {
    this.route.params.subscribe((userId) => {
      this.userId = userId.id;
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getPayments();
    this.getInfomonth();
  }

  public pagination(paginate: any) {
    this.pageIndex = paginate;
    this.from = this.pageSize * this.pageIndex + 1 - 20;
    this.to = this.pageSize * (this.pageIndex + 1) - 20;
    this.getPayments(this.from, this.to);
  }

  /**
   * Metodo para listar los pagos
   * @param from desde
   * @param to hasta
   */

  public getPayments(from = 1, to = this.pageTo) {
    const params = { from, to };
    this.subscription = this.payment.getPayment(this.userId, params).subscribe((payment) => {
      this.totalItems = payment.total;
      this.dataSource = payment.users;
    });
  }

  /**
   * Metodo para obtener el resumen del mes generados
   */

  private getInfomonth() {
    this.payment.getReportUser(this.userId).subscribe((resp: any) => {
      this.dataBreak3 = new MatTableDataSource<any>(resp.objectResponse.money.detailRejected);
      this.dataBreak2 = new MatTableDataSource<any>(resp.objectResponse.money.detailAccumulated);
      this.dataBreak1 = new MatTableDataSource<any>(resp.objectResponse.money.detailCutOff);
      this.totalLinks = resp.objectResponse.generalResume.totalLinks;
      this.conversionRate = resp.objectResponse.generalResume.conversionRate;
      this.totalProducts = resp.objectResponse.generalResume.totalProducts;
      this.rejected = resp.objectResponse.money.rejected || '0';
      this.account = resp.objectResponse.money.cutOffValue;
      this.available = resp.objectResponse.money.accumulated;
      this.totalAcumulated = resp.objectResponse.generalResume.totalCommissions;
    });
  }

  /**
   * Metodo para listar la info bancaria del usuario
   * @param user usuario
   */

  public userData(user) {
    let items;
    const detail = 'Detalle de ventas';
    const title = 'Pago';
    const amount = user.amount;
    const bank = user.bank;
    const paymentDate = user.paymentDate;

    this.subscription = this.payment.getDetailPaymentClicker(paymentDate, this.userId).subscribe((resp) => {
      items = resp;
      this.dialog.open(DialogHistoryComponent, {
        width: '649px',
        data: {
          bank,
          amount,
          paymentDate,
          detail,
          title,
          items,
        },
      });
    });
  }

  public break(key: string) {
    let id;
    let title;
    let template;

    switch (key) {

      case 'rejected-commissions':
        template = this.templateBreak3;
        title = 'Detalle comisiones rechazadas';
        id = 'break3-modal';
        break;

      case 'balance':
        template = this.templateBreak2;
        title = 'Detalle saldo pendiente por pagar';
        id = 'break2-modal';
        break;

      case 'commissions':
        template = this.templateBreak;
        title = 'Detalle comisiones de este mes';
        id = 'break1-modal';
        break;

      default:
        template = this.templateAcumulated;
        title = 'Detalle saldo acumulado';
        id = 'acumulated-modal';
        break;
    }

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
