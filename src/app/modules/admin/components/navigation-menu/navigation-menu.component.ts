import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Subscription } from "rxjs";
import { ResponseService } from "src/app/interfaces/response";
import { ModalGenericComponent } from "src/app/modules/shared/components/modal-generic/modal-generic.component";
import { AuthService } from "src/app/services/auth.service";
import { ContentService } from "src/app/services/content.service";
import { DialogNavigationItemComponent } from "../dialog-navigation-item/dialog-navigation-item.component";

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

  constructor(
    private dialog: MatDialog,
    public auth: AuthService
  ) {}

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
        isMenu: true,
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
      isMenu: true,
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
    this.auth
      .deleteMenu(this.currentLink.Id)
      .subscribe((resp: ResponseService) => {
        if (resp.state === "Success") {
          this.dialog.closeAll();
        }
      });
  }

  changeStateOfItem(item: any) {
    item.active = item.active ? false : true;
    this.auth.saveMenu(item).subscribe((resp: ResponseService) => {});
  }
}