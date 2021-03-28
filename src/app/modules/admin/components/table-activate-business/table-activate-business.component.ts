import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog, MatTable } from '@angular/material';
import { LinksService } from "src/app/services/links.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { ContentService } from 'src/app/services/content.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  dateForm: FormGroup
  constructor(
    private file: LinksService,
    public router: Router,
    private dialog: MatDialog,
    private content: ContentService,
    private fb: FormBuilder,
  ) { }
  //dataSource: any;
  @Input() dataSource;
  @Output() activateBusiness = new EventEmitter;
  @ViewChild('table', { static: false }) table: MatTable<PeriodicElement>;

  @ViewChild("templateBussiness", { static: false }) templateBussiness: TemplateRef<
    any
  >;
  idBussinessSelected: number;
  displayedColumns: string[] = ['drag', 'bussiness', 'activate', 'category'];
  displayedColumnsComision: string[] = ['drag', 'bussiness', 'comision', 'button'];
  arrayComision: any[];
  disabledButton: boolean = true;
  formData: FormData = new FormData();
  selectedItem: any;
  fileImgCat: any;
  nameFileCert: string = '';
  showErrorCert: boolean;
  activebutton: boolean;
  validFormat: boolean;
  ngOnInit() {
    this.dateForm = this.fb.group({
      nameBussiness: [null, Validators.required],
      detailBussiness: [null, Validators.required],
      nameTableCommision: [null, Validators.required],
      placeholderBussiness: [null, Validators.required],
      codeReference: [null, Validators.required],
      image: [null],

    });
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
  comisionTable(item: any) {
    this.router.navigate([
      "/comision-admin",
      {
        id: item.id,
        titulo: item.description,
        imagen: item.imageurl
      },
    ]);

  }
  private getExtension(nameFile: string, getSize: number) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    if (getExt === "svg" || getExt === "jpg") {
      this.validFormat = true;
    }
    if (getSize / 1000 > 100) {
      this.validFormat = false;
    }
  }
  public onFileChangeFiles(event, param: string) {
    let nameFile = event.target.files[0].name;
    let reader = new FileReader();
    let sizeFile = event.target.files[0].size;
    const file = event.target.files[0];
    let fileList: FileList = event.target.files;
    this.getExtension(fileList[0].name, fileList[0].size);
    //let sizeFile = event.target.files[0].size;
    this.getExtension(fileList[0].name, fileList[0].size);
    if (this.validFormat === true) {
      this.formData.append('File', fileList[0], fileList[0].name.replace(' ', '_'));
      this.formData.append('imageUrl', file.name.replace(' ', '_'));
      let nameFile = event.target.files[0].name;
      this.nameFileCert = nameFile;
      //const reader = new FileReader();
      //reader.onload = e => this.visualizationImag = reader.result;
      //reader.readAsDataURL(file);
      //this.comprobarText();
    }
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let fileBlob = new Blob([file]);
      let file2 = new File([fileBlob], nameFile);
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.getExtension(nameFile, sizeFile);
        if (this.validFormat === true) {
          this.fileImgCat = reader.result;
          this.fileImgCat = this.fileImgCat.split(",")[1]
          this.nameFileCert = nameFile;
          this.showErrorCert = false;
          this.activebutton = true;
        } else {
          this.showErrorCert = true;
          this.nameFileCert = nameFile;
          this.activebutton = false;
        }
      };
    }
  }
  editBussiness(element: any) {
    this.selectedItem = element;
    this.dateForm.controls.nameBussiness.setValue(this.selectedItem.description);
    this.dateForm.controls.detailBussiness.setValue(this.selectedItem.infoaditional);
    this.dateForm.controls.nameTableCommision.setValue(this.selectedItem.code);
    this.dateForm.controls.placeholderBussiness.setValue(this.selectedItem.placeholder);
    this.dateForm.controls.codeReference.setValue(this.selectedItem.code);
    this.nameFileCert = this.selectedItem.imageurl;
    this.activebutton = true;
    const title = "Editar Negocio";
    const template = this.templateBussiness;
    const id = "video-modal";
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
    this.dateForm.controls.detailBussiness.setValue(null);
    this.dateForm.controls.nameTableCommision.setValue(null);
    this.dateForm.controls.placeholderBussiness.setValue(null);
    this.dateForm.controls.codeReference.setValue(null);
    this.nameFileCert = "";
    const title = "Agregar Negocio";
    const template = this.templateBussiness;
    const id = "video-modal";
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
    //let datosSend = new FormData();

    this.formData.append('nameBussiness', this.dateForm.controls.nameBussiness.value);
    this.formData.append('detailBussiness', this.dateForm.controls.detailBussiness.value);
    this.formData.append('nameTableCommision', this.dateForm.controls.nameTableCommision.value);
    this.formData.append('placeholderBussiness', this.dateForm.controls.placeholderBussiness.value);
    this.formData.append('codeReference', this.dateForm.controls.codeReference.value);

    //let datos = {
    //  nameBussiness: this.dateForm.controls.nameBussiness.value,
    //detailBussiness: this.dateForm.controls.detailBussiness.value,
    //nameTableCommision: this.dateForm.controls.nameTableCommision.value,
    //placeholderBussiness:this.dateForm.controls.placeholderBussiness.value,
    //codeReference: this.dateForm.controls.codeReference.value
    //}
    this.content.saveBussiness(this.formData).subscribe((resp) => {
      this.formData.delete('nameBussiness');
      this.formData.delete('detailBussiness');
      this.formData.delete('nameTableCommision');
      this.formData.delete('placeholderBussiness');
      this.formData.delete('codeReference');
      this.formData.delete('File');
      this.formData.delete('imageUrl');

    })
  }
}
