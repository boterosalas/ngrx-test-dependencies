import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-dialog-delete-notification',
  templateUrl: './dialog-delete-notification.component.html',
  styleUrls: ['./dialog-delete-notification.component.scss'],
})
export class DialogDeleteNotificationComponent implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _content: ContentService,
    private router: Router
  ) {}

  private subscription: Subscription = new Subscription();

  ngOnInit() {}

  cancelDelete() {
    this.dialog.closeAll();
  }

  deleteNotification() {
    this.subscription = this._content.deleteNotificationAdmin(this.data.idnotification).subscribe(() => {
      this.dialog.closeAll();
      this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/notificaciones-admin']);
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
