import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-app-store',
  templateUrl: './app-store.component.html',
  styleUrls: ['./app-store.component.scss'],
})
export class AppStoreComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  showLogo = true;

  ngOnInit() {
    this.detectIos();
  }


  public detectIos() {
    if (isPlatformBrowser(this.platformId)) {
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (iOS) {
        this.showLogo = false;
      }
    }
  }
}
