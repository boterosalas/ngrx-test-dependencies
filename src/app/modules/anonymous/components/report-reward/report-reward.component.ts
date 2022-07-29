import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { LinksService } from 'src/app/services/links.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-report-reward',
  templateUrl: './report-reward.component.html',
  styleUrls: ['./report-reward.component.scss'],
})
export class ReportRewardComponent implements OnInit, OnDestroy {
  userId: string;
  available: string;
  account: string;
  rejected: string;

  dataBreak1: any;
  dataBreak2: any;
  dataBreak3: any;
  isSaver:boolean;

  @ViewChild('templateBreak', { static: false })
  templateBreak: TemplateRef<any>;
  @ViewChild('templateBreak2', { static: false })
  templateBreak2: TemplateRef<any>;
  @ViewChild('templateBreak3', { static: false })
  templateBreak3: TemplateRef<any>;

  constructor(private link: LinksService, private token: TokenService, private dialog:MatDialog) {
    this.userId = token.user.userid;
  }

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getInfomonth();
  }

  public getInfomonth() {
    this.link.getReportUser(this.userId).subscribe((resp: ResponseService) => {
      this.available = resp.objectResponse.money.accumulated;
      this.account = resp.objectResponse.money.cutOffValue;
      this.rejected = resp.objectResponse.money.rejected || '0';
      this.dataBreak1 = new MatTableDataSource<any>(resp.objectResponse.money.detailCutOff);
      this.dataBreak2 = new MatTableDataSource<any>(resp.objectResponse.money.detailAccumulated);
      this.dataBreak3 = new MatTableDataSource<any>(resp.objectResponse.money.detailRejected);
      this.isSaver = resp.objectResponse.generalResume.isSaver;
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
