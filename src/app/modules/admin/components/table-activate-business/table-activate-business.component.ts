import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material';
import { LinksService } from "src/app/services/links.service";
import { Router } from '@angular/router';
export interface PeriodicElement {
  drag: any;
  bussiness: any;
  activated: any;

}
@Component({
  selector: 'app-table-activate-business',
  templateUrl: './table-activate-business.component.html',
  styleUrls: ['./table-activate-business.component.scss']
})

export class TableActivateBusinessComponent implements OnInit {

  constructor(
    private file: LinksService,
    public router: Router,
  ) { }
  //dataSource: any;
  @Input() dataSource;
  @Output() activateBusiness = new EventEmitter;
  @ViewChild('table', { static: false }) table: MatTable<PeriodicElement>;

  displayedColumns: string[] = ['drag', 'bussiness', 'activate', 'category'];
  ngOnInit() {
  }

  activate(dataSource) {
    this.activateBusiness.emit(dataSource);
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
    this.saveOrder(datosSourceSend)
  }
  saveOrder(datos: any) {
    this.file.putOrder(datos).subscribe(resp => {
      console.log(resp)
    })
  }

  editCategory(element: any) {
    this.router.navigate([
      "/bussiness-admin",
      {
        id: element.id,
        titulo: element.description,
        imagen: element.imageurl
      },
    ]);
  }
}
