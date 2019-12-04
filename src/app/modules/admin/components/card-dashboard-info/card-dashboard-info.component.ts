import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-dashboard-info',
  templateUrl: './card-dashboard-info.component.html',
  styleUrls: ['./card-dashboard-info.component.scss']
})
export class CardDashboardInfoComponent implements OnInit {

  constructor() { }

  @Input() title:string;
  @Input() circle:string;
  @Input() aligment:string;
  @Input() icon:string;
  @Input() dataNumber:string;
  @Input() dataNumberBottom:string = '';
  @Input() cifer:string;
  @Input() textData:string;
  @Input() cifer2:string;
  @Input() cifer3:string;
  @Input() textData2:string;
  @Input() cifer4:string;
  @Input() textData4:string;
  @Input() cifer5:string;
  @Input() textData5:string;
  @Input() iconClass:string;
  @Input() textBottomCard:string;
  @Input() links:boolean = false;

  ngOnInit() {
  }

}
