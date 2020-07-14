import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-medal",
  templateUrl: "./medal.component.html",
  styleUrls: ["./medal.component.scss"],
})
export class MedalComponent implements OnInit {
  constructor() {}

  medal = {
    classLevel: "bronze",
    class:"vendedor-innato",
    percent: "65",
    icon: "/assets/img/gamification/Icon-vendedor-innato.svg",
    level: "Plata",
    title: "Vendedor innato",
    nextLevel: "Oro",
    banner: "/assets/img/gamification/banner-vendedor-innato-pc.jpg",
    titleMission: "Generar ventas efectivas",
    missionDescription:"Que los links que compartas se hagan efectivos (Esta medalla solo aplica con links, no aplica referido por cédula)",
    detail: [
      {
        icon: '/assets/img/gamification/icon-ventas-efectivas.svg',
        title: '50 Ventas efectivas',
        description: 'a través de links, no aplica referido por cédula.',
        complete: true,
        progress: 50,
        totalProgress: 50
      },
      {
        icon: '/assets/img/gamification/icon-ventas-efectivas.svg',
        title: '500 Ventas efectivas',
        description: 'a través de links, no aplica referido por cédula.',
        complete: false,
        progress: 50,
        totalProgress: 500
      },
      {
        icon: '/assets/img/gamification/icon-ventas-efectivas.svg',
        title: '1000 Ventas efectivas',
        description: 'a través de links, no aplica referido por cédula.',
        complete: false,
        progress: 50,
        totalProgress: 1000
      }
    ]
  };

  ngOnInit() {}
}
