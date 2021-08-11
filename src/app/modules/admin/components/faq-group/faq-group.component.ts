import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-faq-group',
  templateUrl: './faq-group.component.html',
  styleUrls: ['./faq-group.component.scss'],
})
export class FaqGroupComponent implements OnInit {
  @Input() section: any;
  @Output() editGroup = new EventEmitter<any>();
  @Output() deleteGroup = new EventEmitter<any>();
  @Output() addItem = new EventEmitter<any>();
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();
  @Output() saveOrderItems = new EventEmitter<object>();
  @Output() changeState = new EventEmitter<object>();
  @Output() previewItems = new EventEmitter<object>();

  isValidDeleteGroup = true;

  constructor() {}

  ngOnInit() {
    //
  }

  editFaqGroup() {
    this.editGroup.emit(this.section);
  }

  openDeleteFaqSection() {
    this.deleteGroup.emit(this.section);
  }

  addFaqItem() {
    this.addItem.emit(this.section);
  }

  editFaqItem(faq: any) {
    this.editItem.emit(faq);
  }

  deleteFaqItem(faq: any) {
    this.deleteItem.emit(faq);
  }

  previewItem(faq: any) {
    this.previewItems.emit(faq);
  }

  dropItems(event: CdkDragDrop<any>) {
    const items = this.section.items;
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    const dataSourceSend = [];
    for (let i = 0; i < items.length; i++) {
      items[i].orderby = i + 1;
      dataSourceSend.push({
        id: items[i].id,
        orderBy: i + 1,
      });
    }
    this.saveOrderItems.emit(dataSourceSend);
  }

  changeStateOfItem(faq: any) {
    this.changeState.emit(faq);
  }
}
