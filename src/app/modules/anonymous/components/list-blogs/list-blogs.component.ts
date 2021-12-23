import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.scss']
})
export class ListBlogsComponent implements OnInit, OnDestroy {

  constructor(private content: ContentService) { }

  blogs = [];

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    const params ={
      from:'1' , to: '10' , orderBy: 'ASC'
    }
    this.subscription = this.content.getBlogs(params).subscribe((blog: ResponseService) => {
      console.log(blog);
      this.blogs = blog.objectResponse.blogs;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
