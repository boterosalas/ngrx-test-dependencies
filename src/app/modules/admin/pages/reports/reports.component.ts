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
  fileFormAssured: FormGroup;
  nameFile: string;
  nameFileAssured: string;
  showErrorExt: boolean;
  showErrorExtAssured: boolean;
  validFormat: boolean;

  constructor(private file: LinksService, private fb: FormBuilder) {}

  ngOnInit() {
    this.getFileReport();
    
    this.nameFile = "";
    this.nameFileAssured = "";

    this.fileForm = this.fb.group({
      file: [null]
    });
    
    this.fileFormAssured = this.fb.group({
      file: [null]
    });

  }

  public getFileReport() {
    this.file.getFileReport().subscribe(file => {
      this.fileUrl = file;
    });
  }

  public onFileChangeTrip(event) {
    this.nameFile = event.target.files[0].name
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.fileForm.controls.file.patchValue({
          file: reader.result
        });
        this.getExtension(this.nameFile);
        if(this.validFormat === true) {
          this.showErrorExt = false;
          this.sendFileTrip();
        } else {
          this.showErrorExt = true;
        }
      };
    }
  }

  public onFileChangeAssured(event) {
    this.nameFileAssured = event.target.files[0].name;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.fileFormAssured.controls.file.patchValue({
          file: reader.result
        });
        this.getExtension(this.nameFileAssured);
        if(this.validFormat === true) {
          this.showErrorExtAssured = false;
          this.sendFileAssured();
        } else {
          this.showErrorExtAssured = true;
        }
      };
    }
  }

  private getExtension(nameFile: string) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[1];
    this.validFormat = false;
    if (getExt === "xlsx" || getExt === "xls") {
      this.validFormat = true;
    }
  }

  private sendFileTrip() {
    let file = this.fileForm.controls.file.value.file;
    let data = {
      file,
      business: 'Viajes'
    }
    this.file.sendfile(data).subscribe(val => {
      this.nameFile= "No hay archivo seleccionado"
    })
  }

  private sendFileAssured() {
    let file = this.fileFormAssured.controls.file.value.file;
    let data = {
      file,
      business: 'Seguros'
    }
    this.file.sendfile(data).subscribe(val => {
      this.nameFileAssured= "No hay archivo seleccionado"
    })
  }
  

}
