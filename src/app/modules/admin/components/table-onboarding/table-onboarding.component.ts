import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

}
