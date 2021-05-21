import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-story',
  templateUrl: './button-story.component.html',
  styleUrls: ['./button-story.component.scss']
})
export class ButtonStoryComponent implements OnInit {
  @Input() story: {
    idbusiness: number,
    businessName: string,
    businessImage: string,
    stateView: boolean,
    pause: boolean
  }
  @Input() index: number
  @Output() openStory = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public viewStory() {
    this.openStory.emit(this.index)
  }
}
