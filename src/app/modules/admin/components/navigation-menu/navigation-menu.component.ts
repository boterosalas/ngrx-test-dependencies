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
    this.auth.saveOrderMenus(data).subscribe(() => {});
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
        id: this.sectionsLinks[i].Id,
        orderBy: i + 1,
      });
    }
    this.saveOrderItems(dataSourceSend);
  }  

  getSections() {
    this.subscription = this.auth.getmenusNoLogin().subscribe((resp) => {
      console.log(`resp`, resp[0].menus);
      this.sectionsLinks = resp[0].menus;

    });
  }

  cancelDelete() {
    this.dialog.closeAll();
  }

  addNavigationItem(section: any) {
    const dialogRef1 = this.dialog.open(DialogNavigationItemComponent, {
      width: "450px",
      data: {
        title: "Agregar acceso",
        buttonName: "Agregar",
        edit: 0,
        idseccion: section.id,
        rol: "ANONYMOUS",
        isMenu: true
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
      id: item.Id,
      idseccion: item.idgrupo,
      link: item.route,
      description: item.name,
      orderby: item.orderby,
      icon: item.icon,
      isMenu: true
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
    let idMenu = [this.currentLink.Id];
    this.auth.deleteMenu(idMenu).subscribe((resp: ResponseService) => {
      if (resp.state === "Success") {
        this.dialog.closeAll();
      } else {
        console.log("Upss Hubo un problema vuelve a intentarlo");
      }
    });
  }
}
