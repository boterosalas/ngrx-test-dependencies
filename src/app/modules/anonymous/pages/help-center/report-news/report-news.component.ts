import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import * as moment from "moment";
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

moment.locale("es");
@Component({
    selector: 'app-report-news',
    templateUrl: './report-news.component.html',
    styleUrls: ['./report-news.component.scss']
})
export class ReportNewsComponent implements OnInit {
    dateForm: FormGroup;
    maxDate: Date;
    nameFileCert: string = '';
    showErrorCert: boolean;
    validFormat: boolean;
    fileImgCat: any;
    activebutton: boolean;
    visibleLeft: boolean = false;
    placeholder: string = "REFERENCIA";
    constructor(
        private fb: FormBuilder,
        private content: ContentService,
        private users: UserService,
    ) {
        const currentYear = new Date().getFullYear()
        this.maxDate = new Date(currentYear + 1, 11, 31);
    }
    dataSource: any;
    ngOnInit() {
        this.dateForm = this.fb.group({
            dateRange: [null, Validators.required],
            bussiness: [null, Validators.required],
            reference: [null],
            description: [null, Validators.required],
            image: [null]
        });
        this.getAllBusiness()
    }
    public getAllBusiness() {
        this.content.getBusiness().subscribe(resp => {
            this.dataSource = resp;
            console.log(this.dataSource)
        })

    }

    private getExtension(nameFile: string, getSize: number) {
        let splitExt = nameFile.split(".");
        let getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
        this.validFormat = false;
        if (getExt === "jpg") {
            this.validFormat = true;
        }
        if (getSize / 1000 > 100) {
            this.validFormat = false;
        }
    }
    public onFileChangeFiles(event, param: string) {
        let nameFile = event.target.files[0].name;
        let reader = new FileReader();
        let sizeFile = event.target.files[0].size;
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            let fileBlob = new Blob([file]);
            let file2 = new File([fileBlob], nameFile);
            reader.readAsDataURL(file2);
            reader.onload = () => {
                this.getExtension(nameFile, sizeFile);
                if (this.validFormat === true) {
                    this.fileImgCat = reader.result;
                    this.fileImgCat = this.fileImgCat.split(",")[1]
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
        console.log(selected);
        this.visibleLeft = true;
        this.placeholder = selected;

    }
    public sendMessage() {
        let data = {
            datenovelty: this.dateForm.controls.dateRange.value,
            idbusiness: this.dateForm.controls.bussiness.value,
            code: this.dateForm.controls.reference.value,
            description: this.dateForm.controls.description.value,
            document: this.fileImgCat,
            documenturl: this.nameFileCert
        }


        this.users.saveNews(data).subscribe((resp: any) => {
            if (resp.state === "Success") {
                Swal.fire({
                    html: "Tu reporte ha sido enviado con éxito, el número de radicado es: <b class='bold-blue'>" + resp.objectResponse + "</b>",
                    type: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonClass: "upload-success"
                }).then(() => {
                    this.dateForm.reset();
                    this.visibleLeft = false;
                    this.fileImgCat = "";
                    this.nameFileCert = "";
                });
            }

        });
    }
}
