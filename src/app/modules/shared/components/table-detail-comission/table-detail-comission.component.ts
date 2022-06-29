import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-detail-comission',
  templateUrl: './table-detail-comission.component.html',
  styleUrls: ['./table-detail-comission.component.scss'],
})
export class TableDetailComissionComponent implements OnInit {
  constructor() {}

  @Input() dataSource;
  @Output() dataUser = new EventEmitter();

  displayedColumns: string[] = ['date', 'business','product', 'state', 'quantity', 'commission'];

  ngOnInit() {}

  userInfo(dataSource) {
    this.dataUser.emit(dataSource);
  }
}
