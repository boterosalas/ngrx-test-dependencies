import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { LinksService } from "src/app/services/links.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"]
})
export class ReportsComponent implements OnInit {
  @ViewChild("templateCardReport, templateCardCross", { static: false })
  template: TemplateRef<any>;

  fileUrl: string;
  fileForm: FormGroup;
  fileForm2: FormGroup;
  nameFileTrip: string;
  nameFileAsured: string;
  formData = new FormData();
  showErrorExt: boolean;
  showErrorExt2: boolean;

  constructor(private file: LinksService, private fb: FormBuilder) {}

  ngOnInit() {
    this.nameFileTrip = "";
    this.nameFileAsured = "";

    this.getFileReport();
    this.fileForm = this.fb.group({
      file: [null],
      business: 'Viajes'
    });

    this.fileForm2 = this.fb.group({
      file2: [null]
    });
  }

  public getFileReport() {
    this.file.getFileReport().subscribe(file => {
      this.fileUrl = file;
    });
  }

  public onFileChange(event) {
    this.nameFileTrip = event.target.files[0].name;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.fileForm.controls.file.patchValue({
          file: reader.result
        });
        this.getExtension(this.nameFileTrip);
      };
    }


  }

  public onFileChange2(event) {
    this.nameFileAsured = event.target.files[0].name;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.fileForm2.controls.file2.patchValue({
          file2: reader.result
        });
      };
    }

    this.getExtension2(this.nameFileAsured);

  }

  public getExtension(nameFile: string) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[1];
    if (getExt === "xlsx" || getExt === "xls") {
      this.showErrorExt = false;
      let file = this.fileForm.controls.file.value.file;
      let data = {
        file,
        business: 'Viajes'
      }
      this.file.sendfile(data).subscribe(val => {
        console.log(val);
      })
    } else {
      this.showErrorExt = true;
    }
  }

  public getExtension2(nameFile: string) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[1];

    if (getExt === "xlsx" || getExt === "xls") {
      this.showErrorExt2 = false;
    } else {
      this.showErrorExt2 = true;
    }
  }

}
