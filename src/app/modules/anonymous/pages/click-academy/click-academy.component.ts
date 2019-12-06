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
      document.querySelector('.mat-tab-label[aria-posinset="1"]').classList.add("gtmAcademyClicSupExitocom");
      document.querySelector('.mat-tab-label[aria-posinset="2"]').classList.add("gtmAcademyClicSupSeguros");
      document.querySelector('.mat-tab-label[aria-posinset="3"]').classList.add("gtmAcademuClicSupViajes");
    }, 1000);
  }

}
