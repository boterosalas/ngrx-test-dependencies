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

  displayedColumns: string[] = ['new','idclicker', 'subscription', 'users', 'identification', 'cellphone', 'email', 'responsetime', 'label',  'status'];

  ngOnInit() {}

  openDialog(dataSource, open?:string) {
    this.dataNoveltie.emit({dataSource, open});
  }

  sortData(event) {
    this.sortNoveltie.emit(event);
  }
}
