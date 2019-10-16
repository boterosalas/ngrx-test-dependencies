import { Component, OnInit, HostListener } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {

  constructor(private utils: UtilsService) { }

  ngOnInit() {
    
  }

  /**
   * configuracion del slider, para mas info ir a https://kenwheeler.github.io/slick/, https://www.npmjs.com/package/ngx-slick-carousel
   */

  slides = [
    {img: "assets/img/slide-home/registro.svg",  textTop: 'Regístrate', textBottom: 'Completa el formulario para registrarte'},
    {img: "assets/img/slide-home/crea.svg",  textTop: 'Crea un link', textBottom: 'Busca un producto o promoción y crea un link'},
    {img: "assets/img/slide-home/comparte.svg", textTop: 'Comparte', textBottom: 'Comparte el link donde quieras con quien quieras' }
  ];

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "dots": true,  dotClass: 'slick-dots orange', autoplay: true}
  slideConfigMobile = {"slidesToShow": 3, "slidesToScroll": 1, "dots": false,  dotClass: 'slick-dots orange', autoplay: true}

  @HostListener('over')
  openRegister() {
    this.utils.showRegisterForm();
  }

}
