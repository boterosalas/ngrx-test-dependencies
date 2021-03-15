import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog, MatTable } from '@angular/material';
import { LinksService } from "src/app/services/links.service";
import { Router } from '@angular/router';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';
export interface PeriodicElement {
  drag: any;
  bussiness: any;
  activated: any;

}
@Component({
  selector: 'app-table-activate-business',
  templateUrl: './table-activate-business.component.html',
  styleUrls: ['./table-activate-business.component.scss']
})

export class TableActivateBusinessComponent implements OnInit {

  constructor(
    private file: LinksService,
    public router: Router,
    private dialog: MatDialog,
    private content: ContentService,
  ) { }
  //dataSource: any;
  @Input() dataSource;
  @Output() activateBusiness = new EventEmitter;
  @ViewChild('table', { static: false }) table: MatTable<PeriodicElement>;
  @ViewChild("templateComision", { static: false }) templateComision: TemplateRef<
    any
  >;
  idBussinessSelected: number;
  displayedColumns: string[] = ['drag', 'bussiness', 'activate', 'category'];
  arrayComision: any[];
  disabledButton: boolean = true;
  ngOnInit() {
  }
  dataComision: any;
  activate(dataSource) {
    this.activateBusiness.emit(dataSource);
  }
  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    let datosSourceSend = []
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].orderby = i + 1
      datosSourceSend.push({
        idbusiness: this.dataSource[i].id,
        order: i + 1
      })
    }
    this.saveOrder(datosSourceSend)
  }
  saveOrder(datos: any) {
    this.file.putOrder(datos).subscribe(resp => {
      console.log(resp)
    })
  }

  editCategory(element: any) {
    this.router.navigate([
      "/bussiness-admin",
      {
        id: element.id,
        titulo: element.description,
        imagen: element.imageurl
      },
    ]);
  }

  contentBussiness(contenido: any) {
    this.router.navigate([
      "/content-admin",
      {
        id: contenido.id,
        titulo: contenido.description,
        imagen: contenido.imageurl
      },
    ]);
  }
  comisionTable(contenido: any) {
    this.idBussinessSelected = contenido.id;
    this.updateComision()
    let title = 'Comisiones'
    let template = this.templateComision;
    this.disabledButton = true;
    this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        template,
      },
    });
  }
  updateComision() {
    this.content.getCommissionsData(this.idBussinessSelected).subscribe((resp) => {
      this.arrayComision = resp;
      let datosComision = Object.values(this.arrayComision);
      this.dataComision = datosComision[0];
      for (let index = 0; index < this.dataComision.length; index++) {
        delete this.dataComision[index].tab;
      }
    })
  }
  updateComisionDelete() {
    this.content.getCommissionsData(this.idBussinessSelected).subscribe((resp) => {
      this.arrayComision = resp;
      let datosComision = Object.values(this.arrayComision);
      this.dataComision = datosComision[0];
      for (let index = 0; index < this.dataComision.length; index++) {
        delete this.dataComision[index].tab;
      }
      this.validation()
    })
  }
  newComision() {
    if (this.dataComision === undefined) {
      this.dataComision = [];
      this.dataComision.push({ idBusiness: this.idBussinessSelected, commission: '', description: '' })
      document.getElementById("description0").focus();
    } else {
      this.dataComision.push({ idBusiness: this.idBussinessSelected, commission: '', description: '' })
    }
    this.disabledButton = true;
  }
  saveComision() {
    this.content.saveComision(this.dataComision).subscribe((resp) => {
      this.updateComision()
      this.dialog.closeAll();
    })
  }
  deleteComision(content: any, index: number) {

    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar comisión</h3> <p class='w-container'>¿Estás seguro de eliminar la comisión seleccionada?</p>",
      confirmButtonText: "Eliminar comisión",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonClass: "updateokdelete order-last",
      cancelButtonClass: "updatecancel",
      allowOutsideClick: false
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        if (content.hasOwnProperty('id')) {
          this.content.deleteComision(content.id).subscribe((resp) => {
            this.updateComisionDelete()
          })
        } else {
          this.dataComision.splice(index, 1);
          this.validation()
        }
      }
    })

  }
  onNoClick() {
    this.dialog.closeAll();
  }
  validation() {
    console.log("Cambio")
    for (let index = 0; index < this.dataComision.length; index++) {
      if (this.dataComision[index].commission != "" && this.dataComision[index].description != "") {
        this.disabledButton = false;
      } else {
        this.disabledButton = true;
      }
    }
  }
}
