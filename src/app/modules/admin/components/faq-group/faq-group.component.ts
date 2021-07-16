import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-faq-group',
  templateUrl: './faq-group.component.html',
  styleUrls: ['./faq-group.component.scss']
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

  isValidDeleteGroup: boolean = true;

  constructor(private content: ContentService) {}

  ngOnInit() {
      // this.isValidDeleteGroup = this.section.items.length === 0;
  }

  editNavigationGroup() {
    this.editGroup.emit(this.section);
  }

  openDeleteNavigationSection() {
    this.deleteGroup.emit(this.section);
  }

  addNavigationItem() {
    this.addItem.emit(this.section);
  }

  editNavigationItem(faq: any) {
    this.editItem.emit(faq);
  }

  deleteNavigationItem(faq: any) {
    this.deleteItem.emit(faq);
  }

  dropItems(event: CdkDragDrop<any>) {
    const items = this.section.items;
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    let dataSourceSend = [];
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
