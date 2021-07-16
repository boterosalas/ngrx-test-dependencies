import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss']
})
export class FaqItemComponent implements OnInit {

  @Input() faq: any;
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();
  @Output() changeStateItem = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  editNavigationItem() {
    this.editItem.emit(this.faq);
  }

  openDeleteNavigationItem() {
    this.deleteItem.emit(this.faq);
  }

  changeState() {
    this.changeStateItem.emit(this.faq);
  }

}
