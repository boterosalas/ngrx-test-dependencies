import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-admin-story',
  templateUrl: './card-admin-story.component.html',
  styleUrls: ['./card-admin-story.component.scss']
})
export class CardAdminStoryComponent implements OnInit {

  constructor() { }

  @Input() title:string;
  @Input() url:string;
  @Input() type:string;
  @Input() commission:string;
  @Input() date:string;
  @Input() img:string;

  ngOnInit() {
  }

}
