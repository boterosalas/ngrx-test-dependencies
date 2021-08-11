import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss'],
})
export class FaqItemComponent implements OnInit {
  @Input() faq: any;
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();
  @Output() changeStateItem = new EventEmitter<any>();
  @Output() previewItems = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  previewItem() {
    this.previewItems.emit(this.faq);
  }

  editFaqItem() {
    this.editItem.emit(this.faq);
  }

  openDeleteFaqItem() {
    this.deleteItem.emit(this.faq);
  }

  changeState() {
    this.changeStateItem.emit(this.faq);
  }
}
