import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor() { }
  selecteds = [{
    titulo: "Más reciente"
  },
  {
    titulo: "Más antiguo"
  }]
  blogsData = [{
    titulo: "Burbujas y colores: 3 bebidas gasificadas para refrescar tu feed de Instagram",
    date: "2020/11/22",
    author: "Andrés Acosta",
    image: "https://blog.hotmart.com/blog/2018/03/BLOG_tipos-de-blog.png"
  },
  {
    titulo: "Burbujas y colores: 3 bebidas gasificadas para refrescar tu feed de Instagram",
    date: "2020/11/22",
    author: "Andrés Acosta",
    image: "https://blog.hotmart.com/blog/2018/03/BLOG_tipos-de-blog.png"
  },
  {
    titulo: "Burbujas y colores: 3 bebidas gasificadas para refrescar tu feed de Instagram",
    date: "2020/11/22",
    author: "Andrés Acosta",
    image: "https://blog.hotmart.com/blog/2018/03/BLOG_tipos-de-blog.png"
  },
  {
    titulo: "Burbujas y colores: 3 bebidas gasificadas para refrescar tu feed de Instagram",
    date: "2020/11/22",
    author: "Andrés Acosta",
    image: "https://blog.hotmart.com/blog/2018/03/BLOG_tipos-de-blog.png"
  }]
  ngOnInit() {
  }

}
