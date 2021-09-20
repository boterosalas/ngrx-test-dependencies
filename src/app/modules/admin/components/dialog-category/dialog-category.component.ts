import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss'],
})
export class DialogCategoryComponent implements OnInit, OnDestroy {
  constructor(
    private content: ContentService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}
  @Output() getContentBussiness = new EventEmitter();
  datos = true;
  dateForm: FormGroup;
  validFormat: boolean;
  fileImgCat: any;
  nameFileCert = '';
  showErrorCert: boolean;
  activebutton: boolean;
  statusAc = true;
  storageNameFile = '';
  private subscription: Subscription = new Subscription();
  selecteds = [
    {
      titulo: 'Porcentaje (%)',
      value: 'PORCENTAJE',
    },
    {
      titulo: 'Fijo ($)',
      value: 'FIJO',
    },
  ];
  ngOnInit() {
    this.loadFormCategory();
  }
  public loadFormCategory() {
    if (this.data.edit === 1) {
      const dataImage = this.data.image;
      const datosImg = dataImage.split('/');
      this.nameFileCert = datosImg[datosImg.length - 1];
      this.storageNameFile = this.nameFileCert;
      this.statusAc = this.data.active;
      this.dateForm = this.fb.group({
        category: [this.data.name, Validators.required],
        description: [this.data.description, Validators.required],
        tipoCommision: [this.data.typeComision, Validators.required],
        commision: [this.data.comision, Validators.required],
        link: [this.data.link, Validators.required],
        image: [null],
        commisionBussiness: [this.data.comisionBussines, Validators.required],
      });

      this.activebutton = true;
    } else {
      this.dateForm = this.fb.group({
        category: [null, Validators.required],
        description: [null, Validators.required],
        tipoCommision: [null, Validators.required],
        commision: [null, Validators.required],
        link: [null, Validators.required],
        image: [null, Validators.required],
        commisionBussiness: [null, Validators.required],
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  private getExtension(nameFile: string, getSize: number) {
    const splitExt = nameFile.split('.');
    const getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    if (getExt === 'svg' || getExt === 'jpg') {
      this.validFormat = true;
    }
    if (getSize / 1000 > 100) {
      this.validFormat = false;
    }
  }
  public onFileChangeFiles(event, param: string) {
    const nameFile = event.target.files[0].name;
    const reader = new FileReader();
    const sizeFile = event.target.files[0].size;
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
          this.activebutton = true;
        } else {
          this.showErrorCert = true;
          this.nameFileCert = nameFile;
          this.activebutton = false;
        }
      };
    }
  }
  public agregarCategory() {
    let addCategory;
    if (this.data.edit === 0) {
      addCategory = {
        description: this.dateForm.controls.category.value,
        infoAditional: this.dateForm.controls.description.value,
        typeCommission: this.dateForm.controls.tipoCommision.value,
        commission: this.dateForm.controls.commision.value,
        link: this.dateForm.controls.link.value,
        imageURL: this.nameFileCert,
        image: this.fileImgCat,
        active: this.statusAc,
        commissionBusiness: this.dateForm.controls.commisionBussiness.value,
        idBusiness: this.data.idBussiness,
      };
    } else {
      if (this.fileImgCat) {
        addCategory = {
          id: this.data.id,
          description: this.dateForm.controls.category.value,
          infoAditional: this.dateForm.controls.description.value,
          typeCommission: this.dateForm.controls.tipoCommision.value,
          commission: this.dateForm.controls.commision.value,
          link: this.dateForm.controls.link.value,
          image: this.fileImgCat,
          imageURL: this.nameFileCert,
          active: this.statusAc,
          commissionBusiness: this.dateForm.controls.commisionBussiness.value,
          idBusiness: this.data.idBussiness,
        };
      } else {
        addCategory = {
          id: this.data.id,
          description: this.dateForm.controls.category.value,
          infoAditional: this.dateForm.controls.description.value,
          typeCommission: this.dateForm.controls.tipoCommision.value,
          commission: this.dateForm.controls.commision.value,
          link: this.dateForm.controls.link.value,
          image: '',
          imageURL: '',
          active: this.statusAc,
          commissionBusiness: this.dateForm.controls.commisionBussiness.value,
          idBusiness: this.data.idBussiness,
        };
      }
    }
    this.content.addCategory(addCategory).subscribe((resp: ResponseService) => {
      if (resp.state === 'Success') {
        this.dialogRef.close();
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
