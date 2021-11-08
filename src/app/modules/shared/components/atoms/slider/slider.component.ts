import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-slider-share',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @ViewChild('slickModal', { static: false })
  slickModal: SlickCarouselComponent;
  video: any;

  @Input() slideConfig: object;
  @Input() slider: Array<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
