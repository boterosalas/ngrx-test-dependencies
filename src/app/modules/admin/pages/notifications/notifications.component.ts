import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  constructor(private _content: ContentService) {}

  published = [];
  scheduled = [];

  ngOnInit() {
    this.getNoticationAdmin();
  }

  public getNoticationAdmin() {
    this._content.getNotificationAdmin(true).subscribe((adminNotification) => {
      this.published = adminNotification.objectResponse.published;
      this.scheduled = adminNotification.objectResponse.scheduled;
    });
  }
}
