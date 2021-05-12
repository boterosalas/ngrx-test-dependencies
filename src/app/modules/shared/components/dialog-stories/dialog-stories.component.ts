import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-dialog-stories',
  templateUrl: './dialog-stories.component.html',
  styleUrls: ['./dialog-stories.component.scss']
})
export class DialogStoriesComponent implements OnInit {
  @Input() showArrows: boolean = true;
  @ViewChild('slickModalStories', { static: false }) slickModal: SlickCarouselComponent;

  slideConfig: {}
  showArrowLeft: boolean = true;
  showArrowRight: boolean = true;
  startTime: any;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.slideConfig = {
      slidesToShow: this.data.stories.length <= 1 ? 1 : 3,
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
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.slickModal.unslick()
    this.dialogRef.close()
  }

  slickInit(e) {
    this.initSlickGoTo().then(slickModal => slickModal.slickGoTo(this.data.id))
    this.addEventPauseAndPlay()
  }

  async initSlickGoTo() {
    return await this.slickModal
  }

  afterChange(e) {
    this.reproduce(e.currentSlide)
  }

  beforeChange(e) {
    this.pause(e.currentSlide)
    this.showArrowLeft = e.nextSlide === 0 ? false : true

    const slickTrack = document.querySelector(".modal-stories .slick-list .slick-track")
    const slicks = slickTrack.querySelectorAll(".slick-slide")

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

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

  private pause(index) {
    this.data.stories[index].pause = true
  }

  private reproduce(index) {
    this.data.stories[index].pause = false
  }

  private reproduceOrNext(index, timeElapsed) {
    if (timeElapsed > 250) { // Tiempo transcurrido en ms
      this.reproduce(index)
    } else {
      this.pause(index)
      this.next()
    }
  }

  private getCurrentSlick() {
    return document.querySelector(".modal-stories .slick-slide.slick-center")
  }

  private addEventPauseAndPlay() {
    if (window.screen.width >= 550) {
      for (let index = 0; index < this.data.stories.length; index++) {
        const card = document.getElementById(index.toString());
        
        if (card) {
          card.onpointerdown = e => {
            const current = this.getCurrentSlick()
            if (Number.parseInt(current.getAttribute("data-slick-index")) === index) this.pause(index)
            
            e.preventDefault()
          }
      
          card.onpointerup = e => {
            const current = this.getCurrentSlick()
            if (Number.parseInt(current.getAttribute("data-slick-index")) === index) this.reproduce(index)

            e.preventDefault()
          }
        }
      }
    }

    const arrowPrev = document.getElementById("arrow-prev")

    arrowPrev.onpointerup = e => {
      const current = this.getCurrentSlick()

      this.pause(Number.parseInt(current.getAttribute("data-slick-index")))
      this.prev()
      e.preventDefault()
    }

    const arrowNext = document.getElementById("arrow-next")
    let startTime, endTime;

    arrowNext.onpointerdown = e => {
      startTime = new Date();
      const current = this.getCurrentSlick()

      this.pause(Number.parseInt(current.getAttribute("data-slick-index")))
      e.preventDefault()
    }

    arrowNext.onpointerup = e => {
      endTime = new Date();
      let timeDiff = endTime - startTime
      const current = this.getCurrentSlick()

      this.reproduceOrNext(Number.parseInt(current.getAttribute("data-slick-index")), timeDiff)
      e.preventDefault()
    }
  }

  public nextOrClose(index) {
    this.pause(index)
    if (index === (this.data.stories.length - 1)) {
      this.onNoClick()
    } else {
      this.next()
    }
  }
}
