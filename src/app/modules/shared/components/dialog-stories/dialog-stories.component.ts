import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-stories',
  templateUrl: './dialog-stories.component.html',
  styleUrls: ['./dialog-stories.component.scss']
})
export class DialogStoriesComponent implements OnInit {
  @Input() story: {}

  constructor() { }

  ngOnInit() {
  }

}
