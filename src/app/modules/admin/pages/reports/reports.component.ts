import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { LinksService } from "src/app/services/links.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { distinctUntilChanged } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";
import { ResponseService } from "src/app/interfaces/response";
import { LoaderService } from 'src/app/services/loader.service';

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
  isLoggedIn: any;
  userName: string;

  constructor(
    private file: LinksService,
    private fb: FormBuilder,
    private auth: AuthService,
    private user: UserService,
    private loading: LoaderService
  ) {}

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

    /**
     * verifica si el usuario esta logueado y se obtiene la identificacion
     */

    this.isLoggedIn = this.auth.isLoggedIn();
    if (this.isLoggedIn) {
      this.user.userInfo$.pipe(distinctUntilChanged()).subscribe(val => {
        if (!!val) {
          this.userName = val.email;
        }
      });
    }
  }

  public getFileReport() {
    this.file.getFileReport().subscribe(file => {
      this.fileUrl = file;
    });
  }

  public onFileChangeTrip(event) {
    console.log(event);
    this.nameFile = event.target.files[0].name;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.fileForm.controls.file.patchValue({
          file: reader.result
        });
        this.getExtension(this.nameFile);
        if (this.validFormat === true) {
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
        if (this.validFormat === true) {
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
      File: file,
      Business: "viajes",
      Email: this.userName
    };
    this.loading.show();
    this.file.sendfile(data).subscribe(
      (res: ResponseService) => {
        this.loading.hide();
        Swal.fire({
          title: "Carga exitosa",
          text: res.userMessage,
          type: "success",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "upload-success"
        });
      },
      error => {
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          text: error.error.userMessage,
          type: "error",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "upload-invalid"
        });
      }
    );
  }

  private sendFileAssured() {
    let file = this.fileFormAssured.controls.file.value.file;
    let data = {
      File: file,
      Business: "seguros",
      Email: this.userName
    };
    this.file.sendfile(data).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        Swal.fire({
          title: "Carga exitosa",
          text: resp.userMessage,
          type: "success",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "upload-success"
        });
      },
      error => {
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          text: error.error.userMessage,
          type: "error",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "upload-invalid"
        });
      }
    );
  }
}
