import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Subscription } from "rxjs";
import { ContentService } from "src/app/services/content.service";
import { DialogNavigationGroupComponent } from "../dialog-navigation-group/dialog-navigation-group.component";
import { DialogNavigationItemComponent } from "../dialog-navigation-item/dialog-navigation-item.component";
import { ResponseService } from "src/app/interfaces/response";
import { ModalGenericComponent } from "src/app/modules/shared/components/modal-generic/modal-generic.component";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-navigation-menu",
  templateUrl: "./navigation-menu.component.html",
  styleUrls: ["./navigation-menu.component.scss"],
})
export class NavigationMenuComponent implements OnInit {
  sectionsLinks: any = [];
  private subscription: Subscription = new Subscription();
  @ViewChild("templateDeleteNavigationGroup", { static: false })
  templateDeleteNavigationGroup: TemplateRef<any>;
  @ViewChild("templateDeleteNavigationItem", { static: false })
  templateDeleteNavigationItem: TemplateRef<any>;

  dialogRef: MatDialogRef<any>;
  currentSection: any;
  currentLink: any = {};
  isInvalidAddSection: boolean = false;

  constructor(private content: ContentService, private dialog: MatDialog, public auth: AuthService) {}

  ngOnInit() {
    this.getSections();
  }

  saveOrderItems(data: any) {
    this.content.saveOrderFooterLinks(data).subscribe(() => {});
  }

  dropSection(event: CdkDragDrop<any>) {
    moveItemInArray(
      this.sectionsLinks,
      event.previousIndex,
      event.currentIndex
    );
    let dataSourceSend = [];
    for (let i = 0; i < this.sectionsLinks.length; i++) {
      this.sectionsLinks[i].orderby = i + 1;
      dataSourceSend.push({
        id: this.sectionsLinks[i].id,
        orderBy: i + 1,
      });
    }
    this.saveOrderSections(dataSourceSend);
  }

  saveOrderSections(data: any) {
    this.content.saveOrderFooterSections(data).subscribe(() => {});
  }

  getSections() {
    this.subscription = this.auth.getMenusFromAdmin().subscribe((resp) => {
      // console.log(`resp`, resp)
    });

    this.sectionsLinks = [
      {
        date: "2021-06-04T16:50:49.623",
        description: "Inicio",
        id: 1,
        link: "www.clickam.com",
        icon: "tio-home",
        orderby: 1,
      },
      {
        date: "2021-06-04T16:50:49.623",
        description: "Click Academy",
        id: 2,
        link: "www.google.com",
        icon: "tio-education",
        orderby: 2,
      },
    ];
  }

  addSection() {
    const dialogRef1 = this.dialog.open(DialogNavigationGroupComponent, {
      data: {
        title: "Nuevo grupo",
        buttonName: "Agregar",
        edit: 0,
      },
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      this.getSections();
    });
  }

  editNavigationGroup(section: any) {
    const dialogRef1 = this.dialog.open(DialogNavigationGroupComponent, {
      data: {
        title: "Editar grupo",
        buttonName: "Guardar",
        edit: 1,
        id: section.id,
        description: section.description,
        orderby: section.orderby,
      },
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      this.getSections();
    });
  }

  deleteNavigationGroup(section: any) {
    this.currentSection = section;

    const title = "";
    const template = this.templateDeleteNavigationGroup;
    this.dialogRef = this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        template,
      },
    });

    this.subscription = this.dialogRef.beforeClosed().subscribe(() => {
      this.getSections();
    });
  }

  cancelDelete() {
    this.dialog.closeAll();
  }

  deleteNavigationSectionService() {
    let datos = [this.currentSection.id];
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

  addNavigationItem(section: any) {
    const dialogRef1 = this.dialog.open(DialogNavigationItemComponent, {
      width: "450px",
      data: {
        title: "Agregar acceso",
        buttonName: "Agregar",
        edit: 0,
        idseccion: section.id,
      },
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      this.getSections();
    });
  }

  editNavigationItem(item: any) {
    const data = {
      title: "Editar acceso",
      buttonName: "Guardar",
      edit: 1,
      id: item.id,
      idseccion: item.idseccion,
      link: item.link,
      description: item.description,
      orderby: item.orderby,
      date: item.date,
    };

    const dialogRef1 = this.dialog.open(DialogNavigationItemComponent, {
      width: "450px",
      data: data,
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      this.getSections();
    });
  }

  deleteNavigationItem(item: any) {
    this.currentLink = item;

    const title = "";
    const template = this.templateDeleteNavigationItem;
    this.dialogRef = this.dialog.open(ModalGenericComponent, {
      width: "450px",
      data: {
        title,
        template,
      },
    });

    this.subscription = this.dialogRef.beforeClosed().subscribe(() => {
      this.getSections();
    });
  }

  deleteNavigationItemService() {
    let datos = [this.currentLink.id];
    this.content.deleteFooterLink(datos).subscribe((resp: ResponseService) => {
      if (resp.state === "Success") {
        this.dialog.closeAll();
      } else {
        console.log("Upss Hubo un problema vuelve a intentarlo");
      }
    });
  }
}
