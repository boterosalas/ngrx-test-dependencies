import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatTable } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ContentService } from 'src/app/services/content.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { DialogCategoryComponent } from '../../components/dialog-category/dialog-category.component'
import { ResponseService } from 'src/app/interfaces/response';
//import { Router } from '@angular/router';
export interface PeriodicElement {
  drag: any;
  bussiness: any;
  activated: any;
}
@Component({
  selector: 'app-bussiness-admin',
  templateUrl: './bussiness-admin.component.html',
  styleUrls: ['./bussiness-admin.component.scss']
})
export class BussinessAdminComponent implements OnInit {
  id: string;
  title: string;
  image: string;
  datosEliminar: any;
  dialogRef: MatDialogRef<any>
  bussinessCategory = [];
  showDeliver: boolean = false;
  private subscription: Subscription = new Subscription();
  @ViewChild('table', { static: false }) table: MatTable<PeriodicElement>;
  @ViewChild("templateDeleteCategory", { static: false })
  templateDelete: TemplateRef<any>;
  displayedColumns: string[] = ['drag', 'image', 'name', 'comission', 'typeCommision', 'commisionClicker', 'commisionBussiness', 'state', 'actions'];
  constructor(
    private content: ContentService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {

    this.subscription = this.route.params.subscribe((route) => {
      if (
        route.id === undefined &&
        route.titulo === undefined &&
        route.imagen === undefined

      ) {
        this.id = "1";
        this.title = "exito";
        this.image =
          "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.svg";
      } else {
        this.id = route.id;
        this.title = route.titulo;
        this.image = route.imagen;
      }
    });
  }

  ngOnInit() {
    this.getContentBussiness();
  }
  public getContentBussiness() {
    this.subscription = this.content
      .getAllBusinessContent(this.id)
      .pipe(distinctUntilChanged())
      .subscribe((bussiness) => {
        this.showDeliver = true;
        this.bussinessCategory = bussiness;
      });

    //getAllBusinessContent
  }
  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.bussinessCategory.findIndex((d) => d === event.item.data);
    moveItemInArray(this.bussinessCategory, prevIndex, event.currentIndex);
    this.table.renderRows();
    let datosSourceSend = []
    for (let i = 0; i < this.bussinessCategory.length; i++) {
      this.bussinessCategory[i].orderby = i + 1
      datosSourceSend.push({
        id: this.bussinessCategory[i].id,
        orderby: i + 1
      })
    }
    this.saveOrder(datosSourceSend)
  }
  public saveOrder(datos: any) {
    this.content.orderCategory(datos).subscribe((resp: ResponseService) => {
      if (resp.state === "Success") {
        console.log("Categoria Ordenada")
      } else {
        console.log("Upss Hubo un problema vuelve a intentarlo")
      }
    });
  }
  public cancelDelete() {
    this.dialog.closeAll();
  }
  public deleteCategory(data: any) {
    const title = "";
    const template = this.templateDelete;
    //let dialogRef: MatDialogRef<any>
    this.dialogRef = this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        template,
      },
    });
    this.datosEliminar = data;
    this.subscription = this.dialogRef.beforeClosed().subscribe(() => {
      this.getContentBussiness();
    });
  }
  public agregarCategory() {
    const title = "Nueva Categoría";
    const buttonName = "Agregar";
    const idBussiness = this.id;
    const edit = 0;
    //let dialogRef1: MatDialogRef<MatDialog>;
    let dialogRef1 = this.dialog.open(DialogCategoryComponent, {
      width: "450px",
      data: {
        title,
        idBussiness,
        buttonName,
        edit
      },
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      this.getContentBussiness();
    });
  }
  public editCategory(category: any) {
    const title = "Editar Categoría";
    const buttonName = "Guardar";
    const id = category.id;
    const name = category.description;
    const description = category.infoaditional;
    const image = category.imageurl;
    const link = category.link;
    const comision = category.commission;
    const edit = 1;
    const idBussiness = this.id;
    const comisionBussines = category.commissionbusiness;
    const typeComision = category.typecommission;
    const active = category.active;
    const dialogRef1 = this.dialog.open(DialogCategoryComponent, {
      width: "450px",
      data: {
        id,
        title,
        buttonName,
        edit,
        name,
        description,
        image,
        link,
        comision,
        idBussiness,
        comisionBussines,
        typeComision,
        active
      },
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      this.getContentBussiness();
    });
  }
  public deleteCategoryService() {
    let datos = { id: this.datosEliminar.id }
    this.content.deleteCategory(datos).subscribe((resp: ResponseService) => {
      if (resp.state === "Success") {
        this.dialog.closeAll();
      } else {
        console.log("Upss Hubo un problema vuelve a intentarlo")
      }
    });
  }
}
