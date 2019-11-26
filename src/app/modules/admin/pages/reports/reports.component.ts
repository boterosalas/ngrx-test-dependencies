import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ElementRef,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { LinksService } from "src/app/services/links.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { distinctUntilChanged } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";
import { ResponseService } from "src/app/interfaces/response";
import { LoaderService } from "src/app/services/loader.service";
import { Subscription } from "rxjs";
import { ValidateDate } from "src/app/validators/validate-date.validators";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"]
})
export class ReportsComponent implements OnInit, OnDestroy {
  @ViewChild("templateCardReport, templateCardCross", { static: false })
  // @ViewChild('input',{ static: false }) input: ElementRef;
  template: TemplateRef<any>;

  fileUrl: string;
  fileForm: FormGroup;
  fileFormAssured: FormGroup;
  nameFile: string;
  nameFileAssured: string;
  dateForm: FormGroup;
  showErrorExt: boolean;
  showErrorExtAssured: boolean;
  validFormat: boolean;
  isLoggedIn: any;
  userName: string;
  tmpPath: string;
  EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  private subscription: Subscription = new Subscription();
  maxDate = new Date();

  constructor(
    private file: LinksService,
    private fb: FormBuilder,
    private auth: AuthService,
    private user: UserService,
    private loading: LoaderService,
    private cd: ChangeDetectorRef
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

    this.dateForm = this.fb.group(
      {
        dateStart: ["", Validators.required],
        dateEnd: ["", Validators.required]
      },
      {
        validator: [ValidateDate.CompareDates]
      }
    );

    /**
     * verifica si el usuario esta logueado y se obtiene la identificacion
     */

    this.isLoggedIn = this.auth.isLoggedIn();
    if (this.isLoggedIn) {
      this.subscription = this.user.userInfo$
        .pipe(distinctUntilChanged())
        .subscribe(val => {
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
    this.nameFile = event.target.files[0].name;
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let fileBlob = new Blob([file], { type: this.EXCEL_TYPE });
      let file2 = new File([fileBlob], this.nameFile, {
        type: this.EXCEL_TYPE
      });
      reader.readAsDataURL(file2);

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

  // public onFileChangeAssured(event) {
  //   this.nameFileAssured = event.target.files[0].name;
  //   let reader = new FileReader();
  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     let fileBlob = new Blob([file], {type: this.EXCEL_TYPE} )
  //     let file2 = new File(([fileBlob]), this.nameFileAssured, { type: this.EXCEL_TYPE });
  //     reader.readAsDataURL(file2);
  //     reader.onload = () => {
  //       this.fileFormAssured.controls.file.patchValue({
  //         file: reader.result
  //       });
  //       this.getExtension(this.nameFileAssured);
  //       if (this.validFormat === true) {
  //         this.showErrorExtAssured = false;
  //         this.sendFileAssured();
  //       } else {
  //         this.showErrorExtAssured = true;
  //       }
  //     };
  //   }
  // }

  private getExtension(nameFile: string) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[1];
    this.validFormat = false;
    if (getExt === "xlsx" || getExt === "xls") {
      this.validFormat = true;
    }
  }

  private sendFileTrip() {
    let fileSplit = this.fileForm.controls.file.value.file.split(",");
    let file = fileSplit[1];
    let data = {
      fileBase64: file,
      email: this.userName
    };
    this.loading.show();
    this.subscription = this.file.sendfile(data).subscribe(
      (res: ResponseService) => {
        this.loading.hide();
        if (res.state !== "Error") {
          Swal.fire({
            title: "Carga exitosa",
            text: res.userMessage,
            type: "success",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "upload-success"
          }).then(() => {
            this.nameFile = "";
          });
        } else {
          Swal.fire({
            title: "Error en la Carga",
            text: res.userMessage,
            type: "error",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "upload-error"
          }).then(() => {
            this.nameFile = "";
          });
        }
      },
      error => {
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          text: error.error.userMessage,
          type: "error",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "upload-invalid"
        }).then(() => {
          this.nameFile = "";
        });
      }
    );
  }

  // private sendFileAssured() {
  //   let fileSplit = this.fileFormAssured.controls.file.value.file.split(',');
  //   let file =  fileSplit[1];
  //   let data = {
  //     fileBase64:file,
  //     business: "seguros",
  //     email: this.userName
  //   };

  //   this.subscription = this.file.sendfile(data).subscribe(
  //     (res: ResponseService) => {
  //       if(res.state !== 'Error') {
  //         Swal.fire({
  //           title: "Carga exitosa",
  //           text: res.userMessage,
  //           type: "success",
  //           confirmButtonText: "Aceptar",
  //           confirmButtonClass: "upload-success"
  //         }).then(()=> {
  //           this.nameFileAssured ="";
  //         });
  //       } else {
  //         Swal.fire({
  //           title: 'Error en la Carga',
  //           text: res.userMessage,
  //           type: "error",
  //           confirmButtonText: "Aceptar",
  //           confirmButtonClass: "upload-error"
  //         }).then(()=> {
  //           this.nameFileAssured ="";
  //         });
  //       }
  //     },
  //     error => {
  //       this.loading.hide();
  //       Swal.fire({
  //         title: error.statusText,
  //         text: error.error.userMessage,
  //         type: "error",
  //         confirmButtonText: "Aceptar",
  //         confirmButtonClass: "upload-invalid"
  //       }).then(()=> {
  //         this.nameFileAssured ="";
  //       });
  //     }
  //   );
  // }

  public downloadReferal() {
    let dates = {
      dateStart: this.dateForm.controls.dateStart.value,
      dateEnd: this.dateForm.controls.dateEnd.value
    };
    this.file.downloadReferrals(dates).subscribe((resp: ResponseService) => {
      let file = resp.objectResponse;
      let contentType = "application/vnd.ms-excel";
      const linkSource = `data:${contentType};base64,${file}`;
      const downloadLink = document.createElement("a");
      const fileName = `reporte.xlsx`;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
      this.dateForm.reset();
      this.dateForm.controls.dateStart.setValue("");
      this.dateForm.controls.dateEnd.setValue("");
      setTimeout(() => {
        this.dateForm.controls.dateEnd.setErrors(null);
        this.dateForm.controls.dateStart.setErrors(null);
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
