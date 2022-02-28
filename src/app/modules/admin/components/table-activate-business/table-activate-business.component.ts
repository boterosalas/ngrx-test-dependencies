import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { LinksService } from 'src/app/services/links.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { ContentService } from 'src/app/services/content.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseService } from 'src/app/interfaces/response';

export interface PeriodicElement {
  drag: any;
  bussiness: any;
  activated: any;
}

@Component({
  selector: 'app-table-activate-business',
  templateUrl: './table-activate-business.component.html',
  styleUrls: ['./table-activate-business.component.scss'],
})
export class TableActivateBusinessComponent implements OnInit {
  dateForm: FormGroup;
  constructor(
    private file: LinksService,
    public router: Router,
    private dialog: MatDialog,
    private content: ContentService,
    private fb: FormBuilder
  ) {}

  @Input() dataSource;
  @Output() activateBusiness = new EventEmitter();
  @Output() updateBusiness = new EventEmitter();
  @ViewChild('table', { static: false }) table: MatTable<PeriodicElement>;

  @ViewChild('templateBussiness', { static: false })
  templateBussiness: TemplateRef<any>;
  idBussinessSelected: number;
  displayedColumns: string[] = ['drag', 'bussiness', 'id', 'activate', 'category'];
  displayedColumnsComision: string[] = ['drag', 'bussiness', 'comision', 'button'];
  arrayComision: any[];
  disabledButton = true;
  formData: FormData = new FormData();
  selectedItem: any;
  fileImgCat: any = '';
  nameFileCert = '';
  showErrorCert: boolean;
  fileImgCat2: any = '';
  nameFileCert2 = '';
  showErrorCert2: boolean;
  activebutton: boolean;
  validFormat: boolean;
  dataComision: any;
  category: object[] = [];


  ngOnInit() {
    this.dateForm = this.fb.group({
      nameBussiness: [null, Validators.required],
      category:['', Validators.required],
      detailBussiness: [null, Validators.required],
      nameTableCommision: [null, Validators.required],
      placeholderBussiness: [null, Validators.required],
      codeReference: [null],
      image: [null],
      image2: [null],
      generateExcel: [false],
      visible: [false],
      hasproduct: [false],
    });
    this.getCategoriesBusiness();
  }

  activate(dataSource) {
    this.activateBusiness.emit(dataSource);
  }

