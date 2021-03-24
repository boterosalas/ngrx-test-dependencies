import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-store',
  templateUrl: './app-store.component.html',
  styleUrls: ['./app-store.component.scss']
})
export class AppStoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.detectIos();
  }

  showLogo: boolean = true;

  public detectIos() {
    let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (iOS) {
      this.showLogo = false;
    }
  }

}
