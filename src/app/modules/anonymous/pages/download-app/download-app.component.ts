import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationHref } from 'src/app/helpers/window-location';

@Component({
  selector: 'app-download-app',
  templateUrl: './download-app.component.html',
  styleUrls: ['./download-app.component.scss'],
})
export class DownloadAppComponent implements OnInit {
  constructor(private router: Router) {}

  userAgent = navigator.userAgent.toLowerCase();
  ngOnInit(): void {
    const appStore = 'https://apps.apple.com/co/app/clickam/id1495823258';
    const playStore = 'https://play.google.com/store/apps/details?id=com.clickam.appcompania';

    if (/iphone|ipad|phone/i.test(this.userAgent)) {
      LocationHref.redirect(appStore);
    } else if (/android|x11/i.test(this.userAgent)) {
      LocationHref.redirect(playStore);
    } else {
      this.router.navigateByUrl('/inicio');
    }
  }

  redirectTo(url: string){
    window.location.href = url;
  }
}
