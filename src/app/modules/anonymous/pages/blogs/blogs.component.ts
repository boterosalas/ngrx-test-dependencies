import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  pageTo: number = 9;
  paginate: string;
  pageIndex: number = 0;
  totalItems: number;
  newsUser: Array<any>;
  pageSize: number;
  orderBy: string;
  from: any;
  to: any;
  private subscription: Subscription = new Subscription();
  constructor(
    public router: Router,
    private content: ContentService,
    private util: UtilsService,
    private paginator: MatPaginatorIntl,
  ) {
    this.paginator.getRangeLabel = function (page, pageSize, length) {
      if (length === 0 || pageSize === 0) {
        return "0 de " + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return startIndex + 1 + " - " + endIndex + " de " + length;
    };
  }

  selecteds = [{
    titulo: "Más relevante",
    value: "RELEVANT"
  },
  {
    titulo: "Más reciente",
    value: "RECENT"
  }]
  blogMain: any;
  blogsData = [];
  ngOnInit() {
    this.orderBy = "RELEVANT";
    this.getBlogs();
  }
  public searchUser(
    from = 1,
    to = this.pageTo,
    orderBy = this.orderBy
  ) {

    const params = { from, to, orderBy };
    this.subscription = this.content.getBlogs(params).subscribe((user: any) => {
      this.blogsData = user.objectResponse.blogs;
      this.blogMain = user.objectResponse.blogs[0];
      this.totalItems = user.objectResponse.total;
      //this.dataSource = new MatTableDataSource<any>(this.newsUser);
    });
  }
  public pagination(paginate: any) {
    this.pageIndex = paginate.pageIndex;
    paginate.length = this.totalItems;
    this.from = paginate.pageSize * paginate.pageIndex + 1;
    this.to = paginate.pageSize * (paginate.pageIndex + 1);
    this.searchUser(this.from, this.to);
  }
  getBlogs() {
    let data = {
      from: 1,
      to: this.pageTo,
      orderBy: "RELEVANT"
    }
    this.content.getBlogs(data).subscribe((resp) => {

      this.blogsData = resp.objectResponse.blogs;
      this.blogMain = resp.objectResponse.blogs[0];
      this.totalItems = resp.objectResponse.total;
    })
  }
  redirectionPath(elemtn) {
    let url = 'blog/' + elemtn;
    this.router.navigate([url])
    this.util.pathBlog = elemtn;

  }
  orderByFun(element) {
    this.orderBy = element.value;
    this.searchUser()
  }
}
