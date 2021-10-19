import { Component, Input, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/interfaces/bank-account';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent implements OnInit {

  @Input() data: BankAccount;

  constructor() { }

  ngOnInit(): void {
  }

}
