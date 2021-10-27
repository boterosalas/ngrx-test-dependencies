import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-historial',
  templateUrl: './table-historial.component.html',
  styleUrls: ['./table-historial.component.scss'],
})
export class TableHistorialComponent implements OnInit {
  constructor() {}

  @Input() dataSource;
  @Output() dataUser = new EventEmitter();
  @Input() size;
  @Input() p;
  @Input() totalItems;

  displayedColumns: string[] = ['date', 'amount', 'bank'];

  ngOnInit() {}

  userInfo(dataSource) {
    this.dataUser.emit(dataSource);
  }
}
