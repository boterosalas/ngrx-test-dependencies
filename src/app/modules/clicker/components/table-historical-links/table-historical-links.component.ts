import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-historical-links',
  templateUrl: './table-historical-links.component.html',
  styleUrls: ['./table-historical-links.component.scss']
})
export class TableHistoricalLinksComponent implements OnInit {

  @Input()dataSource;
  @Output() dataUser = new EventEmitter;
  @Output() dataEmail = new EventEmitter;

  displayedColumns: string[] = ['link','date', 'comission', 'total', 'button'];

  ngOnInit() {
  }

  userInfo(dataSource){
    this.dataUser.emit(dataSource);
  }

}
