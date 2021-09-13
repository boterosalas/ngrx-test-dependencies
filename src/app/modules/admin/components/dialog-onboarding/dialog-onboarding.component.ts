import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dialog-onboarding',
  templateUrl: './dialog-onboarding.component.html',
  styleUrls: ['./dialog-onboarding.component.scss']
})
export class DialogOnboardingComponent implements OnInit {

  onBoard: FormGroup;
  nameImageWeb = '';
  nameImageMobile = '';
  showErrorWeb: boolean;
  showErrorMobile: boolean;
  validFormat: boolean;
  activebutton: boolean;
  fileWeb: any;
  fileMobile: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.formBoard();
  }

  public formBoard() {
    this.onBoard = this.fb.group({
      image: [null, Validators.required],
      image2: [null, Validators.required],
      namecta1: [''],
      linkcta1: [''],
      namecta2: [''],
      linkcta2: [''],
    });
  }

  private getExtension(nameFile: string, getSize: number) {
    const splitExtFile = nameFile.split('.');
    const getExtFile = splitExtFile[splitExtFile.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    if ('jpg' === getExtFile || 'png' === getExtFile) {
      this.validFormat = true;
    }
    if (2000 < getSize / 1000) {
      this.validFormat = false;
    }
  }

  public onFileChangeFiles(event, param: string) {
    const target = event.target;
    const files = target.files[0];
    const nameFile = files.name;
    const reader = new FileReader();
    const sizeFile = files.size;
    const fileList: FileList = target.files;
    this.getExtension(fileList[0].name, fileList[0].size);
    if (target.files && target.files.length) {
      const [Tfiles] = target.files;
      const fileBlobCarrousel = new Blob([Tfiles]);
      const newFile = new File([fileBlobCarrousel], nameFile);
      reader.readAsDataURL(newFile);
      reader.onload = () => {
        this.getExtension(nameFile, sizeFile);
        if (this.validFormat === true) {
          if (param === 'web') {
            this.fileWeb = reader.result;
            this.nameImageWeb = nameFile;
            this.showErrorWeb = false;
          } else {
            this.fileMobile = reader.result;
            this.nameImageMobile = nameFile;
            this.showErrorMobile = false;
          }
        } else {
          if (param === 'web') {
            this.showErrorWeb = true;
            this.nameImageWeb = nameFile;
          } else {
            this.nameImageMobile = nameFile;
            this.showErrorMobile = true;
          }
        }
      };
    }
  }

  public onNoClick() {
    this.dialog.closeAll();
  }

  public saveOnboard() {

    const dataNameCta1 = this.onBoard.controls.namecta1.value;
    const dataLinkCta1 = this.onBoard.controls.linkcta1.value;
    const dataNameCta2 = this.onBoard.controls.namecta2.value;
    const dataLinkCta2 = this.onBoard.controls.linkcta2.value;
    const imgWeb = this.splitb64(this.fileWeb);
    const imgMobile = this.splitb64(this.fileMobile);

    const data = {
      imageWeb: imgWeb,
      imageMobile: imgMobile,
      namecta1: dataNameCta1,
      linkcta1: dataLinkCta1,
      namecta2: dataNameCta2,
      linkcta2: dataLinkCta2,
    };

    console.log(data);

  }

  private splitb64(file: any) {
    const explit64 = file.split('data:application/octet-stream;base64,');
    return file = explit64[1];
  }

}
