import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent implements OnInit {

  constructor() { }
  
  @Input()dataSource;
  @Output() dataUser = new EventEmitter;
  @Output() sortDataUser = new EventEmitter;
  

  displayedColumns: string[] = ['identification', 'cellphone', 'email', 'subscription', 'firstsale' ,'origin', 'comunication', 'verified', 'status'];

  ngOnInit() {
  }

  userInfo(dataSource){
    this.dataUser.emit(dataSource);
  }

  sortData(event) {
    this.sortDataUser.emit(event);
  }

}
