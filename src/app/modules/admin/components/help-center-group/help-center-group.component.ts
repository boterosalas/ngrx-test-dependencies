import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { ContentService } from 'src/app/services/content.service';
import { DialogFaqGroupComponent } from '../dialog-faq-group/dialog-faq-group.component';
import { DialogFaqItemComponent } from '../dialog-faq-item/dialog-faq-item.component';

@Component({
  selector: 'app-help-center-group',
  templateUrl: './help-center-group.component.html',
  styleUrls: ['./help-center-group.component.scss']
})
export class HelpCenterGroupComponent implements OnInit {

  sectionsFaqs: any = [];
  private subscription: Subscription = new Subscription();
  @ViewChild("templateDeleteNavigationGroup", { static: false })
  templateDeleteNavigationGroup: TemplateRef<any>;
  @ViewChild("templateDeleteNavigationItem", { static: false })
  templateDeleteNavigationItem: TemplateRef<any>;
  @ViewChild("templatePreviewFaq", { static: false })
  templatePreviewFaq: TemplateRef<any>;

  dialogRef: MatDialogRef<any>;
  currentSection: any;
  currentLink: any = {};
  infoItemFaq:any;

  constructor(private content: ContentService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getFaqs();
  }

  saveOrderItems(data: any) {
    this.content.saveOrderFaqsItem(data).subscribe(() => {});
  }

  dropSection(event: CdkDragDrop<any>) {
    moveItemInArray(
      this.sectionsFaqs,
      event.previousIndex,
      event.currentIndex
    );
    let dataSourceSend = [];
    for (let i = 0; i < this.sectionsFaqs.length; i++) {
      this.sectionsFaqs[i].orderby = i + 1;
      dataSourceSend.push({
        id: this.sectionsFaqs[i].id,
        orderBy: i + 1,
      });
    }
    this.saveOrderSections(dataSourceSend);
  }

  private saveOrderSections(data: any) {
    this.content.saveOrderFaq(data).subscribe(() => {});
  }

  getFaqs() {
    this.subscription = this.content.getFaqs().subscribe((resp) => {
      this.sectionsFaqs = resp;
    });
  }

  addSection() {
    const dialogRef1 = this.dialog.open(DialogFaqGroupComponent, {
      data: {
        title: "Nuevo grupo", buttonName: "Agregar", edit: 0,
      },
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      this.getFaqs();
    });
  }

  

  editNavigationGroup(section: any) {
    const dialogRef1 = this.dialog.open(DialogFaqGroupComponent, {
      data: {
        title: "Editar grupo", buttonName: "Guardar", edit: 1, id: section.id, sectiontitle: section.sectiontitle, orderby: section.orderby, },
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      this.getFaqs();
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
      this.getFaqs();
    });
  }

  previewFaq(faq: any) {
    const title = faq.sectiontitle;
    this.infoItemFaq = faq.sectionvalue;
    const template = this.templatePreviewFaq;
    this.dialogRef = this.dialog.open(ModalGenericComponent, {
      width: '600px',
      data: {
        title,
        template,
      },
    });

  }

  cancelDelete() {
    this.dialog.closeAll();
  }

  

  deleteNavigationSectionService() {
    let datos = [this.currentSection.id];
    this.content
      .deleteFaqgroups(datos)
      .subscribe((resp: ResponseService) => {
        if (resp.state === "Success") {
          this.dialog.closeAll();
        }
      });
  }


  addNavigationItem(section: any) {
    const dialogRef1 = this.dialog.open(DialogFaqItemComponent, {
      data: {
        title: "Agregar pregunta frecuente",buttonName: "Agregar",edit: 0, idfaqsection: section.id,
      },
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      this.getFaqs();
    });
  }

  

  editNavigationItem(item: any) {
    const data = {
      title: "Editar pregunta frecuente", buttonName: "Guardar",edit: 1, id: item.id, idfaqsection: item.idfaqsection,
      description: item.sectiontitle, sectionvalue: item.sectionvalue, orderby: item.orderby,
    };

    const dialogRef1 = this.dialog.open(DialogFaqItemComponent, {
       data: data,
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      this.getFaqs();
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
      this.getFaqs();
    });
  }

  deleteNavigationItemService() {
    let datos = [this.currentLink.id];
    this.content.deleteFaqItems(datos).subscribe((resp: ResponseService) => {
      if (resp.state === "Success") {
        this.dialog.closeAll();
      }
    });
  }
  

}