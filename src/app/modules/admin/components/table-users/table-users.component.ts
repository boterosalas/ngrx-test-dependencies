import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent implements OnInit {

  constructor() { }
  
  @Input()dataSource;

  displayedColumns: string[] = ['identification', 'name', 'cellphone', 'email', 'origin', 'verified', 'status'];

  ngOnInit() {
  }

}
