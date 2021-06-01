import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Subscription } from "rxjs";
import { ResponseService } from "src/app/interfaces/response";
import { ModalGenericComponent } from "src/app/modules/shared/components/modal-generic/modal-generic.component";
import { ContentService } from "src/app/services/content.service";
import { DialogNavigationItemComponent } from "../dialog-navigation-item/dialog-navigation-item.component";

@Component({
  selector: "app-navigation-item",
  templateUrl: "./navigation-item.component.html",
  styleUrls: ["./navigation-item.component.scss"],
})
export class NavigationItemComponent implements OnInit {
  @Input() link: any;
  dialogRef: MatDialogRef<any>;

  private subscription: Subscription = new Subscription();

  @ViewChild("templateDeleteNavigationGroup", { static: false })
  templateDelete: TemplateRef<any>;

  constructor(private content: ContentService, private dialog: MatDialog) {}

  ngOnInit() {}

  public editNavigationItem() {
    const data = {
      title: "Editar acceso",
      buttonName: "Guardar",
      edit: 1,
      id: this.link.id,
      idseccion: this.link.idseccion,
      link: this.link.link,
      description: this.link.description,
      orderby: this.link.orderby,
      date: this.link.date,
    };

    const dialogRef1 = this.dialog.open(DialogNavigationItemComponent, {
      data: data,
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      // this.getContentBussiness();
    });
  }

  public openDeleteNavigationSection() {
    const title = "";
    const template = this.templateDelete;
    this.dialogRef = this.dialog.open(ModalGenericComponent, {
      width: "450px",
      data: {
        title,
        template,
      },
    });

    this.subscription = this.dialogRef.beforeClosed().subscribe(() => {
      // this.getContentBussiness();
    });
  }

  public cancelDelete() {
    this.dialog.closeAll();
  }

  public deleteNavigationSectionService() {
    let datos = { id: this.link.id };
    this.content
      .deleteFooterSection(datos)
      .subscribe((resp: ResponseService) => {
        if (resp.state === "Success") {
          this.dialog.closeAll();
        } else {
          console.log("Upss Hubo un problema vuelve a intentarlo");
        }
      });
  }
}
