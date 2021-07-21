import { Component, Input, OnInit } from '@angular/core';

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
  

  constructor() { }

  ngOnInit() {
  }

  deleteNotification(notification:string){
    console.log(notification)
  }

  editNotification(notification:string){
    console.log(notification)
  }
  
}
