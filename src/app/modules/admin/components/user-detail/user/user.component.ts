import { Component, Input, OnInit } from '@angular/core';
import { ActionUser } from 'src/app/interfaces/actionUser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() data: ActionUser;
  idAdmin: string;

  constructor() { }

  ngOnInit(): void {
  }

}
