import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-works-clickam',
  templateUrl: './how-works-clickam.component.html',
  styleUrls: ['./how-works-clickam.component.scss'],
})
export class HowWorksClickamComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  works = [
    {
      icon: '/assets/img/home/selecciona-negocio.svg',
      title: '1. Selecciona un negocio',
    },
    {
      icon: '/assets/img/home/elige-categoria.svg',
      title: '2. Elige una categoría o producto',
    },
    { icon: '/assets/img/home/clickea.svg', title: '3. Clickea' },
    {
      icon: '/assets/img/home/comparte-compra.svg',
      title: '4. Comparte o compra',
    },
    {
      icon: '/assets/img/home/obten-compras.svg',
      title: '5. Obtén compras efectivas',
    },
    {
      icon: '/assets/img/home/gana-comisiones.svg',
      title: '6. Gana comisiones',
    },
  ];

  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    dotClass: 'slick-dots orange',
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    arrows: false,
  };
}
