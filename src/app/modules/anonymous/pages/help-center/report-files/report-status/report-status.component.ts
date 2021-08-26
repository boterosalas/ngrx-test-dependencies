import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import * as moment from 'moment';
import { DialogNoveltySatisfactionComponent } from 'src/app/modules/anonymous/components/dialog-novelty-satisfaction/dialog-novelty-satisfaction.component';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

moment.locale('es');
@Component({
  selector: 'app-report-status',
  templateUrl: './report-status.component.html',
  styleUrls: ['./report-status.component.scss'],
})
export class ReportStatusComponent implements OnInit {
  constructor(private fb: FormBuilder, private dialog: MatDialog, private users: UserService) {}
  //dataSourceNews: any
  selectedInic: any;
  dataSourceNews: any;

  ngOnInit() {
    this.users.getNovetlyUser().subscribe((resp: any) => {
      this.dataSourceNews = resp.objectResponse.novelties.map((r) => {
        return { ...r, qualification: { status: Math.floor(Math.random() * (5 - 1) + 1), comment: `Prueba ${Math.random()}` } };
      });
      console.log(this.dataSourceNews);
    });
  }

  stepIni(elem: any) {
    this.selectedInic = elem;
  }

  opeModalStatus(status: string, item: any) {
    let qualification = {
      status: Number(status),
      comment: item.qualification ? item.qualification.comment : '',
    };

    this.dialog
      .open(DialogNoveltySatisfactionComponent, {
        data: { ...qualification },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp && resp !== qualification) {
          console.log('GUARDAR', resp);
        }
      });
  }
}
