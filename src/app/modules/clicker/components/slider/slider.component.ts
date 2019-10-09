import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor(private content: ContentService) { }

  ngOnInit() {
    this.slider();
  }

  slides = [];

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "dots": true,  dotClass: 'slick-dots orange', autoplay: true, autoplaySpeed: 5000}

  public slider() {
    this.content.getNews().subscribe(slide=> {
      this.slides = slide;
    });
  }

}
