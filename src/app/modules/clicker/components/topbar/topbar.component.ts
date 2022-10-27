import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  showSection: boolean = true;

  ngOnInit(){
    const isMobile = /android|iphone|kindle|ipad/i.test(navigator.userAgent);
    const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    if(isMobile || !isChrome ){
      this.showSection = false;
    }
  }

}
