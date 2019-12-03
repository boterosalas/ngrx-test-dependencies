import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-click-academy',
  templateUrl: './click-academy.component.html',
  styleUrls: ['./click-academy.component.scss']
})
export class ClickAcademyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      document.querySelector('#mat-tab-label-0-0').classList.add("gtmAcademyClicSupExitocom");
      document.querySelector('#mat-tab-label-0-1').classList.add("gtmAcademyClicSupSeguros");
      document.querySelector('#mat-tab-label-0-2').classList.add("gtmAcademuClicSupViajes");
    }, 1000);
  }

}
