import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogHistoryComponent } from 'src/app/modules/clicker/components/dialog-history/dialog-history.component';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';

@Component({
  selector: 'app-history-payment',
  templateUrl: './history-payment.component.html',
  styleUrls: ['./history-payment.component.scss'],
})
export class HistoryPaymentComponent implements OnInit {
  dataSource: any;
  pageIndex = 0;
  pageSize = 20;
  pageTo = 20;
  totalItems: number;
  paginate: string;
  from: any;
  to: any;

  available: string;
  conversionRate: any;
  totalLinks: number;
  totalProducts: number;
  account: string;
  rejected: string;

  dataBreak1: any;
  dataBreak2: any;
  dataBreak3: any;
  dataAcumulated: any;
  totalAcumulated: string;

  @ViewChild('templateBreak', { static: false })
  templateBreak: TemplateRef<any>;
  @ViewChild('templateBreak2', { static: false })
  templateBreak2: TemplateRef<any>;
  @ViewChild('templateBreak3', { static: false })
  templateBreak3: TemplateRef<any>;
  @ViewChild('templateAcumulated', { static: false })
  templateAcumulated: TemplateRef<any>;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  public pagination(paginate: any) {
    this.pageIndex = paginate;
    this.from = this.pageSize * this.pageIndex + 1 - 20;
    this.to = this.pageSize * (this.pageIndex + 1) - 20;
    // this.getPayments(this.from, this.to);
  }

  public break(key: string) {
    let template;
    let title;
    let id;

    switch (key) {
      case 'commissions':
        template = this.templateBreak;
        title = 'Detalle comisiones de este mes';
        id = 'break1-modal';
        break;

      case 'balance':
        template = this.templateBreak2;
        title = 'Detalle saldo pendiente por pagar';
        id = 'break2-modal';
        break;

      case 'rejected-commissions':
        template = this.templateBreak3;
        title = 'Detalle comisiones rechazadas';
        id = 'break3-modal';
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


  public userData(user) {
    console.log(user);
    /*const paymentDate = user.paymentDate;
    const bank = user.bank;
    const amount = user.amount;
    const title = 'Pago';
    const detail = 'Detalle de ventas';
    let items;

    this.subscription = this.payment.getDetailPaymentClicker(paymentDate).subscribe((resp) => {
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
    });*/
  }
}
