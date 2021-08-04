import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-dialog-stories',
  templateUrl: './dialog-stories.component.html',
  styleUrls: ['./dialog-stories.component.scss']
})
export class DialogStoriesComponent implements OnInit {
  @ViewChild('slickModalStories', { static: false }) slickModal: SlickCarouselComponent;

  slideConfig: {}
  showArrowLeft: boolean = true;
  showArrowRight: boolean = true;
  startTime: any;
  showArrows: boolean;
  nextEnabled: boolean = true;
  stories:string

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.stories = this.data.storiesBusiness ? "storiesBusiness" : "stories"

    this.slideConfig = {
      slidesToShow: this.data[this.stories].length <= 1 ? 1 : 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "40px",
      focusOnSelect: true,
      dots: false, 
      autoplay: false, 
      infinite: false, 
      arrows: false,
      draggable: false,
      responsive: [
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 1,
            centerPadding: "0"
          }
        }
      ]
    }
    this.showArrowRight = this.showArrowLeft = this.data["stories"].length <= 1 ? false : true
    this.showArrows = this.data.showArrows
  }

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    console.log(this.data);
  }

  onNoClick(): void {
    if (this.data.showCarousel) {
      const current = this.getCurrentSlick()
      this.pause(Number.parseInt(current.getAttribute("data-slick-index")))
    } else {
      this.pause(this.data.id)
    }

    this.dialogRef.close()
  }

  slickInit(e) {
    setTimeout(() => this.initSlickGoTo().then(slickModal => slickModal.slickGoTo(this.data.id)), 0)
  }

  async initSlickGoTo() {
    return await this.slickModal
  }

  afterChange(e) {
    this.reproduce(e.currentSlide)
  }

  beforeChange(e) {
    this.data.id = e.nextSlide
    this.nextEnabled = e.nextSlide >= (this.data[this.stories].length - 1) ? false : true

    if (this.nextEnabled) this.pause(e.currentSlide)

    const slickTrack = document.querySelector(".modal-stories .slick-list .slick-track")
    const slicks = slickTrack.querySelectorAll(".card.slick-slide")

    if (slicks) {
      slicks.forEach(element => {
        let dataSlickIndex: number = Number.parseInt(element.getAttribute("data-slick-index"))
        if (element.classList.contains("next-prev-slick")) element.classList.remove("next-prev-slick")

        if (dataSlickIndex < e.nextSlide && !element.classList.contains("prev-slick")) {
          element.classList.add("prev-slick")
        }

        if (dataSlickIndex === (e.nextSlide - 1) && !element.classList.contains("next-prev-slick")) element.classList.add("next-prev-slick")

        if (dataSlickIndex >= e.nextSlide && element.classList.contains("prev-slick")) {
          element.classList.remove("prev-slick")
        }
      });
    }
  }

  public filterStoriesBusiness(idBusiness) {
    return this.data.stories.filter(story => story.idbusiness === idBusiness)
  }

  public next() {
    if (this.nextEnabled) this.slickModal.slickNext();
  }

  public prev() {
    this.slickModal.slickPrev();
  }

  public pause(index) {
    if (this.data[this.stories][index]) this.data[this.stories][index].pause = true
  }

  public reproduce(index) {
    this.data[this.stories][index].pause = false
  }

  private getCurrentSlick() {
    return document.querySelector(".modal-stories .slick-slide.slick-center")
  }

  public nextOrClose(index) {
    if (index === (this.data[this.stories].length - 1)) {
      this.onNoClick()
    } else {
      this.next()
    }
  }
}
