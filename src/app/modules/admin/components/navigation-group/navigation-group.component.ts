import { Component, OnInit, Input } from "@angular/core";
import { MatDialog, MatDialogRef, MatTable } from "@angular/material";
import { Subscription } from "rxjs";
import { ContentService } from "src/app/services/content.service";
import { DialogNavigationGroupComponent } from "../dialog-navigation-group/dialog-navigation-group.component";

@Component({
  selector: "app-navigation-group",
  templateUrl: "./navigation-group.component.html",
  styleUrls: ["./navigation-group.component.scss"],
})
export class NavigationGroupComponent implements OnInit {
  @Input() section: any;

  private subscription: Subscription = new Subscription();

  constructor(private content: ContentService, private dialog: MatDialog) {}

  ngOnInit() {}

  public editNavigationGroup() {
    const id = this.section.id;
    const title = "Editar grupo";
    const buttonName = "Guardar";
    const edit = 1;
    const description = this.section.description;
    const dialogRef1 = this.dialog.open(DialogNavigationGroupComponent, {
      data: {
        id,
        title,
        buttonName,
        edit,
        description,
      },
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      // this.getContentBussiness();
    });
  }
}
