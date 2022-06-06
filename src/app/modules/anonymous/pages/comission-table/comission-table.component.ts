import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-comission-table',
  templateUrl: './comission-table.component.html',
  styleUrls: ['./comission-table.component.scss'],
})
export class ComissionTableComponent implements OnInit {
  constructor(private content: ContentService, @Inject(PLATFORM_ID) private platformId: object) { }

  tableComission = [];
  interval = interval(1000);
  intervalSubscription: Subscription;
  ngOnInit() {
    this.getComission();
  }

  public getComission() {
    this.content.getCommissions().subscribe((resp) => {
      this.tableComission = resp;
    });
  }


}
