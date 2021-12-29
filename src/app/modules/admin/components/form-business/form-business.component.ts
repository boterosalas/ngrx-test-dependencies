import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-form-business',
  templateUrl: './form-business.component.html',
  styleUrls: ['./form-business.component.scss'],
})
export class FormBusinessComponent implements OnInit, OnChanges {
  businessForm: FormGroup;
  image:string;
  image2: string;
  nameFile: string = '';
  errorFile: boolean = false;
  nameFile2: string = '';
  errorFile2: boolean = false;
  size:number;
  extension: string;
  @Input() dataBusiness:any;
  description:string = '';
  constructor(private fb: FormBuilder, private utils: UtilsService, private content: ContentService) {}

  ngOnChanges() {
    if(this.dataBusiness !== undefined) {
 
      const split = this.dataBusiness.icondashboard.split('/');
      const icon = split[split.length - 1];

      const splitImage = this.dataBusiness.imageurl.split('/');
      const image = splitImage[splitImage.length - 1];
      
      this.businessForm.controls.nameBussiness.setValue(this.dataBusiness.description)
      this.businessForm.controls.detailBussiness.setValue(this.dataBusiness.infoaditional)
      this.businessForm.controls.nameTableCommision.setValue(this.dataBusiness.tabtablecommission)
      this.businessForm.controls.placeholderBussiness.setValue(this.dataBusiness.placeholder)
      this.businessForm.controls.codeReference.setValue(this.dataBusiness.urlquerystring)
      this.nameFile = image;
      this.nameFile2 = icon;
      this.businessForm.controls.generateExcel.setValue(this.dataBusiness.excelcommission)
      this.businessForm.controls.visible.setValue(this.dataBusiness.active)
      this.businessForm.controls.hasproduct.setValue(this.dataBusiness.hasproduct)
    }
  }

  ngOnInit(): void {
    this.businessForm = this.fb.group({
      nameBussiness: [null, Validators.required],
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

  }

  public uploadFileImage(e) {
    this.extension = 'svg';
    this.size = 300;
    this.utils.onFileChangeFiles(e, this.extension, this.size, 'file');

    this.utils.fileB64.subscribe((val:any) => {
      this.image = val;
    });

    this.utils.nameFile.subscribe(nameFile => this.nameFile = nameFile);
    this.utils.errorFile.subscribe(errorFile => this.errorFile = errorFile);

    
  }

  public uploadFileImage2(e) {
    this.extension = 'svg';
    this.size = 300;
    this.utils.onFileChangeFiles(e, this.extension, this.size, 'file2');

    this.utils.file2B64.subscribe((val:any) => {
      this.image2 = val;
    });

    this.utils.nameFile2.subscribe(nameFile => this.nameFile2 = nameFile);
    this.utils.errorFile2.subscribe(errorFile => this.errorFile2 = errorFile);
    
  }

  saveBussiness() {
    const data = {
      id: this.dataBusiness.id,
      description: this.businessForm.controls.nameBussiness.value,
      infoAditional: this.businessForm.controls.detailBussiness.value,
      tabTableCommission: this.businessForm.controls.nameTableCommision.value,
      placeHolder: this.businessForm.controls.placeholderBussiness.value,
      active: this.businessForm.controls.visible.value,
      hasproduct: this.businessForm.controls.hasproduct.value,
      urlQueryString: this.businessForm.controls.codeReference.value,
      excelCommission: this.businessForm.controls.generateExcel.value,
      image: this.image,
      icondashboardimage: this.image2,
    };

    this.content.saveBussiness(data).subscribe((resp: ResponseService) => {
      this.utils.openSnackBar(resp.userMessage, 'Cerrar');
    })

  }
}
