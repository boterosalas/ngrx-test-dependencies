import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent implements OnInit, OnDestroy {
  constructor(
    private content: ContentService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) { }
  @Output() getContentBussiness = new EventEmitter;
  datos = true;
  dateForm: FormGroup;
  validFormat: boolean;
  fileImgCat: any;
  nameFileCert: string = '';
  showErrorCert: boolean;
  activebutton: boolean;
  statusAc: boolean = true;
  storageNameFile: string = '';
  private subscription: Subscription = new Subscription();
  selecteds = [{
    titulo: "Porcentaje (%)",
    value: "PORCENTAJE"
  }, {
    titulo: "Fijo ($)",
    value: "FIJO"
  }
  ]
  ngOnInit() {
    this.loadFormCategory();
  }
  public loadFormCategory() {
    console.log("Cargando datos")
    if (this.data.edit === 0) {
      console.log("Cargando h")
      this.dateForm = this.fb.group({
        category: [null, Validators.required],
        description: [null, Validators.required],
        tipoCommision: [null, Validators.required],
        commision: [null, Validators.required],
        link: [null, Validators.required],
        image: [null, Validators.required],
        commisionBussiness: [null, Validators.required]
      });
    } else if (this.data.edit === 1) {
      let dataImage = this.data.image;
      let datosImg = dataImage.split("/")
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
        commisionBussiness: [this.data.comisionBussines, Validators.required]
      });

      this.activebutton = true;

    } else {
      console.log("Cargando else")
      this.dateForm = this.fb.group({
        category: [null, Validators.required],
        description: [null, Validators.required],
        tipoCommision: [null, Validators.required],
        commision: [null, Validators.required],
        link: [null, Validators.required],
        image: [null, Validators.required],
        commisionBussiness: [null, Validators.required]
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  private getExtension(nameFile: string, getSize: number) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    if (getExt === "jpg" || getExt === "jpeg" || getExt === "svg") {
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
    console.log(event.target.files[0]);
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
  public agregarCategory() {
    if (this.data.edit === 0) {
      let addCategory = {
        description: this.dateForm.controls.category.value,
        infoAditional: this.dateForm.controls.description.value,
        typeCommission: this.dateForm.controls.tipoCommision.value,
        commission: this.dateForm.controls.commision.value,
        link: this.dateForm.controls.link.value,
        imageURL: this.nameFileCert,
        image: this.fileImgCat,
        active: this.statusAc,
        commissionBusiness: this.dateForm.controls.commisionBussiness.value,
        idBusiness: this.data.idBussiness
      }
      this.content.addCategory(addCategory).subscribe((resp: ResponseService) => {
        if (resp.state === "Success") {
          console.log("Categoria creada")
          this.dialogRef.close();
        } else {
          console.log("Upss Hubo un problema vuelve a intentarlo")
        }
      });

    } else {
      let editCategory
      if (this.fileImgCat) {
        editCategory = {
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
          idBusiness: this.data.idBussiness
        }
        this.content.addCategory(editCategory).subscribe((resp: ResponseService) => {
          if (resp.state === "Success") {
            console.log("Categoria modificada");
            this.dialogRef.close();
          } else {
            console.log("Upss Hubo un problema vuelve a intentarlo")
          }
        });
      } else {

        editCategory = {
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
          idBusiness: this.data.idBussiness
        }

        this.content.addCategory(editCategory).subscribe((resp: ResponseService) => {
          if (resp.state === "Success") {
            console.log("Categoria modificada");
            this.dialogRef.close();
          } else {
            console.log("Upss Hubo un problema vuelve a intentarlo")
          }
        });
      }
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
