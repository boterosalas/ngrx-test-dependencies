import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {

  constructor(private content: ContentService) { }

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.slider();
  }

  slides: any = [];

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "dots": true, centerMode: true,
  centerPadding: '40px', dotClass: 'slick-dots orange', autoplay: true, autoplaySpeed: 5000, infinite: false}

  public slider() {
    this.subscription = this.content.getNews().subscribe((slide: any)=> {
      this.slides = slide;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
