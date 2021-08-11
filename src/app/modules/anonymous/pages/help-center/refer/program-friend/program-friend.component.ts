import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-program-friend',
  templateUrl: './program-friend.component.html',
  styleUrls: ['./program-friend.component.scss'],
})
export class ProgramFriendComponent implements OnInit {
  amount: any;
  amountReferred: any;

  constructor() {}

  ngOnInit() {
    this.amount = localStorage.getItem('Amount');
    this.amountReferred = localStorage.getItem('AmonuntReferred');
  }
}
