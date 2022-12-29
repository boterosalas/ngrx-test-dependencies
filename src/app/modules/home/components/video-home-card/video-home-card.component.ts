import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-video-home-card',
  templateUrl: './video-home-card.component.html',
  styleUrls: ['./video-home-card.component.scss'],
})
export class VideoHomeCardComponent implements OnInit {
  videoHome: any = {
    url: 'https://www.google.com/?hl=es',
    img: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/20220831101916_web.jpg',
  };

  constructor() {}

  ngOnInit() {}
}
