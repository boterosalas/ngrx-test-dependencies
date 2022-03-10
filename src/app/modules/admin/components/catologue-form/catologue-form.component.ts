import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-catologue-form',
  templateUrl: './catologue-form.component.html',
  styleUrls: ['./catologue-form.component.scss'],
})
export class CatologueFormComponent implements OnInit, OnDestroy {
  catalogueForm: FormGroup;
  image: string;
  nameFile: string = '';
  errorFile: boolean = false;
  nameFile2: string = '';
  errorFile2: boolean = false;
  size: number;
  extension: string;
  size2: number;
  extension2: string;
  @Input() dataBusiness: any;
  description: string = '';
  business: Object[] = [];
  date = null;
  hour = null;
  minHours: any;
  add = true;
  pdf: string;
  ediDate: any;
  dateEdit:string;
  hourEdit: string;

  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private utils: UtilsService, private content: ContentService,  public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, ) {}

  listCatalogue = [];

  ngOnInit(): void {

    if(this.data !== null) {
      this.listCatalogue = this.data.urls
      this.nameFile = 'portada.jpg';
      this.nameFile2 = 'catalogo.pdf';
      this.ediDate = this.data.enddate;
      let splitDate = this.ediDate.split('T');
      this.dateEdit = splitDate[0];
      const hour = splitDate[1];
      this.hourEdit = this.utils.timeFormat(hour);
    }

    this.catalogueForm = this.fb.group({
      name: [this.data !== null ? this.data.description  : '', Validators.required],
      url: [null],
      business: [null],
      image: [null],
      pdf: [null],
      date: [this.data !== null ? this.dateEdit : null , Validators.required],
      hour: [this.data !== null ? this.hourEdit : null, Validators.required],
      visible: [this.data !== null ? this.data.active : false ],
    });

    this.getAllBusiness();
  }

  public getAllBusiness() {
    this.subscription = this.content.getAllBusiness().subscribe((resp) => {
      this.business = resp;
    });
  }

  public uploadFileImage(e) {
    this.extension = 'jpg';
    this.size = 150;
    this.utils.onFileChangeFiles(e, this.extension, this.size, 'file');

    this.utils.fileB64.subscribe((val: any) => {
      this.image = val;
    });

    this.utils.nameFile.subscribe((nameFile) => (this.nameFile = nameFile));
    this.utils.errorFile.subscribe((errorFile) => (this.errorFile = errorFile));
  }

  public uploadFileImage2(e) {
    this.extension2 = 'pdf';
    this.size2 = 5000;
    this.utils.onFileChangeFiles(e, this.extension2, this.size2, 'file2');

    this.utils.file2B64.subscribe((val: any) => {
      this.pdf = val;
    });

    this.utils.nameFile2.subscribe((nameFile) => (this.nameFile2 = nameFile));
    this.utils.errorFile2.subscribe((errorFile) => (this.errorFile2 = errorFile));
  }

  saveCatalogue() {
    const today = new Date();
    const startDate = moment(today).format('YYYY/MM/DD hh:mm:ss');

    const endDateFormat = moment(this.catalogueForm.controls.date.value).format('YYYY/MM/DD');
    const hourFormat = this.utils.HoraMilitar(this.catalogueForm.controls.hour.value);

    const endDate = endDateFormat + ' ' + hourFormat;

    const data = {
      id: this.data !== null ? this.data.id : 0,
      active: this.catalogueForm.controls.visible.value,
      startDate: startDate,
      endDate: endDate,
      description: this.catalogueForm.controls.name.value,
      image: this.image,
      pdf: this.pdf,
      urls: this.listCatalogue,
    };

    this.subscription = this.content.saveCatalog(data).subscribe((resp: ResponseService) => {
      this.utils.openSnackBar(resp.userMessage, 'Cerrar');
      this.dialogRef.close();
    });
  }

  addItem() {
    const item = {
      info: this.catalogueForm.controls.business.value,
      url: this.catalogueForm.controls.url.value,
    };

    this.listCatalogue.push({
      idBusiness: item.info.id,
      url: item.url,
      business: item.info.desc,
    });
  }

  deleteItem(item) {
    const index = this.listCatalogue.indexOf(item);
    this.listCatalogue.splice(index, 1);
  }

  public changeValue() {
    this.subscription = this.catalogueForm.controls.url.valueChanges.subscribe((value) => {
      if (value !== '' && this.catalogueForm.controls.business.value !== null) {
        this.add = false;
      } else {
        this.add = true;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
