import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refer-friend',
  templateUrl: './refer-friend.component.html',
  styleUrls: ['./refer-friend.component.scss'],
})
export class ReferFriendComponent implements OnInit {
  refer = [
    {
      name: '¿Qué es el programa refiere a tu amigo?',
      route:
        '/centro-de-ayuda/refiere-a-un-amigo/que-es-el-programa-refiere-a-tu-amigo',
      icon: '/assets/img/ayuda/refiere-un-amigo/refiere-tu-amigo.svg',
    },
    {
      name: '¿Cómo funciona el programa?',
      route: "/centro-de-ayuda/refiere-a-un-amigo/como-funciona-el-programa'",
      icon: '/assets/img/ayuda/refiere-un-amigo/como-funciona.svg',
    },
    {
      name: '¿Cuántos amigos puedo invitar?',
      route: '/centro-de-ayuda/refiere-a-un-amigo/cuantos-amigos-puedo-invitar',
      icon: '/assets/img/ayuda/refiere-un-amigo/invitar-amigo.svg',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
