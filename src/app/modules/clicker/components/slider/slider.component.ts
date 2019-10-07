import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  slides = [
    {img: "assets/img/slide-home/registro.svg",  textTop: 'Regístrate', textBottom: 'Completa el formulario para registrarte'},
    {img: "assets/img/slide-home/crea.svg",  textTop: 'Crea un link', textBottom: 'Busca un producto o promoción y crea un link'},
    {img: "assets/img/slide-home/comparte.svg", textTop: 'Comparte', textBottom: 'Comparte el link donde quieras con quien quieras' }
  ];

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "dots": true,  dotClass: 'slick-dots orange', autoplay: true}

}
