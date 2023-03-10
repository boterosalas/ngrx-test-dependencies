import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';
declare var dataLayer: any;

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  pageTo = 9;
  paginate: string;
  pageIndex = 0;
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
    private metaTagService: Meta
  ) {
    this.metaTagService.addTags([
      {
        name: 'keywords',
        content: 'blog, clickam, marketing de afiliados',
      },
      {
        name: 'description',
        content:
          'Clickam es una plataforma marketplace de marketing de afiliados, donde ganarás dinero por referir y comprar. Aumenta el tráfico de tu negocio con afiliados. Una idea Grupo Éxito.  Exito - Carulla - Haceb - SURA - Puntos Colombia - Viajes Éxito - Nequi.',
      },
    ]);
    this.paginator.getRangeLabel = function (page, pageSize, length) {
      if (length === 0 || pageSize === 0) {
        return '0 de ' + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
    };
  }

  selecteds = [
    {
      titulo: 'Más relevante',
      value: 'RELEVANT',
    },
    {
      titulo: 'Más reciente',
      value: 'RECENT',
    },
  ];

  blogMain = {
    author: '',
    content: '',
    file: null,
    id: '',
    imageurl: '',
    path: null,
    pathurl: '',
    date: '',
    tags: '',
    title: '',
    url: '',
    visible: null,
    visits: '',
  };

  blogsData = [];
  ngOnInit() {
    this.orderBy = 'RELEVANT';
    this.getBlogs();
  }
  public searchUser(from = 1, to = this.pageTo, orderBy = this.orderBy) {
    const params = { from, to, orderBy };
    this.subscription = this.content.getBlogs(params).subscribe((user: any) => {
      this.blogsData = user.objectResponse.blogs;
      this.blogMain = user.objectResponse.blogs[0];
      this.totalItems = user.objectResponse.total;
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
    const data = {
      from: 1,
      to: this.pageTo,
      orderBy: 'RELEVANT',
    };
    this.content.getBlogs(data).subscribe((resp) => {
      this.blogsData = resp.objectResponse.blogs;
      this.blogMain = resp.objectResponse.blogs[0];
      this.totalItems = resp.objectResponse.total;
    });
  }
  redirectionPath(elemtn) {
    const url = 'blog/' + elemtn;
    this.router.navigate([url]);
    this.util.pathBlog = elemtn;
  }
  orderByFun(element) {
    this.orderBy = element.value;
    this.searchUser();

    dataLayer.push({
      event: 'pushEventGA',
      categoria: 'Blog',
      accion: 'ClicOrdenar',
      etiqueta: element.value
    });

  }
}
