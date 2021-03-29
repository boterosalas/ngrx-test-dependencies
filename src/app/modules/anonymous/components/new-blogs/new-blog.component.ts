import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-blog-business',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.scss']
})
export class NewBlogComponent implements OnInit {

  @Output() openModal = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  public registerBusiness() {
    this.openModal.emit();

  }

}
