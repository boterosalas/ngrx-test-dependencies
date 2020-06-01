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
      title: "Clickeando las renovaciones",
      description: "Aprende a cómo hacer seguimiento a tus renovaciones",
      img: "/assets/img/video/ejemplo.png",
      video: "https://www.youtube.com/embed/pWK0PApymSI?rel=0&amp;autoplay=1",
    },
    {
      id:'video1',
      title: "Clickeando las renovaciones 2",
      description: "Aprende a cómo hacer seguimiento a tus renovaciones",
      img: "/assets/img/video/ejemplo.png",
      video: "https://www.youtube.com/embed/xcSK4-Hrjic?rel=0&amp;autoplay=1",
    },
    {
      id:'video2',
      title: "Clickeando las renovaciones 3",
      description: "Aprende a cómo hacer seguimiento a tus renovaciones",
      img: "/assets/img/video/ejemplo.png",
      video: "https://www.youtube.com/embed/pWK0PApymSI?rel=0&amp;autoplay=1",
    },
    {
      id:'video3',
      title: "Clickeando las renovaciones 4",
      description: "Aprende a cómo hacer seguimiento a tus renovaciones",
      img: "/assets/img/video/ejemplo.png",
      video: "https://www.youtube.com/embed/pWK0PApymSI?rel=0&amp;autoplay=1",
    },
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
    this.video = this.sanitizer.bypassSecurityTrustResourceUrl(data.video);

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
