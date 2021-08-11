import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  idnotification: string;
  id: any;
  title: string;
  date: any;
  content: any;

  constructor(private router: Router, private route: ActivatedRoute, private _content: ContentService) {
    route.params.subscribe((data) => {
      this.idnotification = data.idnotification;
      this.id = [data.id];
    });
  }

  ngOnInit() {
    this.getNotification();
  }

  public getNotification() {
    this._content.getNotificationDetailAdmin(this.idnotification).subscribe((notification: ResponseService) => {
      this.title = notification.objectResponse.title;
      this.content = notification.objectResponse.content;
      this.date = notification.objectResponse.datepublish;
    });
  }

  public deleteNotication() {
    this._content.deleteNotificationUser(this.id).subscribe(() => this.router.navigate(['/notificaciones']));
  }
}
