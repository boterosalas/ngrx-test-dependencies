import { Component, OnInit, ViewChild, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { DialogHistoryComponent } from '../../components/dialog-history/dialog-history.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
  paymentUser: Array<any>;
  dataSource: any;
  pageIndex = 0;
  pageSize = 20;
  pageTo = 20;
  totalItems: number;
  paginate: string;
  available: string;
  validation: string;
  conversionRate: any;
  totalLinks: number;
  totalProducts: number;
  account: string;
  rejected: string;
  isLoggedIn: any;
  identification: string;
  private subscription: Subscription = new Subscription();
  from: any;
  to: any;
  items = [];
  dataBreak1: any;
  dataBreak2: any;
  dataBreak3: any;
  dataBreak4: any;
  dataAcumulated: any;
  totalAcumulated: string;
  @ViewChild('templateBreak', { static: false })
  templateBreak: TemplateRef<any>;
  @ViewChild('templateBreak2', { static: false })
  templateBreak2: TemplateRef<any>;
  @ViewChild('templateBreak3', { static: false })
  templateBreak3: TemplateRef<any>;
  @ViewChild('templateBreak4', { static: false })
  templateBreak4: TemplateRef<any>;
  @ViewChild('templateAcumulated', { static: false })
  templateAcumulated: TemplateRef<any>;
  userId: string;
  isSaver: boolean;

  constructor(private payment: LinksService, private auth: AuthService, private token: TokenService, private dialog: MatDialog) {
    this.userId = token.user.userid;
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

  public pagination(paginate: any) {
    this.pageIndex = paginate;
    this.from = this.pageSize * this.pageIndex + 1 - 20;
    this.to = this.pageSize * (this.pageIndex + 1) - 20;
    this.getPayments(this.from, this.to);
  }

  /**
   * Metodo para obtener el resumen del mes generados
   */

  private getInfomonth() {
    this.payment.getReportUser(this.userId).subscribe((resp: any) => {
      console.log('resp', resp);
      this.totalAcumulated = resp.objectResponse.generalResume.totalCommissions;
      this.available = resp.objectResponse.money.accumulated;
      this.validation = resp.objectResponse.money.validation;
      this.account = resp.objectResponse.money.cutOffValue;
      this.rejected = resp.objectResponse.money.rejected || '0';
      this.conversionRate = resp.objectResponse.generalResume.conversionRate;
      this.dataBreak1 = new MatTableDataSource<any>(resp.objectResponse.money.detailCutOff);
      this.dataBreak2 = new MatTableDataSource<any>(resp.objectResponse.money.detailAccumulated);
      let dataRejected;
      if (resp.objectResponse.money.detailRejected) {
        dataRejected = resp.objectResponse.money.detailRejected.map((elem: any) => ({ ...elem, statusCommission: 'Pedido cancelado' }));
      }
      this.dataBreak3 = new MatTableDataSource<any>(dataRejected);
      this.dataBreak4 = new MatTableDataSource<any>(resp.objectResponse.money.detailValidation);
      this.totalLinks = resp.objectResponse.generalResume.totalLinks;
      this.totalProducts = resp.objectResponse.generalResume.totalProducts;
      this.isSaver = resp.objectResponse.generalResume.isSaver;
    });
  }

  /**
   * Metodo para listar la info bancaria del usuario
   * @param user usuario
   */

  public userData(user) {
    const paymentDate = user.paymentDate;
    const bank = user.bank;
    const amount = user.amount;
    const title = 'Pago';
    const detail = 'Detalle de ventas';
    let items;

    this.subscription = this.payment.getDetailPaymentClicker(paymentDate, this.userId).subscribe((resp) => {
      items = resp;

      this.dialog.open(DialogHistoryComponent, {
        width: '649px',
        data: {
          items,
          title,
          detail,
          paymentDate,
          bank,
          amount,
        },
      });
    });
  }

  public break(key: string) {
    let template;
    let title;
    let id;

    switch (key) {
      case 'commissions':
        template = this.templateBreak;
        title = 'Detalle recompensas de este mes';
        id = 'break1-modal';
        break;

      case 'balance':
        template = this.templateBreak2;
        title = 'Detalle saldo pendiente por pagar';
        id = 'break2-modal';
        break;

      case 'rejected-commissions':
        template = this.templateBreak3;
        title = 'Detalle recompensas rechazadas';
        id = 'break3-modal';
        break;

      case 'validation':
        template = this.templateBreak4;
        title = 'Detalle saldo por validar';
        id = 'break4-modal';
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
