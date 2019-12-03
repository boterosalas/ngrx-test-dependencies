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

  ngOnInit() {
  }

}
