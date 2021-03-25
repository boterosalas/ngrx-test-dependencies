import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.scss']
})
export class BlogAdminComponent implements OnInit {

  constructor() { }
  blogPublicado = [
    {
      titulo: "Burbujas y colores: 3 bebidas gasificadas para refrescar tu feed de Instagram",
      date: "2020/11/22",
      author: "Andrés Acosta",
      image: "https://blog.hotmart.com/blog/2018/03/BLOG_tipos-de-blog.png",
      visible: true
    },
    {
      titulo: "Burbujas y colores: 3 bebidas gasificadas para refrescar tu feed de Instagram",
      date: "2020/11/22",
      author: "Andrés Acosta",
      image: "https://blog.hotmart.com/blog/2018/03/BLOG_tipos-de-blog.png",
      visible: true
    },
    {
      titulo: "Burbujas y colores: 3 bebidas gasificadas para refrescar tu feed de Instagram",
      date: "2020/11/22",
      author: "Andrés Acosta",
      image: "https://blog.hotmart.com/blog/2018/03/BLOG_tipos-de-blog.png",
      visible: true
    },
    {
      titulo: "Burbujas y colores: 3 bebidas gasificadas para refrescar tu feed de Instagram",
      date: "2020/11/22",
      author: "Andrés Acosta",
      image: "https://blog.hotmart.com/blog/2018/03/BLOG_tipos-de-blog.png",
      visible: true
    }
  ]
  blogHidden = [
    {
      titulo: "Burbujas y colores: 3 bebidas gasificadas para refrescar tu feed de Instagram",
      date: "2020/11/22",
      author: "Andrés Acosta",
      image: "https://blog.hotmart.com/blog/2018/03/BLOG_tipos-de-blog.png",
      visible: false
    },
    {
      titulo: "Burbujas y colores: 3 bebidas gasificadas para refrescar tu feed de Instagram",
      date: "2020/11/22",
      author: "Andrés Acosta",
      image: "https://blog.hotmart.com/blog/2018/03/BLOG_tipos-de-blog.png",
      visible: false
    },
    {
      titulo: "Burbujas y colores: 3 bebidas gasificadas para refrescar tu feed de Instagram",
      date: "2020/11/22",
      author: "Andrés Acosta",
      image: "https://blog.hotmart.com/blog/2018/03/BLOG_tipos-de-blog.png",
      visible: false
    },
    {
      titulo: "Burbujas y colores: 3 bebidas gasificadas para refrescar tu feed de Instagram",
      date: "2020/11/22",
      author: "Andrés Acosta",
      image: "https://blog.hotmart.com/blog/2018/03/BLOG_tipos-de-blog.png",
      visible: false
    }
  ]
  ngOnInit() {
  }
  deleteArticle() {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar artículo</h3> <p class='w-container'>¿Estás seguro de eliminar el artículo seleccionado?</p>",
      confirmButtonText: "Eliminar artículo",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonClass: "updateokdelete order-last",
      cancelButtonClass: "updatecancel",
      allowOutsideClick: false
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {

      }
    })

  }

}
