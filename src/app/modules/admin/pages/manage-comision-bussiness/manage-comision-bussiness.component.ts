import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-comision-bussiness',
  templateUrl: './manage-comision-bussiness.component.html',
  styleUrls: ['./manage-comision-bussiness.component.scss']
})
export class ManageComisionBussinessComponent implements OnInit {
  id: string;
  title: string;
  dataTip: FormGroup;
  dataEditTip: FormGroup;
  @ViewChild("templateAddCategory", { static: false }) templateAddCategory: TemplateRef<any>;
  @ViewChild("templateEditCategory", { static: false }) templateEditCategory: TemplateRef<any>;
  dataSource = [{
    codigo: 2,
    nombreCat: "Tecnología",
    commisionClic: "4.3%",
    commisionBuss: "4.3%",
    commisionTotal: "4.3%"
  }, {
    codigo: 3,
    nombreCat: "Tecnología",
    commisionClic: "4.3%",
    commisionBuss: "4.3%",
    commisionTotal: "4.3%"
  }, {
    codigo: 4,
    nombreCat: "Tecnología",
    commisionClic: "4.3%",
    commisionBuss: "4.3%",
    commisionTotal: "4.3%"
  }]
  displayedColumns: string[] = ['code', 'nombreCat', 'comisionClik', 'comisionBus', 'comisionTotal', 'actions'];
  image: string;
  idComision: string;
  private subscription: Subscription = new Subscription();
  constructor(
    private content: ContentService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    this.dataTip = this.fb.group({
      codCategory: [null, Validators.required],
      nameCategory: [null, Validators.required],
      comisionClicker: [null, Validators.required],
      commisionBussiness: [null, Validators.required]
    });
    this.dataEditTip = this.fb.group({
      codEditCategory: [null, Validators.required],
      nameEditCategory: [null, Validators.required],
      comisionEditClicker: [null, Validators.required],
      commisionEditBussiness: [null, Validators.required]
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
      }
    });
  }

  ngOnInit() {
  }
  saveComisionCategory() {
    let datos = {
      codCategory: this.dataTip.controls.codCategory.value,
      nameCategory: this.dataTip.controls.nameCategory.value,
      comisionClicker: this.dataTip.controls.comisionClicker.value,
      commisionBussiness: this.dataTip.controls.commisionBussiness.value
    }
    this.content.saveComisionCategory(datos).subscribe((resp) => {

    })

  }
  deleteCategoryCom(item) {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar Categoría</h3> <p class='w-container'>¿Estás seguro de eliminar la categoría seleccionada?</p>",
      confirmButtonText: "Eliminar Categoría",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonClass: "updateokdelete order-last",
      cancelButtonClass: "updatecancel",
      allowOutsideClick: false
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.content.deleteComisionCategoryBusiness(item.id).subscribe((resp) => {
          //this.getBusinessData();
        })
      }
    })
  }
  onNoClick() {
    this.dialog.closeAll();
  }
  editCategoryCom(element) {
    const title = "Editar Categoría";
    const idBussiness = this.id;
    const edit = 0;
    const template = this.templateEditCategory;
    this.dataEditTip.controls.codEditCategory.setValue(element.codigo)
    this.dataEditTip.controls.nameEditCategory.setValue(element.nombreCat)
    this.dataEditTip.controls.comisionEditClicker.setValue(element.commisionClic)
    this.dataEditTip.controls.commisionEditBussiness.setValue(element.commisionBuss)
    this.idComision = element.codigo;
    let dialogRef1 = this.dialog.open(ModalGenericComponent, {
      width: "450px",
      data: {
        title,
        idBussiness,
        template,
        edit
      },
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      //this.getBusinessData();
    });
  }
  editSaveComisionCategory() {
    let datos = {
      id: this.idComision,
      codCategory: this.dataEditTip.controls.codCategory.value,
      nameCategory: this.dataEditTip.controls.nameCategory.value,
      comisionClicker: this.dataEditTip.controls.comisionClicker.value,
      commisionBussiness: this.dataEditTip.controls.commisionBussiness.value
    }
    this.content.saveComisionCategory(datos).subscribe((resp) => {

    })

  }
  addComisionCategory() {
    const title = "Nuevo Categoría";
    const idBussiness = this.id;
    const edit = 0;
    const template = this.templateAddCategory;
    let dialogRef1 = this.dialog.open(ModalGenericComponent, {
      width: "450px",
      data: {
        title,
        idBussiness,
        template,
        edit
      },
    });
    this.subscription = dialogRef1.beforeClosed().subscribe(() => {
      //this.getBusinessData();
    });
  }
}
