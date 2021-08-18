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
  styleUrls: ['./information-bussiness.component.scss'],
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
  termsData: FormGroup;
  aboutBuss: FormGroup;
  dataEditTip: FormGroup;
  @ViewChild('templateAddTips', { static: false })
  templateAddTip: TemplateRef<any>;
  @ViewChild('templateEditTips', { static: false })
  templateEditTip: TemplateRef<any>;
  exceptionsInfo: string;
  idExceptions: number;
  caseSpecial: string;
  idCaseSpecial: number;
  @ViewChild('table', { static: false }) table: MatTable<PeriodicElement>;
  dataSource = [];
  private subscription: Subscription = new Subscription();
  constructor(private content: ContentService, private route: ActivatedRoute, private dialog: MatDialog, private fb: FormBuilder) {
    this.dataTip = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    });
    this.termsData = this.fb.group({
      general: [null, [Validators.required]],
      exceptions: [null, [Validators.required]],
      caseSpecial: [null, [Validators.required]],
    });
    this.aboutBuss = this.fb.group({
      aboutBuss: [null, [Validators.maxLength(1800), Validators.required, Validators.minLength(10)]],
    });
    this.dataEditTip = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    });
    this.subscription = this.route.params.subscribe((route) => {
      if (route.id === undefined && route.titulo === undefined && route.imagen === undefined) {
        this.id = '1';
        this.title = 'exito';
        this.image = 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.svg';
      } else {
        this.id = route.id;
        this.title = route.titulo;
        this.image = route.imagen;
        this.getBusinessData();
      }
    });
  }

  ngOnInit() {}
  getBusinessData() {
    this.content.getBusinessById(this.id).subscribe((resp) => {
      this.aboutBuss.controls.aboutBuss.setValue(resp.about);
      this.dataSource = resp.tips;
      if (resp.terms.length > 0) {
        this.termsData.controls.general.setValue(resp.terms[0].description);
        this.idInfo = resp.terms[0].id;
        this.termsData.controls.exceptions.setValue(resp.terms[1].description);
        this.idExceptions = resp.terms[1].id;
        this.termsData.controls.caseSpecial.setValue(resp.terms[2].description);
        this.idCaseSpecial = resp.terms[2].id;
      }
    });
  }
  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    const datosSourceSend = [];
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].orderby = i + 1;
      datosSourceSend.push({
        id: this.dataSource[i].id,
        orderby: i + 1,
      });
    }
    this.saveOrder(datosSourceSend);
  }
  saveOrder(datos) {
    this.content.saveOrderTipBusiness(datos).subscribe((resp) => {});
  }
  addAboutBussiness() {
    const datos = {
      id: this.id,
      about: this.aboutBuss.controls.aboutBuss.value,
    };
    this.content.saveInfoBusiness(datos).subscribe(() => {
      Swal.fire({
        text: 'Los cambios se han guardado correctamente.',
        type: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'upload-success',
      });
    });
  }
  comprobarText(id, datos) {
    if (id === undefined) {
      return {
        dmBusinessId: this.id,
        title: datos.title,
        description: datos.description,
      };
    } else {
      return {
        id: id,
        dmBusinessId: this.id,
        title: datos.title,
        description: datos.description,
      };
    }
  }
  addTermsConditions() {
    const datos = {
      dmBusinessId: this.id,
      title: 'General',
      description: this.termsData.controls.general.value,
    };
    const datosSend = this.comprobarText(this.idInfo, datos);
    const datos2 = {
      dmBusinessId: this.id,
      title: 'Excepciones',
      description: this.termsData.controls.exceptions.value,
    };
    const datosSend2 = this.comprobarText(this.idExceptions, datos2);
    const datos3 = {
      dmBusinessId: this.id,
      title: 'Casos Especiales',
      description: this.termsData.controls.caseSpecial.value,
    };
    const datosSend3 = this.comprobarText(this.idCaseSpecial, datos3);
    const array = [datosSend, datosSend2, datosSend3];
    this.content.saveTermsConditions(array).subscribe((saveTerms) => {
      Swal.fire({
        text: 'Los cambios se han guardado correctamente.',
        type: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'upload-success',
      });
    });
  }
  onNoClick() {
    this.dialog.closeAll();
  }
  addTip() {
    if (this.dataSource.length > 4) {
      Swal.fire({
        text: 'Recuerda que se permiten sólo 5 tips por negocio.',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'upload-success',
      }).then(() => {});
    } else {
      const title = 'Nuevo Tip';
      const idBussiness = this.id;
      const edit = 0;
      const template = this.templateAddTip;
      this.dialog.open(ModalGenericComponent, {
        width: '450px',
        data: {
          title,
          idBussiness,
          template,
          edit,
        },
      });
    }
  }
  saveTip() {
    const datos = {
      dmBusinessId: this.id,
      title: this.dataTip.controls.title.value,
      description: this.dataTip.controls.description.value,
    };
    this.content.saveTipBusiness(datos).subscribe((resp) => {
      this.getBusinessData();
      this.dialog.closeAll();
      this.dataTip.reset();
    });
  }
  editTipModal(element) {
    const title = 'Editar Tip';
    const idBussiness = this.id;
    const edit = 0;
    const template = this.templateEditTip;
    this.idSaveTip = element.id;
    this.dataEditTip.controls.title.setValue(element.title);
    this.dataEditTip.controls.description.setValue(element.description);
    this.dialog.open(ModalGenericComponent, {
      width: '450px',
      data: {
        title,
        idBussiness,
        template,
        edit,
      },
    });
  }
  editTip() {
    const datos = {
      id: this.idSaveTip,
      dmBusinessId: this.id,
      title: this.dataEditTip.controls.title.value,
      description: this.dataEditTip.controls.description.value,
    };
    this.content.saveTipBusiness(datos).subscribe((resp) => {
      this.getBusinessData();
      this.dialog.closeAll();
      this.dataEditTip.reset();
    });
  }
  deleteTip(item) {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar Tip</h3> <p class='w-container'>¿Estás seguro de eliminar el tip seleccionado?</p>",
      confirmButtonText: 'Eliminar tip',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonClass: 'updateokdelete order-last',
      cancelButtonClass: 'updatecancel',
      allowOutsideClick: false,
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.content.deleteTipBusiness(item.id).subscribe(() => {
          this.getBusinessData();
        });
      }
    });
  }
}
