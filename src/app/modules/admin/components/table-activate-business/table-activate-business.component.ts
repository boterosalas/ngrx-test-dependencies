import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material';
import { LinksService } from "src/app/services/links.service";
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
  ) { }
  //dataSource: any;
  @Input() dataSource;
  @Output() activateBusiness = new EventEmitter;
  @ViewChild('table', { static: false }) table: MatTable<PeriodicElement>;

  displayedColumns: string[] = ['drag', 'bussiness', 'activate'];
  ngOnInit() {
  }

  activate(dataSource) {
    this.activateBusiness.emit(dataSource);
  }
  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    this.saveOrder();
    console.log(this.dataSource);
  }
  saveOrder() {
    this.file.putOrder(this.dataSource)
  }

}
