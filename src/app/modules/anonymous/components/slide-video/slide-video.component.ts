import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { SlickCarouselComponent } from "ngx-slick-carousel";
import { MatDialog } from "@angular/material";
import { ModalGenericComponent } from "src/app/modules/shared/components/modal-generic/modal-generic.component";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-slide-video",
  templateUrl: "./slide-video.component.html",
  styleUrls: ["./slide-video.component.scss"],
})
export class SlideVideoComponent implements OnInit {
  @ViewChild("slickModal", { static: false })
  slickModal: SlickCarouselComponent;
  @ViewChild("templateVideo", { static: false }) templateVideo: TemplateRef<
    any
  >;
  video: any;

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    dotClass: "slick-dots orange",
    autoplay: false,
    autoplaySpeed: 5000,
    infinite: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  sliderVideo = [
    {
      id:'video0',
      title: "¿Cómo me registro en clickam?",
      description: "Aprende cómo registrarte en la plataforma.",
      img: "/assets/img/video/registro.jpg",
      video: "cD-9xyZeT2Y?rel=0&amp;autoplay=1",
    },
    {
      id:'video1',
      title: "¿Cómo refiero en clickam?",
      description: "Aprende a generar ingresos por clickear.",
      img: "/assets/img/video/referir.jpg",
      video: "oR5bFl4PoCM?rel=0&amp;autoplay=1",
    },
    {
      id:'video2',
      title: "¿Cómo ver el historial de links?",
      description: "Aprende cuales son los links que más ganancias te generan y que tu público más visita.",
      img: "/assets/img/video/historial.jpg",
      video: "8RMdatgfaoU?rel=0&amp;autoplay=1",
    },
    {
      id:'video3',
      title: "¿Cómo ver los reportes de clickam?",
      description: "Aprende a leer los reportes, visualiza tu dinero y sigue ganando.",
      img: "/assets/img/video/reportes.jpg",
      video: "qd1eb38ypjk?rel=0&amp;autoplay=1",
    }
  ];

  constructor(
    private dialog: MatDialog, 
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
    ) {
      this.route.queryParams.subscribe(param => {
        let idVideoRoute = param.video;
        this.sliderVideo.forEach(element => {
          let videoIdArray = element.id;
          if(idVideoRoute === videoIdArray) {
            setTimeout(() => {
              let selectVideo = document.querySelector(`#${idVideoRoute}`);
              selectVideo.dispatchEvent(new Event('click'));
            }, 500);
          }
        });
      })
    }

  ngOnInit() {}

  public next() {
    this.slickModal.slickNext();
    // console.log(this.slickModal);
  }

  public prev() {
    this.slickModal.slickPrev();
  }

  openVideo(data) {
    const id = "video-modal";
    const template = this.templateVideo;
    const title = "";
    this.video = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + data.video);

    this.dialog.open(ModalGenericComponent, {
      panelClass: "video-clickacademy",
      data: {
        id,
        title,
        template,
      },
    });
  }
}
