import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-bussiness',
  templateUrl: './table-bussiness.component.html',
  styleUrls: ['./table-bussiness.component.scss']
})
export class TableBussinessComponent implements OnInit {

  constructor() { }

  @Input() dataSource;  

  displayedColumns: string[] = ['bussiness'];
  displayedColumns2: string[] = ['linksGenerated', 'linksClicked', 'commission','total'];

  ngOnInit() {
  }

}
