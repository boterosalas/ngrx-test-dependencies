import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-bar',
  templateUrl: './widget-bar.component.html',
  styleUrls: ['./widget-bar.component.scss']
})
export class WidgetBarComponent implements OnInit {

  showBar = true;
  showCond:any;
  
  constructor() { }
  
  ngOnInit(): void {
    this.showCond = localStorage.getItem('bar');
    if(this.showCond === 'no') {
      this.showBar = false;
    } else {
      this.showBar = true;
    }
  }

  close(){
    this.showBar = false;
    localStorage.setItem( 'bar', 'no');
  }

}
