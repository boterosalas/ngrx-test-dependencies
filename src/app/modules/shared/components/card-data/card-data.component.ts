import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.scss'],
})
export class CardDataComponent implements OnInit {
  constructor() {}

  @Input() number: string;
  @Input() text: string;
  @Input() textToolTip: string;
  @Input() Classborder: string;
  @Input() Classtag: string;
  @Input() classCard: string;
  @Input() imgCard: string;
  @Input() totalLinks: number;
  @Input() totalProducts: number;
  @Input() showIcon = true;
  @Input() direction = 'column';

  @Input() total: boolean;
  @Output() openDetail = new EventEmitter();

  ngOnInit() {}

  public detail() {
    this.openDetail.emit();
  }
}
