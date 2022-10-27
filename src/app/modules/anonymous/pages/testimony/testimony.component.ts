import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss']
})
export class TestimonyComponent implements OnInit, OnDestroy {

  testimony: any;
  private subscription: Subscription = new Subscription();

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    dotClass: 'slick-dots orange',
    autoplay: true,
    autoplaySpeed: 500000,
    infinite: true,
    arrows: false,
    variableWidth: false,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          variableWidth: false,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.getTestimony();
  }

  public getTestimony() {
    this.subscription = this.user.getTestimoniesUser().subscribe((testimony) => {
      this.testimony = testimony;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
