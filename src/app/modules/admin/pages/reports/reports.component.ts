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

  constructor(private file: LinksService, private fb: FormBuilder) {}

  ngOnInit() {

    console.log('si existo');
    this.nameFileTrip = '';
    this.nameFileAsured = '';

    this.getFileReport();
    this.fileForm = this.fb.group({
      file: [null]
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
    console.log(this.nameFileTrip);
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.fileForm.controls.file.patchValue({
          file: reader.result
        });

      };
    }
  }

  public onFileChange2(event) {
    this.nameFileAsured = event.target.files[0].name;
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.fileForm2.controls.file2.patchValue({
          file2: reader.result
        });
      };
    }
  }

}
