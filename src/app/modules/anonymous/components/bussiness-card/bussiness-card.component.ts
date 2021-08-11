import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bussiness-card',
  templateUrl: './bussiness-card.component.html',
  styleUrls: ['./bussiness-card.component.scss'],
})
export class BussinessCardComponent implements OnInit {
  @Input() img: string;
  @Input() title: string;
  @Input() code: string;
  @Input() percent: string;

  @Output() bussiness = new EventEmitter();

  constructor() {}

  navigateBussiness() {
    this.bussiness.emit(event);
  }

  ngOnInit() {}
}
