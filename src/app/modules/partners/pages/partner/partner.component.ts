import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {

  constructor() { }

  showCashier = false;
  showPartner = false;

  ngOnInit(): void {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const tokenDecode = decode(token);

    if(tokenDecode.role === 'PARTNER') {
      this.showPartner = true;
      this.showCashier = false;
    }

    if(tokenDecode.role === 'PARTNER-CASHIER') {
      this.showPartner = false;
      this.showCashier = true;
    }

  }

}
