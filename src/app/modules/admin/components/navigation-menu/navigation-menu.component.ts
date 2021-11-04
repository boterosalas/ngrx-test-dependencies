import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { AuthService } from 'src/app/services/auth.service';
import { DialogNavigationItemComponent } from '../dialog-navigation-item/dialog-navigation-item.component';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements OnInit {
  dialogRef: MatDialogRef<any>;
  currentSection: any;
  @ViewChild('templateDeleteNavigationItem', { static: false })
  templateDeleteNavigationItem: TemplateRef<any>;
  currentLink: any = {};
  isInvalidAddSection = false;
  sectionsLinks: any = [];
  @ViewChild('templateDeleteNavigationGroup', { static: false })
  templateDeleteNavigationGroup: TemplateRef<any>;
  private subscription: Subscription = new Subscription();

  constructor(private dialog: MatDialog, public auth: AuthService) {}

  ngOnInit() {
    this.getSections();
  }

  saveOrderItems(data: any) {
    this.auth.saveOrderMenus(data).subscribe(() => {});
  }

  dropSection(event: CdkDragDrop<any>) {
    moveItemInArray(this.sectionsLinks, event.previousIndex, event.currentIndex);
    const dataSourceSend = [];
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

  changeStateOfItem(item: any) {
    if (item.active) {
      item.active = false;
    } else {
      item.active = true;
    }
    this.auth.saveMenu(item).subscribe(() => {});
  }

  cancelDelete() {
    this.dialog.closeAll();
  }

  editNavigationItem(item: any) {
    const data = {
      title: 'Editar acceso',
      buttonName: 'Guardar',
      edit: 1,
      id: item.Id,
      idseccion: item.idgrupo,
      link: item.route,
      description: item.description,
      orderby: item.orderby,
      icon: item.icon,
      isMenu: true,
    };

    const dialogRef1 = this.dialog.open(DialogNavigationItemComponent, {
      width: '450px',
      data: data,
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      this.getSections();
    });
  }

  addNavigationItem(section: any) {
    const dialogRef1 = this.dialog.open(DialogNavigationItemComponent, {
      width: '450px',
      data: {
        title: 'Agregar acceso',
        buttonName: 'Agregar',
        edit: 0,
        idseccion: section.id,
        rol: 'ANONYMOUS',
        isMenu: true,
      },
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      this.getSections();
    });
  }

  deleteNavigationItemService() {
    this.auth.deleteMenu(this.currentLink.Id).subscribe((resp: ResponseService) => {
      if (resp.state === 'Success') {
        this.dialog.closeAll();
      }
    });
  }

  deleteNavigationItem(item: any) {
    this.currentLink = item;

    const title = '';
    const template = this.templateDeleteNavigationItem;
    this.dialogRef = this.dialog.open(ModalGenericComponent, {
      width: '450px',
      data: {
        title,
        template,
      },
    });

    this.subscription = this.dialogRef.beforeClosed().subscribe(() => {
      this.getSections();
    });
  }
}
