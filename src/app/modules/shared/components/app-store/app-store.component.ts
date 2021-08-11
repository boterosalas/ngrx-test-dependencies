import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-store',
  templateUrl: './app-store.component.html',
  styleUrls: ['./app-store.component.scss'],
})
export class AppStoreComponent implements OnInit {
  constructor() {}

  showLogo = true;
  
  ngOnInit() {
    this.detectIos();
  }


  public detectIos() {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (iOS) {
      this.showLogo = false;
    }
  }
}
