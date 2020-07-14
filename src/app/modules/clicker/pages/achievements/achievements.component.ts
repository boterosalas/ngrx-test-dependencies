import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: "app-achievements",
  templateUrl: "./achievements.component.html",
  styleUrls: ["./achievements.component.scss"],
})
export class AchievementsComponent implements OnInit {
  medals = [
    {
      classLevel: "bronze",
      percent: 35,
      icon: "/assets/img/gamification/Icon-perfil-completo.svg",
      level: "Bronce",
      title: "Perfil Completo",
      nextLevel: "Oro",
      titleMission: "Completar tu perfil al 100%",
      banner: "/assets/img/gamification/banner-perfil-completo-pc.jpg",
      class: "perfil-completo",
      missionDescription:
        "Así podamos hacer los pagos de forma correcta y podamos compartir contigo los productos y servicios mas afines a ti y así puedas ganar más dinero.",
      detail: [
        {
          icon: "/assets/img/gamification/Icon-cuenta.svg",
          title: "Cuenta",
          description: "Completa la información básica de tu cuenta",
          complete: true,
          progress: 5,
          totalProgress: 5,
        },
        {
          icon: "/assets/img/gamification/icon-informacion-bancaria.svg",
          title: "Información Bancaria",
          description:
            "Completa los datos bancarios para consignar tu comisión",
          complete: false,
          progress: 0,
          totalProgress: 9,
        },
        {
          icon: "/assets/img/gamification/icon-informacion-adicional.svg",
          title: "Información Adicional",
          description:
            "Completa esta información para el funcionamiento de tu cuenta",
          complete: false,
          progress: 4,
          totalProgress: 12,
        },
      ],
    },
    {
      id: "1",
      classLevel: "silver",
      percent: "85",
      icon: "/assets/img/gamification/Icon-comprador-inteligente.svg",
      level: "Plata",
      title: "Comprador inteligente",
      nextLevel: "Oro",
      class: "comprador-inteligente",
    },
    {
      id: "2",
      classLevel: "silver",
      percent: "66",
      icon: "/assets/img/gamification/Icon-vendedor-innato.svg",
      level: "Plata",
      title: "Vendedor innato",
      nextLevel: "Oro",
    },
    {
      id: "3",
      classLevel: "gold",
      percent: "100",
      icon: "/assets/img/gamification/Icon-reclutador-estrella.svg",
      level: "Oro",
      title: "Reclutador estrella",
      nextLevel: "Último nivel",
    },
  ];

  constructor(private router: Router, private util: UtilsService) {}

  ngOnInit() {}

  goToMedal(medal: any) {
    this.router.navigate(["/medalla/" + medal.class ]);
    this.util.medals = medal;
  }

}
