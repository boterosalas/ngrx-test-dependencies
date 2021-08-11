import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
export interface PeriodicElementComision {
  drag: any;
  bussiness: any;
  comision: any;
  button: any;
}
@Component({
  selector: 'app-commission',
  templateUrl: './dialog-commission.component.html',
  styleUrls: ['./dialog-commission.component.scss'],
})
export class DialogCommissionComponent implements OnInit {
  dataSource: any;
  disabledButton = true;
  arrayComision: any;
  id: any;
  elemento: any;
  title: any;
  displayedColumnsComision: string[] = ['drag', 'bussiness', 'comision', 'button'];
  image: any;
  @ViewChild('templateNewEdit', { static: false })
  templateDelete: TemplateRef<any>;
  componentLector = true;
  @ViewChild('table2', { static: false })
  table2: MatTable<PeriodicElementComision>;
  private subscription: Subscription = new Subscription();
  constructor(private dialog: MatDialog, private content: ContentService, private route: ActivatedRoute) {
    this.subscription = this.route.params.subscribe((route) => {
      if (route.id === undefined && route.titulo === undefined && route.imagen === undefined) {
        this.id = '1';
        this.title = 'exito';
        this.image = 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.svg';
      } else {
        this.id = route.id;
        this.title = route.titulo;
        this.image = route.imagen;
      }
    });
  }
  ngOnInit() {
    if (this.componentLector === true) {
      this.updateComision();
    }
  }

  dropTableComision(event: CdkDragDrop<PeriodicElementComision[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table2.renderRows();
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].orderby = i + 1;
    }

    this.saveComision();
  }
  validation(elemento: any) {
    if (this.elemento.description === '' || this.elemento.commission === '') {
      this.disabledButton = true;
    } else {
      this.disabledButton = false;
    }
  }
  updateComision() {
    this.content.getCommissionsData(this.id).subscribe((resp) => {
      this.arrayComision = resp;
      const datosComision = Object.values(this.arrayComision);
      this.dataSource = datosComision[0];
      for (let index = 0; index < this.dataSource.length; index++) {
        this.dataSource[index].orderby = index;
      }
    });
  }

  newComision() {
    this.disabledButton = true;
    if (this.dataSource === undefined) {
      this.elemento = {
        description: '',
        commission: '',
        orderby: 0,
        idBusiness: this.id,
      };
    } else {
      this.elemento = {
        description: '',
        commission: '',
        orderby: this.dataSource.length - 1,
        idBusiness: this.id,
      };
    }
    const title = 'Nueva categoría';
    const template = this.templateDelete;
    this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        template,
      },
    });
  }
  saveComision() {
    this.content.saveComision(this.dataSource).subscribe((resp) => {
      this.updateComision();
      this.disabledButton = true;
    });
  }
  saveComisionSend(data) {
    this.content.saveComision([data]).subscribe((resp) => {
      this.updateComision();
      this.dialog.closeAll();
    });
  }
  cancelEdit() {
    this.dialog.closeAll();
  }
  editCategory(element) {
    this.disabledButton = true;
    this.elemento = element;
    const title = 'Editar categoría';
    const template = this.templateDelete;
    this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        template,
      },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.updateComision();
    });
  }
  saveInformation() {
    this.saveComisionSend(this.elemento);
  }
  deleteComision(content: any, index: number) {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar categoría</h3> <p class='w-container'>¿Estás seguro de eliminar la categoría seleccionada?</p>",
      confirmButtonText: 'Eliminar categoría',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonClass: 'updateokdelete order-last',
      cancelButtonClass: 'updatecancel',
      allowOutsideClick: false,
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        if (content.hasOwnProperty('id')) {
          this.content.deleteComision(content.id).subscribe(() => {
            this.updateComision();
            this.table2.renderRows();
          });
        } else {
          this.dataSource.splice(index, 1);
          this.table2.renderRows();
        }
      }
    });
  }
}
