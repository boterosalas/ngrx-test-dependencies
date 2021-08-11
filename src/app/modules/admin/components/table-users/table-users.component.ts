import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
})
export class TableUsersComponent implements OnInit {
  constructor() {}

  @Input() dataSource;
  @Output() dataUser = new EventEmitter();
  @Output() dataEmail = new EventEmitter();
  @Output() sortDataUser = new EventEmitter();
  @Input() size;
  @Input() p;
  @Input() totalItems;

  infoUpdate = {};

  displayedColumns: string[] = [
    'identification',
    'idclicker',
    'cellphone',
    'email',
    'subscription',
    'firstsale',
    'origin',
    'comunication',
    'verified',
    'status',
  ];

  ngOnInit() {}

  userInfo(dataSource) {
    this.dataUser.emit(dataSource);
  }

  userEmail(dataSource) {
    this.infoUpdate = {
      userId: dataSource.userId,
      email: dataSource.email,
    };
    this.dataEmail.emit(this.infoUpdate);
  }

  sortData(event) {
    this.sortDataUser.emit(event);
  }
}
