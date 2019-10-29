import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users = [
    {identification: '123456789', name: 'David', cellphone: '123456789', email: 'david.betancur@pragma.com.co', verified:'No', origin: 'externo', status: true},
    {identification: '123456789', name: 'David', cellphone: '123456789', email: 'david.betancur@pragma.com.co', verified:'No', origin: 'interno', status: false},
    {identification: '123456789', name: 'David', cellphone: '123456789', email: 'david.betancur@pragma.com.co', verified:'Si', origin: 'externo', status: true},
    {identification: '123456789', name: 'David', cellphone: '123456789', email: 'david.betancur@pragma.com.co', verified:'No', origin: 'interno', status: false},
    {identification: '123456789', name: 'David', cellphone: '123456789', email: 'david.betancur@pragma.com.co', verified:'No', origin: 'interno', status: false},
    {identification: '123456789', name: 'David', cellphone: '123456789', email: 'david.betancur@pragma.com.co', verified:'No', origin: 'interno', status: false},
  ]

  dataSource = new MatTableDataSource<any>(this.users)

  constructor() { 
   
  }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
