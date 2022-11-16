import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FiendlyUrl } from 'src/app/helpers/friendly-url';

@Component({
  selector: 'app-bussiness-card',
  templateUrl: './bussiness-card.component.html',
  styleUrls: ['./bussiness-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BussinessCardComponent implements OnInit {
  @Input() img: string;
  @Input() title: string;
  @Input() description: string;
  @Input() code: string;
  @Input() percent: string;
  @Input() infomarketing: string;
  @Input() phygital: boolean;

  @Output() bussiness = new EventEmitter();

  constructor() {}

  navigateBussiness() {
    this.bussiness.emit();
  }

  ngOnInit() {}
}
