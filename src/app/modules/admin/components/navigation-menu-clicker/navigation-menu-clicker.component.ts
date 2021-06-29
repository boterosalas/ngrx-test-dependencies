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
  selector: "app-navigation-menu-clicker",
  templateUrl: "./navigation-menu-clicker.component.html",
  styleUrls: ["./navigation-menu-clicker.component.scss"],
})
export class NavigationMenuClickerComponent implements OnInit {
  sectionsLinks: any = [];
  links: any = [];
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
    private content: ContentService,
    private dialog: MatDialog,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.getSections();
  }

  saveOrderItems(data: any) {
    this.auth.saveOrderMenus(data).subscribe(() => {});
  }

  dropItem(event: CdkDragDrop<any>) {
    moveItemInArray(
      this.links,
      event.previousIndex,
      event.currentIndex
    );
    let dataSourceSend = [];
    for (let i = 0; i < this.links.length; i++) {
      this.links[i].orderby = i + 1;
      dataSourceSend.push({
        id: this.links[i].Id,
        orderBy: i + 1,
      });
    }
    this.saveOrderItems(dataSourceSend);
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
    console.log(`data`, data)
    this.auth.saveOrderGrupoMenus(data).subscribe(() => {});
  }

  getSections() {
    this.subscription = this.auth.getMenuClicker().subscribe((resp) => {
      console.log(`menu clicker`, resp)
      resp.map((item) => {
        if (item.description === 'Sin Grupo') {
          console.log(`item.menus`, item.menus)
          this.links = item.menus;
        }else{
          this.sectionsLinks.push(item);
        }
      })
    });
  }

  addSection() {
    const dialogRef1 = this.dialog.open(DialogNavigationGroupComponent, {
      data: {
        title: "Nuevo grupo",
        buttonName: "Agregar",
        edit: 0,
        isMenu: true,
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
    this.auth
      .deleteGroup(datos)
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
        idseccion: section === 'NuevoMenu' ? null : section.id,
        isMenu: true,
        rol: "CLICKER",

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
      id: item.id || item.Id,
      idseccion: item.idseccion || item.idgrupo,
      link: item.link || item.route,
      description: item.description || item.name,
      orderby: item.orderby,
      date: item.date,
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
    let idMenu = [this.currentLink.Id];
    this.auth.deleteMenu(idMenu).subscribe((resp: ResponseService) => {
      if (resp.state === "Success") {
        this.dialog.closeAll();
      } else {
        console.log("Upss Hubo un problema vuelve a intentarlo");
      }
    });
  }

  changeStateOfItem(item: any) {
    item.active = item.active ? false : true;
    this.auth.saveMenu(item).subscribe((resp: ResponseService) => {});
  }
}
