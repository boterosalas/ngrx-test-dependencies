import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatTableDataSource } from '@angular/material';
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
  pageIndex: number = 0;
  pageTo: number = 50;
  totalItems: number;
  newsUser: Array<any>;
  pageSize: number;
  from: any;
  to: any;
  paginate: string;
  @ViewChild("templateAddCategory", { static: false }) templateAddCategory: TemplateRef<any>;
  @ViewChild("templateEditCategory", { static: false }) templateEditCategory: TemplateRef<any>;
  dataSource = [{
    code: 2,
    description: "Tecnología",
    commissionClicker: "4.3%",
    commissionBusiness: "4.3%",
    commissionTotal: "4.3%"
  }, {
    code: 3,
    description: "Tecnología",
    commissionClicker: "4.3%",
    commissionBusiness: "4.3%",
    commissionTotal: "4.3%"
  }, {
    code: 4,
    description: "Tecnología",
    commissionClicker: "4.3%",
    commissionBusiness: "4.3%",
    commissionTotal: "4.3%"
  }]
  displayedColumns: string[] = ['code', 'nombreCat', 'comisionClik', 'comisionBus', 'comisionTotal', 'actions'];
  image: string;
  marketplace: boolean = false;
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
    this.searchUser("");
  }
  saveComisionCategory() {
    let datos = {
      code: this.dataTip.controls.codCategory.value,
      description: this.dataTip.controls.nameCategory.value,
      commissionClicker: this.dataTip.controls.comisionClicker.value,
      commissionBusiness: this.dataTip.controls.commisionBussiness.value,
      idBussiness: this.id
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
    //this.subscription = dialogRef1.beforeClosed().subscribe(() => {
    //this.getBusinessData();
    //});
  }
  editSaveComisionCategory() {
    let datos = {
      id: this.idComision,
      code: this.dataEditTip.controls.codCategory.value,
      description: this.dataEditTip.controls.nameCategory.value,
      commissionClicker: this.dataEditTip.controls.comisionClicker.value,
      commissionBusiness: this.dataEditTip.controls.commisionBussiness.value,
      idBussiness: this.id
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
  }
  public pagination(paginate: any) {
    this.pageIndex = paginate.pageIndex;
    paginate.length = this.totalItems;
    this.from = paginate.pageSize * paginate.pageIndex + 1;
    this.to = paginate.pageSize * (paginate.pageIndex + 1);
    this.searchUser(this.paginate, this.from, this.to);
  }
  public searchUser(
    term,
    from = 1,
    to = this.pageTo,
    orderOrigin = "",
    orderBy = ""
  ) {
    if (term !== this.paginate) {
      this.paginate = term;
      this.pageIndex = 0;
    }
    const params = { term, from, to, orderOrigin, orderBy };
    this.subscription = this.content.getComisionManage(params).subscribe((user: any) => {
      this.newsUser = user.novelties;
      this.totalItems = user.total;
      //this.dataSource = new MatTableDataSource<any>(this.newsUser);
    });
  }
  sort(event) {
    let name = event.active.toUpperCase();
    let direction = event.direction.toUpperCase();
    if (direction === "") {
      name = "";
    }
    this.searchUser(this.paginate, this.from, this.to, name, direction);
  }
}
