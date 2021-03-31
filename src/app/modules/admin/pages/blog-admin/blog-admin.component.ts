import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.scss']
})
export class BlogAdminComponent implements OnInit {

  constructor(
    private content: ContentService,
    private _snackBar: MatSnackBar,
    public router: Router,
    private utils: UtilsService
  ) { }
  blogPublicado = []

  blogHidden = []

  ngOnInit() {
    this.getBlogs();
    this.checkRole();
  }
  checkRole() {
    this.utils.checkPermision();
  }
  getBlogs() {
    let data = {
      from: 1,
      orderBy: "RELEVANT"
    }
    this.content.getBlogsAdmin(data).subscribe((resp) => {
      let visibles = resp.objectResponse.blogs
      let visiblesBlog = [];
      let invisiblesBlog = [];
      for (let index = 0; index < visibles.length; index++) {
        if (visibles[index].visible === true) {
          visiblesBlog.push(visibles[index]);
        }
        else {
          invisiblesBlog.push(visibles[index]);
        }
      }
      this.blogPublicado = visiblesBlog;
      this.blogHidden = invisiblesBlog;
    })
  }
  deleteArticle(item) {
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
        this.content.deleteBlog(item.id).subscribe((resp) => {
          this.getBlogs();
        })
      }
    })

  }
  activate(element) {
    let formData: FormData = new FormData();
    formData.append('id', element.id);
    formData.append('value', '' + element.visible);
    this.content.activeBlog(formData).subscribe(resp => {
      this.getBlogs();
      this.openSnackBar("El Blog se actualizó correctamente", "Cerrar");

    })
  }
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  editArticle(item) {
    this.router.navigate([
      "/edit-blog-admin",
      {
        id: item.id,
      },
    ]);
  }
}

