import { Component, OnInit, ViewChild } from "@angular/core";
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: "app-slider-works",
  templateUrl: "./slider-works.component.html",
  styleUrls: ["./slider-works.component.scss"],
})
export class SliderWorksComponent implements OnInit {
  constructor() {}

  @ViewChild("slickModal", { static: false })
  slickModal: SlickCarouselComponent;

  ngOnInit() {}

  slider = [
    {
      title: "Refiere y compra en clickam en tus tiendas favoritas",
      text:
        "Comienza a referir en clickam.com.co o la app de clickam y encuentra tu tienda, categoría, productos u oferta favorita.",
      image: "/assets/img/home/tarjeta-1.png",
    },
    {
      title: "Gana dinero por referir y comprar",
      text:
        "Clickea nuestros links, comparte, compra o refiere y gana dinero por las ventas y las compras que generen estos links.",
      image: "/assets/img/home/tarjeta-2.png",
    },
    {
      title: "Recibe tu dinero",
      text:
        "Cada 15 días, Clickam te enviará tu dinero a la cuenta Bancaria inscrita.",
      image: "/assets/img/home/tarjeta-3.png",
    }
  ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    dotClass: "slick-dots orange",
    autoplay: false,
    autoplaySpeed: 5000,
    infinite: false,
    arrows: true,
  };
  
  public next() {
    this.slickModal.slickNext();
  }
  
  public prev() {
    this.slickModal.slickPrev();
  }

}

