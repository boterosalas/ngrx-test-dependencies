import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bussiness-card',
  templateUrl: './bussiness-card.component.html',
  styleUrls: ['./bussiness-card.component.scss']
})
export class BussinessCardComponent implements OnInit {

  @Input() img: string;
  @Input() title: string;
  @Input() percent: string;

  constructor() { }

  ngOnInit() {
  }

}
