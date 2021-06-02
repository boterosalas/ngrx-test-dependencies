import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ContentService } from "src/app/services/content.service";

@Component({
  selector: "app-navigation-group",
  templateUrl: "./navigation-group.component.html",
  styleUrls: ["./navigation-group.component.scss"],
})
export class NavigationGroupComponent implements OnInit {
  @Input() section: any;
  @Output() editGroup = new EventEmitter<any>();
  @Output() deleteGroup = new EventEmitter<any>();
  @Output() addItem = new EventEmitter<any>();
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();
  @Output() saveOrderItems = new EventEmitter<object>();

  isValidAddItems: boolean = true;

  constructor(private content: ContentService) {}

  ngOnInit() {
    this.isValidAddItems = this.section.links.length < 10;
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
    moveItemInArray(
      this.section.links,
      event.previousIndex,
      event.currentIndex
    );
    let dataSourceSend = [];
    for (let i = 0; i < this.section.links.length; i++) {
      this.section.links[i].orderby = i + 1;
      dataSourceSend.push({
        id: this.section.links[i].id,
        orderBy: i + 1,
      });
    }

    this.saveOrderItems.emit(dataSourceSend);
  }
}
