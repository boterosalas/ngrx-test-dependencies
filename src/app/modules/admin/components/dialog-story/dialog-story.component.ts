import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import * as moment from "moment";
import { ContentService } from "src/app/services/content.service";
import { UtilsService } from "src/app/services/utils.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-dialog-story",
  templateUrl: "./dialog-story.component.html",
  styleUrls: ["./dialog-story.component.scss"],
})
export class DialogStoryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private utils: UtilsService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private _content: ContentService
  ) {}

  storieForm: FormGroup;
  image: string;
  nameFile: string = "";
  file: any;
  showErrorImg: boolean = false;
  dataReal = [];
  validFormat: boolean;
  extension: string;
  minDate = new Date();
  showDate = true;
  publicationDate: any;
  titleButton = "Publicar";
  active = true;
  disableHour = true;
  editMode = false;
  dateEdit:any;
  hourEdit:any;
  eraserEdit:Boolean;
  imageEdit = "";
  saveStoryData:any;

  ngOnInit() {
    this.formStory();
  }

  public formStory() {
    let {date, datepublish, description, imageurl, infoaditional, link, active} = this.data;

    if(description === undefined) {
      this.storieForm = this.fb.group({
        nameContent: [null, Validators.required],
        link: [null],
        commission: [null],
        image: [null, Validators.required],
        date: [null],
        hour: [null],
        eraser: [false],
      });
    } else{
      this.editMode = true;
      if(imageurl !== '') {
        this.imageEdit = imageurl;
      }

      if(datepublish !== null) {
        let splitDatepublish = datepublish.split('T');
        this.dateEdit = moment(splitDatepublish[0]).toDate();
        let hour = splitDatepublish[1];
        this.hourEdit = this.utils.toStandardTime(hour);
        this.active = active;
        this.titleButton = "Programar";
      }

      if(datepublish === null && active === false){
        this.eraserEdit = true;
        this.titleButton = "Guardar como borrador";
        this.showDate = false;
      }

      this.storieForm = this.fb.group({
        nameContent: [description, Validators.required],
        link: [link],
        commission: [infoaditional],
        image: [''],
        date: [this.dateEdit],
        hour: [this.hourEdit],
        eraser: [this.eraserEdit],
      });

    }
  }

  public getExtensionFile(nameFile: string, getSize: number) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    if (getExt === "jpg" || getExt === "jpeg" || getExt === "mp4") {
      this.validFormat = true;
      this.extension = getExt;
    }
    if (getSize / 1000 > 7000 && (getExt === "jpg" || getExt === "jpeg")) {
      this.validFormat = false;
      Swal.fire({
        text: "No pudimos cargar el contenido, ten en cuenta que cada imagen no puede superar el tamaño de 7mb.",
        type: "error",
        confirmButtonText: "Aceptar",
        confirmButtonClass: "accept-login-alert-error",
      });
    } else if (getSize / 1000 > 75000 && getExt === "mp4") {
      this.validFormat = false;
      Swal.fire({
        text: "No pudimos cargar el contenido, ten en cuenta que cada video no puede superar el tamaño de 72mb.",
        type: "error",
        confirmButtonText: "Aceptar",
        confirmButtonClass: "accept-login-alert-error",
      });
    }
  }

  public onFileChangeFiles(event) {
    this.imageEdit = "";
    const files = event.target.files;
    let nameFileStory = files[0].name;
    let readerStory = new FileReader();
    let sizeFile = files[0].size;
    if (files && files.length) {
      const [fileStory] = files;
      let fileBlob = new Blob([fileStory]);
      let file = new File([fileBlob], nameFileStory);
      readerStory.readAsDataURL(file);
      readerStory.onload = () => {
        this.getExtensionFile(nameFileStory, sizeFile);
        if (this.validFormat) {
          this.file = readerStory.result;
          this.file = this.file.split(",")[1];
          this.nameFile = nameFileStory;
          this.showErrorImg = false;
        } else {
          this.showErrorImg = true;
        }
      };
    }
  }

  public date() {
    this.storieForm.controls.eraser.valueChanges.subscribe((val) => {
      if (val === true) {
        this.showDate = false;
        this.active = false;
        this.titleButton = "Guardar como borrador";
        this.storieForm.controls.date.setValue(null);
        this.storieForm.controls.hour.setValue(null);
      } else {
        this.showDate = true;
        this.titleButton = "Publicar";
      }
    });
  }

  public changeDate() {
    if (this.storieForm.controls.date.value !== null) {
      this.titleButton = "Programar";
      this.active = false;
      this.disableHour = false;
    } else {
      this.active = true;
      this.titleButton = "Publicar";
      this.disableHour = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public saveStory() {
    let { commission, date, hour, link, nameContent } = this.storieForm.value;

    
    if(date !== null) {
      date = moment(date).format("YYYY-MM-DD");
    }

    if(hour!== null) {
      hour = this.utils.HoraMilitar(hour);
    } else{
      hour = "00:00:00";
    }

    if(date !== null) {
      this.publicationDate = `${date} ${hour}`;
    } else{
      this.publicationDate = null;
    }

    if(this.editMode === false) {
      this.saveStoryData = [
        {
          description: nameContent,
          link: link,
          idBusiness: this.data ,
          infoAditional: commission,
          active: this.active,
          extension: this.extension,
          datepublish: this.publicationDate,
          image: this.file,
        },
      ];
    } else {
      this.saveStoryData = [
        {
          description: nameContent,
          link: link,
          idBusiness: this.data.idbusiness,
          id: this.data.id,
          infoAditional: commission,
          active: this.active,
          extension: this.extension,
          datepublish: this.publicationDate,
          image: this.file,
        },
      ];
    }

    this._content
      .saveStories(this.saveStoryData)
      .subscribe(() => this.dialogRef.close());
  }
}
