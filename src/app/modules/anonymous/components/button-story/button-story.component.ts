import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-story',
  templateUrl: './button-story.component.html',
  styleUrls: ['./button-story.component.scss']
})
export class ButtonStoryComponent implements OnInit {
  @Input() story: {
    id: number,
    idbusiness: number,
    name: string,
    businessName: string,
    infoAditional: string,
    image: string,
    businessImage: string,
    businessCode: string,
    link: string,
    date: any,
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
