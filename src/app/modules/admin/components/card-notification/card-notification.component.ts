import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogDeleteNotificationComponent } from '../dialog-delete-notification/dialog-delete-notification.component';
import { DialogFaqGroupComponent } from '../dialog-faq-group/dialog-faq-group.component';

@Component({
  selector: 'app-card-notification',
  templateUrl: './card-notification.component.html',
  styleUrls: ['./card-notification.component.scss']
})
export class CardNotificationComponent implements OnInit {

  @Input() title:string;
  @Input() message:string;
  @Input() date:string;
  @Input() notification:string;
  @Input() edit:boolean;
  

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  deleteNotification(notification:any){
    
    const idnotification = notification.idnotification;
    
    this.dialog.open(DialogDeleteNotificationComponent, {
      data: {
        idnotification
      },
    });
    // this.subscription = dialogRef1.beforeClosed().subscribe(() => {
    //   this.getFaqs();
    // });
  }

  editNotification(notification:string){
    console.log(notification)
  }
  
}
