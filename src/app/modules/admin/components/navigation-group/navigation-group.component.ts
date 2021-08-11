import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-navigation-group',
  templateUrl: './navigation-group.component.html',
  styleUrls: ['./navigation-group.component.scss'],
})
export class NavigationGroupComponent implements OnInit {
  @Input() section: any;
  @Output() editGroup = new EventEmitter<any>();
  @Output() deleteGroup = new EventEmitter<any>();
  @Output() addItem = new EventEmitter<any>();
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();
  @Output() saveOrderItems = new EventEmitter<object>();
  @Output() changeState = new EventEmitter<object>();

  isValidAddItems = true;
  isValidDeleteGroup = true;

  constructor(private content: ContentService) {}

  ngOnInit() {
    if (this.section.links !== undefined) {
      this.isValidAddItems = this.section.links.length < 10;
      this.isValidDeleteGroup = this.section.links.length === 0;
    } else {
      this.isValidDeleteGroup = this.section.menus.length === 0;
    }
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

  editNavigationItem(link: any) {
    this.editItem.emit(link);
  }

  deleteNavigationItem(link: any) {
    this.deleteItem.emit(link);
  }

  dropItems(event: CdkDragDrop<any>) {
    const items = this.section.links || this.section.menus;
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

  changeStateOfItem(link: any) {
    this.changeState.emit(link);
  }
}
