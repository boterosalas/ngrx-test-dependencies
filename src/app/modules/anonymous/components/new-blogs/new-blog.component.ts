import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blog-business',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.scss'],
})
export class NewBlogComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  routeBlog() {
    this.router.navigate(['/blog']);
  }

}
