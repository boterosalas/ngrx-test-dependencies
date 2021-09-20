import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-novelties',
  templateUrl: './table-novelties.component.html',
  styleUrls: ['./table-novelties.component.scss'],
})
export class TableNoveltiesComponent implements OnInit {
  @Input() dataSource?;
  @Output() dataNoveltie = new EventEmitter();
  @Output() sortNoveltie = new EventEmitter();
  @Input() size?;
  @Input() p?;
  @Input() totalItems?;

  infoUpdate = {};

  displayedColumns: string[] = ['idclicker', 'subscription', 'users', 'identification', 'cellphone', 'email', 'responsetime',  'status'];

  ngOnInit() {}

  openDialog(dataSource) {
    this.dataNoveltie.emit(dataSource);
  }

  sortData(event) {
    this.sortNoveltie.emit(event);
  }
}
