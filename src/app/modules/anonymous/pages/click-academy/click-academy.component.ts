import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-click-academy',
  templateUrl: './click-academy.component.html',
  styleUrls: ['./click-academy.component.scss']
})
export class ClickAcademyComponent implements OnInit {

  pdf:string;

  constructor(
  ) { }

  ngOnInit() {
    setTimeout(() => {
      document.querySelector('.mat-tab-label[aria-posinset="1"]').classList.add("gtmClicAcademyClicExitocom");
      document.querySelector('.mat-tab-label[aria-posinset="2"]').classList.add("gtmClicAcademyClicSeguros");
      document.querySelector('.mat-tab-label[aria-posinset="3"]').classList.add("gtmClicAcademyClicViajes");
    }, 1000);
    this.pdf = environment.PDF;
  }

}
