import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-activate-business',
  templateUrl: './table-activate-business.component.html',
  styleUrls: ['./table-activate-business.component.scss']
})
export class TableActivateBusinessComponent implements OnInit {

  constructor() { }

  @Input() dataSource;  
  @Output() activateBusiness = new EventEmitter;

  displayedColumns: string[] = ['bussiness', 'activate'];

  ngOnInit() {
  }

  activate(dataSource){
    this.activateBusiness.emit(dataSource);
  }


}
