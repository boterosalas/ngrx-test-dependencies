import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import { PeriodicElement } from '../table-activate-business/table-activate-business.component';

@Component({
  selector: 'app-table-onboarding',
  templateUrl: './table-onboarding.component.html',
  styleUrls: ['./table-onboarding.component.scss']
})
export class TableOnboardingComponent implements OnInit {

  @Input() dataSource;
  @Output() dataOnboardingDelete = new EventEmitter();
  @Output() dataOnboardingEdit = new EventEmitter();
  @Output() openBoard = new EventEmitter();
  @ViewChild('table', { static: false }) table: MatTable<any>;


  displayedColumns: string[] = ['web', 'mobile', 'cta1', 'cta2', 'actions'];

  ngOnInit() {}

  deleteItem(dataSource) {
    this.dataOnboardingDelete.emit(dataSource);
  }

  editItem(dataSource) {
    this.dataOnboardingEdit.emit(dataSource);
  }

  openModalBoard() {
    this.openBoard.emit();
  }

  public dropTable(event: CdkDragDrop<any[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    const datosSourceSend = [];
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].orderby = i + 1;
      datosSourceSend.push({
        id: this.dataSource[i].id,
        orderby: i + 1,
      });
    }
    console.log(datosSourceSend);
    // this.saveOrder(datosSourceSend);
  }
}
