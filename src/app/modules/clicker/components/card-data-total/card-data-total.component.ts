import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-data-total',
  templateUrl: './card-data-total.component.html',
  styleUrls: ['./card-data-total.component.scss']
})
export class CardDataTotalComponent implements OnInit {

  constructor() { }

  @Input() number: string;
  @Input() text: string;
  @Input() textToolTip: string;
  @Input() Classborder: string;
  @Input() Classtag: string;
  @Input() classCard: string;
  @Input() imgCard: string;
  @Input() totalLinks: number;
  @Input() totalProducts: number;
  @Input() conversionRate: number;

  @Input() total: boolean;
  @Output() openDetail = new EventEmitter;

  ngOnInit() {

  }


  public detail() {
    this.openDetail.emit();
  }

}
