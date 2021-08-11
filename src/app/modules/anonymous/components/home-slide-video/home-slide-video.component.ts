import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home-slide-video',
  templateUrl: './home-slide-video.component.html',
  styleUrls: ['./home-slide-video.component.scss'],
})
export class HomeSlideVideoComponent implements OnInit {
  @ViewChild('slickModal', { static: false })
  slickModal: SlickCarouselComponent;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    dotClass: 'slick-dots orange',
    autoplay: false,
    autoplaySpeed: 5000,
    infinite: false,
    arrows: false,
  };

  sliderVideo = [
    {
      id: 'video0',
      title: '¿Cómo me registro en clickam?',
      description: 'Aprende cómo registrarte en la plataforma.',
      img: '/assets/img/video/registro.jpg',
      video: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/cD-9xyZeT2Y?rel=0&amp'),
    },
    {
      id: 'video1',
      title: '¿Cómo refiero en clickam?',
      description: 'Aprende a generar ingresos por clickear.',
      img: '/assets/img/video/referir.jpg',
      video: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/oR5bFl4PoCM?rel=0&amp'),
    },
    {
      id: 'video2',
      title: '¿Cómo ver el historial de links?',
      description: 'Aprende cuales son los links que más ganancias te generan y que tu público más visita.',
      img: '/assets/img/video/historial.jpg',
      video: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/8RMdatgfaoU?rel=0&amp'),
    },
    {
      id: 'video3',
      title: '¿Cómo ver los reportes de clickam?',
      description: 'Aprende a leer los reportes, visualiza tu dinero y sigue ganando.',
      img: '/assets/img/video/reportes.jpg',
      video: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/qd1eb38ypjk?rel=0&amp'),
    },
  ];

  public next() {
    this.slickModal.slickNext();
  }

  public prev() {
    this.slickModal.slickPrev();
  }
}
