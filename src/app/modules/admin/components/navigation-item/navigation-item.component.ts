import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-navigation-item",
  templateUrl: "./navigation-item.component.html",
  styleUrls: ["./navigation-item.component.scss"],
})

export class NavigationItemComponent implements OnInit {
  @Input() link: any;
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  public editNavigationItem() {
    this.editItem.emit(this.link);
  }

  openDeleteNavigationItem() {
    this.deleteItem.emit(this.link);
  }
}
