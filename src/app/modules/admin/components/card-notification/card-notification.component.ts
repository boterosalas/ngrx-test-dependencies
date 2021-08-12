import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DialogDeleteNotificationComponent } from '../dialog-delete-notification/dialog-delete-notification.component';

@Component({
  selector: 'app-card-notification',
  templateUrl: './card-notification.component.html',
  styleUrls: ['./card-notification.component.scss'],
})
export class CardNotificationComponent implements OnInit {
  @Input() title: string;
  @Input() user: string;
  @Input() date: string;
  @Input() notification: any;
  @Input() url: string;
  @Input() edit: boolean;

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {}

  deleteNotification(notification: any) {
    const idnotification = notification.idnotification;

    this.dialog.open(DialogDeleteNotificationComponent, {
      data: {
        idnotification,
      },
    });
  }

  editNotification(notification: any) {
    const idnotification = notification.idnotification;
    this.router.navigate(['/notificacion', idnotification]);
  }

  downloadFile(notification: any) {
    console.log(notification);
    const url = notification.url;
    window.open(url, '_blank');
  }
}
