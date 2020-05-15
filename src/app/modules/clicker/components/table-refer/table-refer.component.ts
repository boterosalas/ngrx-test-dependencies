import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-refer',
  templateUrl: './table-refer.component.html',
  styleUrls: ['./table-refer.component.scss']
})
export class TableReferComponent implements OnInit {

  @Input()dataSource;
  @Output() dataUser = new EventEmitter;
  

  displayedColumns: string[] = ['guest', 'register', 'cualified'];

  ngOnInit() {
  }

}
