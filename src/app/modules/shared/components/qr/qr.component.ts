import { Component, OnInit } from '@angular/core';
import { LocationHref } from 'src/app/helpers/window-location';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements OnInit {
  firstTime: boolean = true;
  isQrOpen: boolean = true;
  store: string = '';
  userAgent: string = '';
  environment = environment;

  constructor() {}
  ngOnInit(): void {}
  toggleShow() {
    this.isQrOpen = !this.isQrOpen;
  }
  detectStore() {
    this.userAgent = navigator.userAgent.toLowerCase();
    if (!this.isQrOpen) {
      this.isQrOpen = !this.isQrOpen;
      return;
    } else {
      const appStore = 'https://apps.apple.com/co/app/clickam/id1495823258';
      const playStore = 'https://play.google.com/store/apps/details?id=com.clickam.appcompania';
      if (/iphone|ipad|phone/i.test(this.userAgent)) {
        this.store = appStore;
      } else if (/android|x11/i.test(this.userAgent)) {
        this.store = playStore;
      }
      LocationHref.redirect(this.store);
    }
  }
}
