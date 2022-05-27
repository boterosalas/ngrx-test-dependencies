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
    this.addTagsTableComission();
  }

  public getComission() {
    this.content.getCommissions().subscribe((resp) => {
      this.tableComission = resp;
    });
  }

  addTagsTableComission() {
    if (isPlatformBrowser(this.platformId)) {
      this.intervalSubscription = this.interval.subscribe(() => {
        document.querySelector('.mat-tab-label[aria-posinset="1"]').classList.add('gtmTablaDeRecompensasProductoMovilExito');
        document.querySelector('.mat-tab-label[aria-posinset="1"] .mat-tab-label-content').classList.add('gtmTablaDeRecompensasProductoMovilExito');

        document.querySelector('.mat-tab-label[aria-posinset="2"]').classList.add('gtmTablaDeRecompensasProductoSeguros');
        document.querySelector('.mat-tab-label[aria-posinset="2"] .mat-tab-label-content').classList.add('gtmTablaDeRecompensasProductoSeguros');

        document.querySelector('.mat-tab-label[aria-posinset="3"]').classList.add('gtmTablaDeRecompensasProductoViajes');
        document.querySelector('.mat-tab-label[aria-posinset="3"] .mat-tab-label-content').classList.add('gtmTablaDeRecompensasProductoViajes');

        document.querySelector('.mat-tab-label[aria-posinset="4"]').classList.add('gtmTablaDeRecompensasProductoWesura');
        document.querySelector('.mat-tab-label[aria-posinset="4"] .mat-tab-label-content').classList.add('gtmTablaDeRecompensasProductoWesura');

        document.querySelector('.mat-tab-label[aria-posinset="4"]').classList.add('gtmTablaDeRecompensasProductoCarulla');
        document.querySelector('.mat-tab-label[aria-posinset="4"] .mat-tab-label-content').classList.add('gtmTablaDeRecompensasProductoCarulla');

        document.querySelector('.mat-tab-label[aria-posinset="5"]').classList.add('gtmTablaDeRecompensasProductoExito');
        document.querySelector('.mat-tab-label[aria-posinset="5"] .mat-tab-label-content').classList.add('gtmTablaDeRecompensasProductoExito');
      });

      if (document.querySelector('.mat-tab-label[aria-posinset="1"]')) {
        this.intervalSubscription.unsubscribe();
      }
    }
  }
}
