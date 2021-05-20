import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Story } from "src/app/interfaces/story";

@Component({
  selector: 'app-button-story',
  templateUrl: './button-story.component.html',
  styleUrls: ['./button-story.component.scss']
})
export class ButtonStoryComponent implements OnInit {
  @Input() story: Story
  @Input() index: number
  @Output() openStory = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public viewStory() {
    this.openStory.emit(this.index)
  }
}