import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ContentService } from 'src/app/services/content.service';
import { Subscription } from "rxjs";
import { ResponseService } from "src/app/interfaces/response";

@Component({
  selector: 'app-dialog-stories',
  templateUrl: './dialog-stories.component.html',
  styleUrls: ['./dialog-stories.component.scss']
})
export class DialogStoriesComponent implements OnInit {
  //@Input() showArrows: boolean = true;
  @ViewChild('slickModalStories', { static: false }) slickModal: SlickCarouselComponent;

  slideConfig: {}
  showArrowLeft: boolean = true;
  showArrowRight: boolean = true;
  startTime: any;
  showArrows: boolean;
  nextEnabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private content: ContentService
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
    this.showArrowRight = this.showArrowLeft = this.data.stories.length <= 1 ? false : true
    this.showArrows = this.data.showArrows
  }

  private subscription: Subscription = new Subscription();

  ngOnInit() {}

  ngAfterViewInit() {
    if (!this.data.showCarousel) this.addEventPauseAndPlay()
  }

  onNoClick(): void {
    if (this.data.showCarousel) {
      const current = this.getCurrentSlick()
      this.pause(Number.parseInt(current.getAttribute("data-slick-index")))
      
      //this.slickModal.unslick()
    } else {
      this.pause(this.data.id)
    }

    this.dialogRef.close()
  }

  slickInit(e) {
    setTimeout(() => this.initSlickGoTo().then(slickModal => slickModal.slickGoTo(this.data.id)), 0)
    this.addEventPauseAndPlay()
  }

  async initSlickGoTo() {
    return await this.slickModal
  }

  afterChange(e) {
    this.reproduce(e.currentSlide)
  }

  beforeChange(e) {
    if (this.data.userId) this.saveVisitStories(e.nextSlide)
    this.nextEnabled = e.nextSlide >= (this.data.stories.length - 1) ? false : true

    if (this.nextEnabled) this.pause(e.currentSlide)

    this.showArrowLeft = e.nextSlide === 0 ? false : true

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

  public saveVisitStories(index) {
    if (this.data.stories[index].stateView) {
      const data = {
        idStory: this.data.stories[index].id,
        userId: this.data.userId
      }

      this.subscription = this.content.saveVisitStories(data).subscribe((resp: ResponseService) => {
        if (resp.state === "Success") {
          this.data.stories[index].state = false
        }
      })
    }
  }

  public next() {
    if (this.nextEnabled) this.slickModal.slickNext();
  }

  public prev() {
    this.slickModal.slickPrev();
  }

  public pause(index) {
    if (this.data.stories[index]) this.data.stories[index].pause = true
  }

  public reproduce(index) {
    if (this.data.stories[index]) this.data.stories[index].pause = false
  }

  private reproduceOrNext(index, timeElapsed) {
    if (!this.nextEnabled || timeElapsed > 250) { // Tiempo transcurrido en ms
      this.reproduce(index)
    } else {
      //this.pause(index)
      this.next()
    }
  }

  private getCurrentSlick() {
    return document.querySelector(".modal-stories .slick-slide.slick-center")
  }

  private addEventPauseAndPlay() {
    if (window.screen.width >= 550) {
      if (this.data.showCarousel) {
        for (let index = 0; index < this.data.stories.length; index++) {
          const card = document.getElementById("story-" + index.toString())
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
      } else {
        const card = document.getElementById("story-modal-" + this.data.id.toString())
        if (card) {
          card.onpointerdown = e => {
            this.pause(this.data.id)
            e.preventDefault()
          }
      
          card.onpointerup = e => {
            this.reproduce(this.data.id)
            e.preventDefault()
          }
        }
      }
    }

    const arrowPrev = document.getElementById("arrow-prev")

    if (arrowPrev) {
      arrowPrev.onpointerup = e => {
        const current = this.getCurrentSlick()
  
        this.pause(Number.parseInt(current.getAttribute("data-slick-index")))
        this.prev()
        e.preventDefault()
      }
    }
   
    const arrowNext = document.getElementById("arrow-next")

    if (arrowNext) {
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
