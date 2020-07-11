import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {

  medals = [
    {
      classLevel:'bronze',
      percent:'20',
      icon: '/assets/img/gamification/Icon-perfil-completo.svg',
      level: 'Bronce',
      title: 'Perfil completo',
      nextLevel: 'plata'
     },
    {
      classLevel:'silver',
      percent:'85',
      icon: '/assets/img/gamification/Icon-comprador-inteligente.svg',
      level: 'Plata',
      title: 'Comprador inteligente',
      nextLevel: 'Oro'
     },
    {
      classLevel:'silver',
      percent:'66',
      icon: '/assets/img/gamification/Icon-vendedor-innato.svg',
      level: 'Plata',
      title: 'Vendedor innato',
      nextLevel: 'Oro'
     },
    {
      classLevel:'gold',
      percent:'100',
      icon: '/assets/img/gamification/Icon-reclutador-estrella.svg',
      level: 'Oro',
      title: 'Reclutador estrella',
      nextLevel: 'Último nivel'
     }
  ]

  constructor() { }

  ngOnInit() {
  }

}
