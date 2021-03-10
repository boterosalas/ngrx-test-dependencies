import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-icons-clickam',
  templateUrl: './report-icons-clickam.component.html',
  styleUrls: ['./report-icons-clickam.component.scss']
})
export class ReportIconsClickamComponent implements OnInit {

  contactUs = [
    {
      name: "Reportar novedad",
      route:
        "/centro-de-ayuda/reportar/novedad",
      icon: "/assets/img/ayuda/reportar-novedad/icon-reportar-novedad.svg"
    },
    {
      name: "Estado de novedades",
      route:
        "/centro-de-ayuda/reportar/estado-novedades",
      icon: "/assets/img/ayuda/reportar-novedad/icon-reportar-novedad.svg"
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
