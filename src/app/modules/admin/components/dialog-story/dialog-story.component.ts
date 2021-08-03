import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { UtilsService } from "src/app/services/utils.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-dialog-story",
  templateUrl: "./dialog-story.component.html",
  styleUrls: ["./dialog-story.component.scss"],
})
export class DialogStoryComponent implements OnInit {
  constructor(private fb: FormBuilder, private utils: UtilsService) {}

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

  ngOnInit() {
    this.formStory();
  }

  public formStory() {
    this.storieForm = this.fb.group({
      nameContent: [null, Validators.required],
      link: [null],
      commission: [null],
      image: [null, Validators.required],
      date: [null],
      hour: [null],
      eraser: [false],
    });
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
      if (val) {
        this.showDate = false;
        this.storieForm.controls.date.setValue(null);
        this.storieForm.controls.hour.setValue(null);
      } else {
        this.showDate = true;
      }
    });
  }

  public saveStory() {
    let { commission, date, eraser, hour, link, nameContent } =
      this.storieForm.value;

    if (date !== null) {
      hour = this.utils.HoraMilitar(hour);
      date = moment(date).format("YYYY-MM-DD");
      this.publicationDate = `${date} ${hour}`;
    } else {
      this.publicationDate = null;
    }

    let saveStoryData = {
      image: this.file,
      content: nameContent,
      commission: commission,
      visible: eraser,
      link: link,
      publicationDate: this.publicationDate,
    };
    console.log(saveStoryData);
  }
}
