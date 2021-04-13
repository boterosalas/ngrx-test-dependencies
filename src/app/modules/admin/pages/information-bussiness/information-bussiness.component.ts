import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface PeriodicElement {
  drag: any;
  bussiness: any;
  activated: any;
}
@Component({
  selector: 'app-information-bussiness',
  templateUrl: './information-bussiness.component.html',
  styleUrls: ['./information-bussiness.component.scss']
})
export class InformationBussinessComponent implements OnInit {
  id: string;
  title: string;
  displayedColumns: string[] = ['drag', 'title', 'description', 'edition'];
  image: string;
  aboutBusiness: string;
  idSaveTip: number;
  generalInfo: string;
  idInfo: number;
  dataTip: FormGroup;
  aboutBuss: FormGroup;
  dataEditTip: FormGroup
  @ViewChild("templateAddTips", { static: false }) templateAddTip: TemplateRef<any>;
  @ViewChild("templateEditTips", { static: false }) templateEditTip: TemplateRef<any>;
  exceptionsInfo: string;
  idExceptions: number;
  caseSpecial: string;
  idCaseSpecial: number;
  @ViewChild('table', { static: false }) table: MatTable<PeriodicElement>;
  dataSource = []
  private subscription: Subscription = new Subscription();
  constructor(
    private content: ContentService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    this.dataTip = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.aboutBuss = this.fb.group({
      aboutBuss: [null, [Validators.maxLength(1800), Validators.required, Validators.minLength(10)]]
    });
    this.dataEditTip = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.subscription = this.route.params.subscribe((route) => {
      if (
        route.id === undefined &&
        route.titulo === undefined &&
        route.imagen === undefined

      ) {
        this.id = "1";
        this.title = "exito";
        this.image =
          "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.svg";
      } else {
        this.id = route.id;
        this.title = route.titulo;
        this.image = route.imagen;
        this.getBusinessData();

      }
    });
  }

  ngOnInit() {
  }
  getBusinessData() {
    this.content.getBusinessById(this.id).subscribe((resp) => {
      this.aboutBuss.controls.aboutBuss.setValue(resp.about)
      //this.aboutBusiness = resp.about;
      this.dataSource = resp.tips;
      if (resp.terms.length > 0) {
        this.generalInfo = resp.terms[0].description;
        this.idInfo = resp.terms[0].id
        this.exceptionsInfo = resp.terms[1].description;
        this.idExceptions = resp.terms[1].id
        this.caseSpecial = resp.terms[2].description;
        this.idCaseSpecial = resp.terms[2].id
      }

      console.log(this.idCaseSpecial);
      console.log(this.idExceptions);
      console.log(this.idInfo);
    })
  }
  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    let datosSourceSend = []
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].orderby = i + 1
      datosSourceSend.push({
        id: this.dataSource[i].id,
        orderby: i + 1
      })
    }
    this.saveOrder(datosSourceSend)
  }
  saveOrder(datos) {
    this.content.saveOrderTipBusiness(datos).subscribe((resp) => {

    })
  }
  addAboutBussiness() {
    let datos = {
      id: this.id, //idbusiness
      about: this.aboutBuss.controls.aboutBuss.value
    }
    this.content.saveInfoBusiness(datos).subscribe((resp) => {
      Swal.fire({
        text: "Los cambios se han guardado correctamente.",
        type: "success",
        confirmButtonText: "Aceptar",
        confirmButtonClass: "upload-success"
      }).then(() => {
      });
    })
  }
  comprobarText(id, datos) {
    if (id === undefined) {
      return {
        dmBusinessId: this.id,
        title: datos.title,
        description: datos.description
      }
    } else {
      return {
        id: id,
        dmBusinessId: this.id,
        title: datos.title,
        description: datos.description
      }
    }
  }
  addTermsConditions() {
    let datos = {
      dmBusinessId: this.id,
      title: "General",
      description: this.generalInfo
    };
    let datosSend = this.comprobarText(this.idInfo, datos)
    let datos2 = {
      dmBusinessId: this.id,
      title: "Excepciones",
      description: this.exceptionsInfo
    }
    let datosSend2 = this.comprobarText(this.idExceptions, datos2)
    let datos3 = {
      dmBusinessId: this.id,
      title: "Casos Especiales",
      description: this.caseSpecial
    }
    let datosSend3 = this.comprobarText(this.idCaseSpecial, datos3);
    let array = [datosSend, datosSend2, datosSend3];
    this.content.saveTermsConditions(array).subscribe((resp) => {
      Swal.fire({
        text: "Los cambios se han guardado correctamente.",
        type: "success",
        confirmButtonText: "Aceptar",
        confirmButtonClass: "upload-success"
      }).then(() => {
      });
    })

  }
  onNoClick() {
    this.dialog.closeAll();
  }
  addTip() {
    if (this.dataSource.length > 4) {
      Swal.fire({
        text: "Recuerda que se permiten solo 5 tips por negocio.",
        type: "error",
        confirmButtonText: "Aceptar",
        confirmButtonClass: "upload-success"
      }).then(() => {
      });
    } else {
      const title = "Nuevo Tip";
      const idBussiness = this.id;
      const edit = 0;
      const template = this.templateAddTip;
      let dialogRef1 = this.dialog.open(ModalGenericComponent, {
        width: "450px",
        data: {
          title,
          idBussiness,
          template,
          edit
        },
      });

    }

  }
  saveTip() {
    let datos = {
      dmBusinessId: 1,
      title: this.dataTip.controls.title.value,
      description: this.dataTip.controls.description.value
    }
    this.content.saveTipBusiness(datos).subscribe((resp) => {
      this.getBusinessData();
      this.dialog.closeAll();
    })
  }
  editTipModal(element) {
    const title = "Editar Tip";
    const idBussiness = this.id;
    const edit = 0;
    const template = this.templateEditTip;
    this.idSaveTip = element.id;
    this.dataEditTip.controls.title.setValue(element.title);
    this.dataEditTip.controls.description.setValue(element.description);
    let dialogRef1 = this.dialog.open(ModalGenericComponent, {
      width: "450px",
      data: {
        title,
        idBussiness,
        template,
        edit
      },
    });

  }
  editTip() {
    let datos = {
      id: this.idSaveTip,
      dmBusinessId: this.id,
      title: this.dataEditTip.controls.title.value,
      description: this.dataEditTip.controls.description.value
    }
    this.content.saveTipBusiness(datos).subscribe((resp) => {
      this.getBusinessData();
      this.dialog.closeAll();
    })
  }
  deleteTip(item) {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar Tip</h3> <p class='w-container'>¿Estás seguro de eliminar el tip seleccionado?</p>",
      confirmButtonText: "Eliminar tip",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonClass: "updateokdelete order-last",
      cancelButtonClass: "updatecancel",
      allowOutsideClick: false
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.content.deleteTipBusiness(item.id).subscribe((resp) => {
          this.getBusinessData();
        })
      }
    })
  }
}
