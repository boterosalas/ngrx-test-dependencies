import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-business-allies',
  templateUrl: './business-allies.component.html',
  styleUrls: ['./business-allies.component.scss']
})
export class BusinessAlliesComponent implements OnInit, OnDestroy {
  bussiness = [];

  slideConfig = {
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: false,
    dotClass: 'slick-dots orange',
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    arrows: true,
    variableWidth: false,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          variableWidth: true,
        },
      },
    ],
  };


  constructor(private content: ContentService) { }

  private subscription = new Subscription();

  ngOnInit(): void {
    this.getBussiness();
  }

  public getBussiness() {
    this.subscription = this.content
      .getBusiness().subscribe((bussiness) => {
        this.bussiness = bussiness;
      });
  }

  public openForm() {}

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
