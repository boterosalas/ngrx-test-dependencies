import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ContentService } from 'src/app/services/content.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
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
  bussiness: [];
  showDeliver: boolean = false;
  private subscription: Subscription = new Subscription();
  @ViewChild('table', { static: false }) table: MatTable<PeriodicElement>;
  @ViewChild("templateDeleteCategory", { static: false })
  templateDelete: TemplateRef<any>;
  displayedColumns: string[] = ['drag', 'image', 'name', 'comission', 'typeCommision', 'commisionBussiness', 'state', 'actions'];
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
    console.log(this.title)
    this.getContentBussiness();
  }
  public getContentBussiness() {
    this.subscription = this.content
      .getBusinessContent(this.id)
      .pipe(distinctUntilChanged())
      .subscribe((bussiness) => {
        this.showDeliver = true;
        this.bussiness = bussiness;
        console.log(bussiness)
      });
  }
  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.bussiness.findIndex((d) => d === event.item.data);
    moveItemInArray(this.bussiness, prevIndex, event.currentIndex);
    this.table.renderRows();
    //let datosSourceSend = []
    //for (let i = 0; i < this.dataSource.length; i++) {
    //  this.dataSource[i].orderby = i + 1
    //  datosSourceSend.push({
    //    idbusiness: this.dataSource[i].id,
    //    order: i + 1
    //  })
    //}
    //this.saveOrder(datosSourceSend)
  }
  public cancelDelete() {

    this.dialog.closeAll();

  }
  public deleteCategory() {
    const title = "";
    const template = this.templateDelete;

    this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        template,
      },
    });
  }
}
