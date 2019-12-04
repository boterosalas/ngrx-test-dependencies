import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss']
})
export class CardDashboardComponent implements OnInit {

  constructor() { }

  @Input() title:string;
  @Input() circle:string;
  @Input() aligment:string;
  @Input() icon:string;
  @Input() dataNumber:string;
  @Input() cifer:string;
  @Input() textData:string;
  @Input() cifer2:string;
  @Input() textData2:string;


  ngOnInit() {
  }

}
