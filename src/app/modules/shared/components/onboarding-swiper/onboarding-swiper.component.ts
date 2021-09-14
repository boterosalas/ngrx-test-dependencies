import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-onboarding-swiper',
  templateUrl: './onboarding-swiper.component.html',
  styleUrls: ['./onboarding-swiper.component.scss'],
})
export class OnboardingSwiperComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<OnboardingSwiperComponent>) {}
  @ViewChild('slickModal', { static: false })
  slickModal: SlickCarouselComponent;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    dotClass: 'slick-dots orange',
    infinite: false,
    arrows: true,
  };

  slides = [
    { img: '/assets/img/clickam-horizontal.jpg', actions: [] },
    { img: '/assets/img/clickam-horizontal.jpg', actions: [] },
    {
      img: '/assets/img/clickam-horizontal.jpg',
      actions: [
        { title: 'Ver video', url: 'https://www.youtube.com/embed/cD-9xyZeT2Y?rel=0&amp' },
        { title: 'Ver imagen', url: 'https://www.youtube.com/embed/cD-9xyZeT2Y?rel=0&amp' },
      ],
    },
  ];

  ngOnInit() {}

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
