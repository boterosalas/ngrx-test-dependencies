import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
export interface PeriodicElement {
  drag: any;
  bussiness: any;
  activated: any;
}
@Component({
  selector: 'app-information-bussiness',
  templateUrl: './information-bussiness.component.html',
  styleUrls: ['./information-bussiness.component.scss']
})
export class InformationBussinessComponent implements OnInit {
  id: string;
  title: string;
  displayedColumns: string[] = ['drag', 'title', 'description', 'edition'];
  image: string;
  @ViewChild('table', { static: false }) table: MatTable<PeriodicElement>;
  dataSource = [{
    id: 1,
    title: "Satisfacción",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    orderby: 1
  }, {
    id: 2,
    title: "Categoria",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    orderby: 2
  }, {
    id: 3,
    title: "Estatus",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    orderby: 3
  }]
  private subscription: Subscription = new Subscription();
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
  }
  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    let datosSourceSend = []
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].orderby = i + 1
      datosSourceSend.push({
        idbusiness: this.dataSource[i].id,
        order: i + 1
      })
    }
    //this.saveOrder(datosSourceSend)
  }
}
