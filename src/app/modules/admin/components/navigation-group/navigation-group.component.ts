import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
@Component({
  selector: "app-navigation-group",
  templateUrl: "./navigation-group.component.html",
  styleUrls: ["./navigation-group.component.scss"],
})
export class NavigationGroupComponent implements OnInit {
  @Input() section: any;
  @Output() editGroup = new EventEmitter<any>();
  @Output() deleteGroup = new EventEmitter<any>();
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  editNavigationGroup() {
    this.editGroup.emit(this.section);
  }

  openDeleteNavigationSection() {
    this.deleteGroup.emit(this.section);
  }

  editNavigationItem(link: any) {
    console.log(`link in navigation group`, link)
    this.editItem.emit(link);
  }

  openDeleteNavigationItem(link: any) {
    this.deleteItem.emit(link);
  }
}
