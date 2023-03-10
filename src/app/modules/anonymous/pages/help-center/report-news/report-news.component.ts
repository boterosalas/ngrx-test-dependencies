import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

moment.locale('es');
@Component({
  selector: 'app-report-news',
  templateUrl: './report-news.component.html',
  styleUrls: ['./report-news.component.scss'],
})
export class ReportNewsComponent implements OnInit {
  dateForm: UntypedFormGroup;
  maxDate = new Date();
  nameFileCert = '';
  showErrorCert: boolean;
  validFormat: boolean;
  fileImgCat: any;
  activebutton: boolean;
  referencia: string;
  visibleLeft = false;
  placeholder = 'REFERENCIA';

  novelties = [
    {value: 'OTRO', name: 'Otro'},
    {value: 'TERMINO', name: 'TYC'},
    {value: 'TRATAMIENTO', name: 'Tratamiento de datos'},
  ]

  constructor(private fb: UntypedFormBuilder, private content: ContentService, private users: UserService) {
  }
  dataSource: any;
  ngOnInit() {
    this.dateForm = this.fb.group({
      dateRange: [null, Validators.required],
      bussiness: [null, Validators.required],
      typenovelty: ['', Validators.required],
      reference: [null, Validators.required],
      description: [null, Validators.required],
      image: [null],
    });
    this.getAllBusiness();
  }
  public getAllBusiness() {
    this.content.getBusiness().subscribe((resp) => {
      this.dataSource = resp;
      this.dataSource.push({
        code: 'clickam',
        description: 'Clickam',
        id: 0,
        placeholder: 'TIPO DE REPORTE',
        tabtablecommission: 'Clickam',
      });
      this.dataSource.sort(function (a, b) {
        if (a.description > b.description) {
          return 1;
        }
        if (a.description < b.description) {
          return -1;
        }
        return 0;
      });
    });
  }

  private getExtension(nameFile: string, getSize: number) {
    const splitExt = nameFile.split('.');
    const getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = true;
    if (getExt === 'jpg' || getExt === 'png' || getExt === 'pdf' || getExt === 'msg') {
      this.validFormat = false;
    }
    if (getSize / 1000 > 10000) {
      this.validFormat = true;
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
        if (this.validFormat === false) {
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
  public onChangeSelected(selected: string) {
    this.visibleLeft = true;
    this.placeholder = selected;
  }
  public sendMessage() {
    let codeBussiness = '';
    let data = {};
    if (this.dateForm.controls.bussiness.value === 0 || this.dateForm.controls.bussiness.value === '0') {
      data = {
        datenovelty: this.dateForm.controls.dateRange.value,
        typenovelty: this.dateForm.controls.typenovelty.value,
        code: this.dateForm.controls.reference.value,
        description: this.dateForm.controls.description.value,
        document: this.fileImgCat,
        documenturl: this.nameFileCert,
      };
    } else {
      codeBussiness = this.dateForm.controls.bussiness.value;
      data = {
        datenovelty: this.dateForm.controls.dateRange.value,
        typenovelty: this.dateForm.controls.typenovelty.value,
        idbusiness: codeBussiness,
        code: this.dateForm.controls.reference.value,
        description: this.dateForm.controls.description.value,
        document: this.fileImgCat,
        documenturl: this.nameFileCert.replace(' ', '_'),
      };
    }

    this.users.saveNews(data).subscribe((resp: any) => {
      if (resp.state === 'Success') {
        Swal.fire({
          html: "Tu reporte ha sido enviado con ??xito, el n??mero de radicado es: <b class='bold-blue'>" + resp.objectResponse + '</b>',
          type: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'upload-success',
        }).then(() => {
          this.dateForm.reset();
          this.visibleLeft = false;
          this.fileImgCat = '';
          this.nameFileCert = '';
          this.placeholder = 'REFERENCIA';
        });
      }
    });
  }
}
