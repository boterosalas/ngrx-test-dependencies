import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { UserService } from 'src/app/services/user.service';
import { ModalGenericComponent } from '../modal-generic/modal-generic.component';

@Component({
  selector: 'app-saving',
  templateUrl: './saving.component.html',
  styleUrls: ['./saving.component.scss'],
})
export class SavingComponent implements OnInit, OnDestroy {
  savingToggle: boolean;
  @ViewChild('templateSaving', { static: false })
  templateSaving: TemplateRef<any>;
  private subscription: Subscription = new Subscription();

  constructor(private dialog: MatDialog, private user: UserService) {}

  ngOnInit(): void {
    // this.getSaver();
  }

  saving() {
    const template = this.templateSaving;
    const title = '';
    const id = 'savings';
    this.dialog.open(ModalGenericComponent, {
      disableClose: true,
      width:'450px',
      data: {
        title,
        id,
        template,
      },
    });
  }

  cancel() {
    this.dialog.closeAll();
    this.savingToggle = false;
    // this.getSaver();
  }

  savingAction() {
    this.subscription = this.user.saveSaver().subscribe(() => {
      // this.getSaver();
      this.dialog.closeAll();
    })
  }

  // public getSaver() {
  //   this.subscription = this.user.getReportsavers().subscribe((resp: ResponseService) => {
  //     this.savingToggle = resp.objectResponse.isSaver;
  //   })
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
