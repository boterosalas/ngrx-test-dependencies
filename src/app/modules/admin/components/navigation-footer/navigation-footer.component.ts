import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Subscription } from "rxjs";
import { ContentService } from "src/app/services/content.service";
import { DialogNavigationGroupComponent } from "../dialog-navigation-group/dialog-navigation-group.component";

@Component({
  selector: "app-navigation-footer",
  templateUrl: "./navigation-footer.component.html",
  styleUrls: ["./navigation-footer.component.scss"],
})
export class NavigationFooterComponent implements OnInit {
  sectionsLinks: any;
  private subscription: Subscription = new Subscription();

  constructor(private content: ContentService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getSections();
  }

  public getSections() {
    this.subscription = this.content.getFooter().subscribe((resp) => {
      this.sectionsLinks = resp;
    });
  }

  public addSection() {
    const title = "Nuevo grupo";
    const buttonName = "Agregar";
    const edit = 0;
    const dialogRef1 = this.dialog.open(DialogNavigationGroupComponent, {
      data: {
        title,
        buttonName,
        edit,
      },
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      // this.getContentBussiness();
    });
  }  
}
