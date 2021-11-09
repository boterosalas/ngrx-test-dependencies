import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-slide-testimonials',
  templateUrl: './slide-testimonials.component.html',
  styleUrls: ['./slide-testimonials.component.scss']
})
export class SlideTestimonialsComponent implements OnInit {

  @ViewChild('slickModal', { static: false })
  slickModal: SlickCarouselComponent;
  video: any;

  @Input() slideConfig: object;
  @Input() slider: Array<any>;


  constructor() { }

  ngOnInit(): void {
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

}
