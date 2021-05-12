import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-story',
  templateUrl: './card-story.component.html',
  styleUrls: ['./card-story.component.scss']
})
export class CardStoryComponent implements OnInit {
  @Input() story: any
  @Input() id: string
  @Input() index: number
  @Input() pause: boolean
  @Input() showShared: boolean = true
  @Input() showCheck: boolean = false
  @Input() showProgress: boolean = true
  @Input() showInfo: boolean = true
  @Output() nextStory = new EventEmitter();
  @Output() checkStory = new EventEmitter();

  cardStory: any
  currentProgress: any
  currentTime = 0
  check: boolean

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.progress()
  }

  ngAfterViewInit() {
    this.cardStory = document.getElementById(this.id)
    this.progress()
  }

  private progress() {
    if (this.cardStory) {
      const totalTime = 5000
      this.currentProgress = this.cardStory.querySelector(".story-progress .current-progress")

      if (this.currentProgress.style.width === "100%") {
        this.currentProgress.style.width = "0"
        this.currentTime = 0
      }

      let interval = setInterval(() => {
        let percent = Math.round((this.currentTime / totalTime)*100)
        this.currentProgress.style.width = `${percent}%`
  
        if (percent === 100 || this.pause) {
          if (percent === 100) {
            this.nextStory.emit(this.index)
          }

          percent = 0
          clearInterval(interval)
        } else {
          this.currentTime += 100 // milisegundos
        }
      }, 100)
    }
  }

  public checkDeleteStory() {
    this.checkStory.emit(this.check)
  }
}
