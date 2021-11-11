import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
import { DialogNoveltySatisfactionComponent } from 'src/app/modules/anonymous/components/dialog-novelty-satisfaction/dialog-novelty-satisfaction.component';

import { UserService } from 'src/app/services/user.service';

moment.locale('es');
@Component({
  selector: 'app-report-status',
  templateUrl: './report-status.component.html',
  styleUrls: ['./report-status.component.scss'],
})
export class ReportStatusComponent implements OnInit {
  constructor(private dialog: MatDialog, private users: UserService) {}
  selectedInic: any;
  dataSourceNews: any;

  ngOnInit() {
    this.getNovetlyUser();
  }
  getNovetlyUser() {
    this.users.getNovetlyUser().subscribe((resp: any) => {
      this.dataSourceNews = resp.objectResponse.novelties;
    });
  }

  stepIni(elem: any) {
    this.selectedInic = elem;
  }

  opeModalStatus(qualification: string, item: any) {
    this.dialog
      .open(DialogNoveltySatisfactionComponent, {
        data: { qualification: Number(qualification), comment: '' },
      })
      .afterClosed()
      .subscribe((resp) => {
        if(resp !== undefined) {
          if (resp.comment || resp.qualification) {
            this.saveQualification(resp, item);
          }
        }
      });
  }

  saveQualification(resp: any, item: any) {
    const data = { ...resp, id: item.id };
    this.users.saveQualificationNovelty(data).subscribe((resp: any) => {
      if (resp.state === 'Success') {
        this.getNovetlyUser();
      }
    });
  }
}
