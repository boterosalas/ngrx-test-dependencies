import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-historical-links',
  templateUrl: './table-historical-links.component.html',
  styleUrls: ['./table-historical-links.component.scss'],
})
export class TableHistoricalLinksComponent implements OnInit {
  @Input() dataSource;
  @Output() dataUser = new EventEmitter();
  @Output() product = new EventEmitter();
  @Input() size;
  @Input() p;
  @Input() totalItems;

  displayedColumns: string[] = [
    'productname',
    'date',
    'comission',
    'total',
    'visits',
    'button',
  ];

  ngOnInit() {}

  userInfo(dataSource) {
    this.dataUser.emit(dataSource);
  }

  infoProduct(dataSource) {
    this.product.emit(dataSource);
  }
}
