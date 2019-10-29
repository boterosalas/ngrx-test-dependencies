import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent implements OnInit {

  constructor() { }
  
  @Input()dataSource;

  displayedColumns: string[] = ['identification', 'name', 'cellphone', 'email', 'origin', 'verified', 'status'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
