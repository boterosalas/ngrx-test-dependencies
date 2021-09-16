import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-onboarding-swiper',
  templateUrl: './onboarding-swiper.component.html',
  styleUrls: ['./onboarding-swiper.component.scss'],
})
export class OnboardingSwiperComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<OnboardingSwiperComponent>, public userSvc: UserService) {}
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

  slides = [];

  $onBoardingSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.$onBoardingSubscription = this.userSvc.getOnboarding().subscribe((resp: ResponseService) => {
      this.slides = resp.objectResponse;
    });
  }

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
