import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Subscription } from "rxjs";
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

  constructor() {}

  ngOnInit() {}

  editNavigationGroup() {
    this.editGroup.emit(this.section);
  }

  openDeleteNavigationSection() {
    this.deleteGroup.emit(this.section);
  }
}
