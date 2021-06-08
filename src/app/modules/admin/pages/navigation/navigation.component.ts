import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatTable } from "@angular/material";
import { Subscription } from "rxjs";
import { ContentService } from "src/app/services/content.service";
import { LinksService } from "src/app/services/links.service";

export interface FooterElement {
  drag: any;
  section: any;
}
@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  displayedColumns: string[] = ["description", "link", "actions"];

  constructor(private file: LinksService, private content: ContentService) {}

  @Input() dataSource;
  @ViewChild("table", { static: false }) table: MatTable<FooterElement>;

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.getAllFooterSections();
  }

  dropTable(event: CdkDragDrop<FooterElement[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    let datosSourceSend = [];
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].orderby = i + 1;
      datosSourceSend.push({
        idbusiness: this.dataSource[i].id,
        order: i + 1,
      });
    }

    this.saveOrder(datosSourceSend);
  }

  saveOrder(datos: any) {
    this.file.putOrder(datos).subscribe((resp) => {});
  }

  public getAllFooterSections() {
    this.subscription = this.content.getFooter("ADMIN").subscribe((resp) => {
      this.dataSource = resp;
    });
  }
}
