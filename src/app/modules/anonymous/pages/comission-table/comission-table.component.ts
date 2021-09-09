import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-comission-table',
  templateUrl: './comission-table.component.html',
  styleUrls: ['./comission-table.component.scss'],
})
export class ComissionTableComponent implements OnInit {
  constructor(private content: ContentService) {}

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
    this.intervalSubscription = this.interval.subscribe(() => {
      document.querySelector('.mat-tab-label[aria-posinset="1"]').classList.add('gtmTablaComiClicMenuMovilExito');
      document.querySelector('.mat-tab-label[aria-posinset="1"] .mat-tab-label-content').classList.add('gtmTablaComiClicMenuMovilExito');

      document.querySelector('.mat-tab-label[aria-posinset="2"]').classList.add('gtmTablaComiClicMenuSeguros');
      document.querySelector('.mat-tab-label[aria-posinset="2"] .mat-tab-label-content').classList.add('gtmTablaComiClicMenuSeguros');

      document.querySelector('.mat-tab-label[aria-posinset="3"]').classList.add('gtmTablaComiClicMenuViajes');
      document.querySelector('.mat-tab-label[aria-posinset="3"] .mat-tab-label-content').classList.add('gtmTablaComiClicMenuViajes');

      document.querySelector('.mat-tab-label[aria-posinset="4"]').classList.add('gtmTablaComiClicMenuWesura');
      document.querySelector('.mat-tab-label[aria-posinset="4"] .mat-tab-label-content').classList.add('gtmTablaComiClicMenuWesura');

      document.querySelector('.mat-tab-label[aria-posinset="4"]').classList.add('gtmTablaComiClicMenuCarulla');
      document.querySelector('.mat-tab-label[aria-posinset="4"] .mat-tab-label-content').classList.add('gtmTablaComiClicMenuCarulla');

      document.querySelector('.mat-tab-label[aria-posinset="5"]').classList.add('gtmTablaComiClicMenuExito');
      document.querySelector('.mat-tab-label[aria-posinset="5"] .mat-tab-label-content').classList.add('gtmTablaComiClicMenuExito');
    });

    if (document.querySelector('.mat-tab-label[aria-posinset="1"]')) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
