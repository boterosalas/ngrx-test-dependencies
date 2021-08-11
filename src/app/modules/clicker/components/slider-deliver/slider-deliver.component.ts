import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-deliver',
  templateUrl: './slider-deliver.component.html',
  styleUrls: ['./slider-deliver.component.scss'],
})
export class SliderDeliverComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    dotClass: 'slick-dots orange',
    autoplay: true,
    autoplaySpeed: 10000,
    infinite: true,
    arrows: true,
  };
  sliderWeb = ['/assets/img/deliver/web/BannerOmniMobile.png'];
  sliderMobile = [
    '/assets/img/deliver/mobile/Slider-Inicio-2-Mobile-Colchones-Paraiso.jpg',
    '/assets/img/deliver/mobile/Slider-Inicio-2-Mobile-Colchones-Paraiso.jpg',
  ];
}