  public getCategoriesBusiness() {
    this.content.getCategories().subscribe((categories) => {
       this.category = categories;
    })
  }

  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    const datosSourceSend = [];
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].orderby = i + 1;
      datosSourceSend.push({
        idbusiness: this.dataSource[i].id,
        order: i + 1,
      });
    }

    this.saveOrder(datosSourceSend);
  }

  saveOrder(datos: any) {
    this.file.putOrder(datos).subscribe();
  }

  editCategory(element: any) {
    this.router.navigate([
      '/bussiness-admin',
      {
        id: element.id,
        titulo: element.description,
        imagen: element.imageurl,
      },
    ]);
  }

  contentBussiness(data: any) {
    this.router.navigate([
      '/content-admin',
      {
        id: data.id,
        titulo: data.description,
        imagen: data.imageurl,
      },
    ]);
  }

  adminComisionBussiness(contenido: any) {
    this.router.navigate([
      '/manage-comision-admin',
      {
        id: contenido.id,
        titulo: contenido.description,
        imagen: contenido.imageurl,
      },
    ]);
  }

  comisionTable(item: any) {
    this.router.navigate([
      '/comision-admin',
      {
        id: item.id,
        titulo: item.description,
        imagen: item.imageurl,
      },
    ]);
  }

  informationBussiness(itemAdmin: any) {
    this.router.navigate([
      '/information-bussiness-admin',
      {
        id: itemAdmin.id,
        titulo: itemAdmin.description,
        imagen: itemAdmin.imageurl,
      },
    ]);
  }
  private getExtension(nameFile: string, getSize: number) {
    const splitExt = nameFile.split('.');
    const getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    if (getExt === 'svg') {
      this.validFormat = true;
    }
    if (getSize / 1000 > 300) {
      this.validFormat = false;
    }
  }
  public onFileChangeFiles(event, param: string) {
    const nameFile = event.target.files[0].name;
    const reader = new FileReader();
    const sizeFile = event.target.files[0].size;

    const fileList: FileList = event.target.files;
    this.getExtension(fileList[0].name, fileList[0].size);

    this.getExtension(fileList[0].name, fileList[0].size);

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileBlob = new Blob([file]);
      const file2 = new File([fileBlob], nameFile);
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.getExtension(nameFile, sizeFile);
        if (this.validFormat === true) {
          this.fileImgCat = reader.result;
          this.fileImgCat = this.fileImgCat.split(',')[1];
          this.nameFileCert = nameFile;
          this.showErrorCert = false;
          if (this.nameFileCert2 !== '') {
            this.activebutton = true;
          } else {
            this.activebutton = false;
          }
        } else {
          this.showErrorCert = true;
          this.nameFileCert = nameFile;
          this.activebutton = false;
        }
      };
    }
  }
  public onFileChangeFilesSecond(event, param: string) {
    const nameFile = event.target.files[0].name;
    const reader = new FileReader();
    const sizeFile = event.target.files[0].size;
    const fileList: FileList = event.target.files;
    this.getExtension(fileList[0].name, fileList[0].size);
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileBlob = new Blob([file]);
      const file2 = new File([fileBlob], nameFile);
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.getExtension(nameFile, sizeFile);
        if (this.validFormat === true) {
          this.fileImgCat2 = reader.result;
          this.fileImgCat2 = this.fileImgCat2.split(',')[1];
          this.nameFileCert2 = nameFile;
          this.showErrorCert2 = false;
          if (this.nameFileCert !== '') {
            this.activebutton = true;
          } else {
            this.activebutton = false;
          }
        } else {
          this.showErrorCert2 = true;
          this.nameFileCert2 = nameFile;
          this.activebutton = false;
        }
      };
    }
  }
  
  editBussiness(element: any) {
    this.selectedItem = element;
    this.dateForm.controls.nameBussiness.setValue(this.selectedItem.description);
    this.dateForm.controls.category.setValue(this.selectedItem.category);
    this.dateForm.controls.detailBussiness.setValue(this.selectedItem.infoaditional);
    this.dateForm.controls.nameTableCommision.setValue(this.selectedItem.tabtablecommission);
    this.dateForm.controls.placeholderBussiness.setValue(this.selectedItem.placeholder);
    this.dateForm.controls.codeReference.setValue(this.selectedItem.urlquerystring);
    this.dateForm.controls.generateExcel.setValue(this.selectedItem.excelcommission);
    this.dateForm.controls.visible.setValue(this.selectedItem.active);
    const datos = this.selectedItem.imageurl.split('/');
    this.nameFileCert = datos[datos.length - 1];
    this.nameFileCert2 = this.selectedItem.icondashboard;
    this.activebutton = true;
    const title = 'Editar Negocio';
    const template = this.templateBussiness;
    const id = 'video-modal';
    this.dialog.open(ModalGenericComponent, {
      data: {
        id,
        title,
        template,
      },
    });
  }
  agregarBussiness() {
    this.dateForm.controls.nameBussiness.setValue(null);
    this.dateForm.controls.category.setValue(null);
    this.dateForm.controls.detailBussiness.setValue(null);
    this.dateForm.controls.nameTableCommision.setValue(null);
    this.dateForm.controls.placeholderBussiness.setValue(null);
    this.dateForm.controls.codeReference.setValue(null);
    this.dateForm.controls.visible.setValue(false);
    this.dateForm.controls.hasproduct.setValue(false);
    this.dateForm.controls.generateExcel.setValue(false);
    this.nameFileCert = '';
    const title = 'Agregar Negocio';
    const template = this.templateBussiness;
    const id = 'video-modal';
    this.dialog.open(ModalGenericComponent, {
      data: {
        id,
        title,
        template,
      },
    });
  }
  onNoClick() {
    this.dialog.closeAll();
  }
  saveBussiness() {
    let datos;
    if (this.selectedItem) {
      if (this.fileImgCat !== '' && this.fileImgCat2 !== '') {
        datos = {
          id: this.selectedItem.id,
          description: this.dateForm.controls.nameBussiness.value,
          arraycategories:  this.dateForm.controls.category.value,
          infoAditional: this.dateForm.controls.detailBussiness.value,
          tabTableCommission: this.dateForm.controls.nameTableCommision.value,
          placeHolder: this.dateForm.controls.placeholderBussiness.value,
          active: this.dateForm.controls.visible.value,
          hasproduct: this.dateForm.controls.hasproduct.value,
          urlQueryString: this.dateForm.controls.codeReference.value,
          excelCommission: this.dateForm.controls.generateExcel.value,
          image: this.fileImgCat,
          icondashboardimage: this.fileImgCat2,
        };
      } else if (this.fileImgCat !== '' && this.fileImgCat2 === '') {
        datos = {
          id: this.selectedItem.id,
          description: this.dateForm.controls.nameBussiness.value,
          arraycategories:  this.dateForm.controls.category.value,
          infoAditional: this.dateForm.controls.detailBussiness.value,
          tabTableCommission: this.dateForm.controls.nameTableCommision.value,
          placeHolder: this.dateForm.controls.placeholderBussiness.value,
          active: this.dateForm.controls.visible.value,
          hasproduct: this.dateForm.controls.hasproduct.value,
          urlQueryString: this.dateForm.controls.codeReference.value,
          excelCommission: this.dateForm.controls.generateExcel.value,
          image: this.fileImgCat,
        };
      } else if (this.fileImgCat === '' && this.fileImgCat2 !== '') {
        datos = {
          id: this.selectedItem.id,
          description: this.dateForm.controls.nameBussiness.value,
          arraycategories:  this.dateForm.controls.category.value,
          infoAditional: this.dateForm.controls.detailBussiness.value,
          tabTableCommission: this.dateForm.controls.nameTableCommision.value,
          placeHolder: this.dateForm.controls.placeholderBussiness.value,
          active: this.dateForm.controls.visible.value,
          hasproduct: this.dateForm.controls.hasproduct.value,
          urlQueryString: this.dateForm.controls.codeReference.value,
          excelCommission: this.dateForm.controls.generateExcel.value,
          icondashboardimage: this.fileImgCat2,
        };
      } else {
        datos = {
          id: this.selectedItem.id,
          description: this.dateForm.controls.nameBussiness.value,
          arraycategories:  this.dateForm.controls.category.value,
          infoAditional: this.dateForm.controls.detailBussiness.value,
          tabTableCommission: this.dateForm.controls.nameTableCommision.value,
          placeHolder: this.dateForm.controls.placeholderBussiness.value,
          active: this.dateForm.controls.visible.value,
          hasproduct: this.dateForm.controls.hasproduct.value,
          urlQueryString: this.dateForm.controls.codeReference.value,
          excelCommission: this.dateForm.controls.generateExcel.value,
        };
      }
    } else {
      datos = {
        description: this.dateForm.controls.nameBussiness.value,
        arraycategories:  this.dateForm.controls.category.value,
        infoAditional: this.dateForm.controls.detailBussiness.value,
        tabTableCommission: this.dateForm.controls.nameTableCommision.value,
        placeHolder: this.dateForm.controls.placeholderBussiness.value,
        active: this.dateForm.controls.visible.value,
        hasproduct: this.dateForm.controls.hasproduct.value,
        urlQueryString: this.dateForm.controls.codeReference.value,
        excelCommission: this.dateForm.controls.generateExcel.value,
        image: this.fileImgCat,
        icondashboardimage: this.fileImgCat2,
      };
    }

    this.content.saveBussiness(datos).subscribe((resp) => {
      this.dateForm.reset();
      this.selectedItem = '';
      this.dialog.closeAll();
      this.fileImgCat = '';
      this.fileImgCat2 = '';
      this.nameFileCert2 = '';
      this.nameFileCert = '';
      this.updateBusiness.emit();
    });
  }

}
