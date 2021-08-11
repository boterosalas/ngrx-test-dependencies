import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-slider-works',
  templateUrl: './slider-works.component.html',
  styleUrls: ['./slider-works.component.scss'],
})
export class SliderWorksComponent implements OnInit {
  constructor() {}

  @ViewChild('slickModal', { static: false })
  slickModal: SlickCarouselComponent;
  
  slider = [
    {
      title: 'Refiere y compra en clickam en tus tiendas favoritas',
      text: 'Comienza a referir en clickam.com.co o la app de clickam y encuentra tu tienda, categoría, productos u oferta favorita.',
      image: '/assets/img/home/tarjeta-1.png',
    },
    {
      title: 'Gana hasta el 10% en comisiones.',
      text: 'Por comprar o referir los comercios aliados de clickam, los comercios aliados le pagan a clickam una comisión por enviar tráfico a sus sitios web y clickam comparte esta comisión con los usuarios.',
      image: '/assets/img/home/tarjeta-2.png',
    },
    {
      title: 'Recibe tu dinero',
      text: 'Cada 15 días, Clickam te enviará tu dinero a la cuenta Bancaria inscrita.',
      image: '/assets/img/home/tarjeta-3.png',
    },
  ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    dotClass: 'slick-dots orange',
    autoplay: false,
    autoplaySpeed: 5000,
    infinite: false,
    arrows: true,
  };

  ngOnInit() {}


  public next() {
    this.slickModal.slickNext();
  }

  public prev() {
    this.slickModal.slickPrev();
  }
}
