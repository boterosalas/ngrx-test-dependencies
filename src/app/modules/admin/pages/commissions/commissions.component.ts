import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginatorIntl, MatSnackBar, MatTableDataSource } from '@angular/material';
import * as moment from "moment";
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { LinksService } from 'src/app/services/links.service';
import { ContentService } from 'src/app/services/content.service';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { dataAdditionalInfo } from './content/content-aditional-info'
import Swal from "sweetalert2";
moment.locale("es");
@Component({
    selector: 'app-commissions',
    templateUrl: './commissions.component.html',
    styleUrls: ['./commissions.component.scss']
})
export class CommissionsComponent implements OnInit {
    maxDate = moment(new Date());
    dateFormCommission: FormGroup;
    searchForm: FormGroup;
    pageTo: number = 50;
    paginate: string;
    pageIndex: number = 0;
    totalItems: number;
    commissions: Array<any>;
    currentCommission: any;
    pageSize: number;
    from: any;
    to: any;
    name: any;
    direction: any;
    dataAdditionalInfoValue: any

    @ViewChild("templateAdditionalInfo", { static: false })
    templateAdditionalInfo: TemplateRef<any>;
    
    private subscription: Subscription = new Subscription();
    constructor(
        private paginator: MatPaginatorIntl,
        private dialog: MatDialog,
        private fb: FormBuilder,
        private usersService: UserService,
        private _snackBar: MatSnackBar,
        public utils: UtilsService,
        private link: LinksService,
        private contentService: ContentService
    ) {
        this.dataAdditionalInfoValue = dataAdditionalInfo

        this.paginator.itemsPerPageLabel = "Ítems por página";
        this.paginator.getRangeLabel = function (page, pageSize, length) {
            if (length === 0 || pageSize === 0) {
                return "0 de " + length;
            }
            length = Math.max(length, 0);
            const startIndex = page * pageSize;
            // If the start index exceeds the list length, do not try and fix the end index to the end.
            const endIndex =
                startIndex < length
                    ? Math.min(startIndex + pageSize, length)
                    : startIndex + pageSize;
            return startIndex + 1 + " de " + endIndex + " ítems de " + length;
        };
    }
    locale = {
        locale: "es",
        direction: "ltr", // could be rtl
        weekLabel: "W",
        separator: " a ", // default is ' - '
        cancelLabel: "Cancelar", // detault is 'Cancel'
        applyLabel: "Aplicar", // detault is 'Apply'
        clearLabel: "Limpiar", // detault is 'Clear'
        customRangeLabel: "Custom range",
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
        firstDay: 1 // first day is monday
    };
    private openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 5000
        });
    }
    dataSource: any;
    displayedColumns: string[] = ['identification', 'nameuser', 'idusers', 'commissiondate', 'idcommission', 'business', 'product', 'ordernumber'];
    ngOnInit() {
        this.searchCommission("");
        this.dateFormCommission = this.fb.group({
            dateRange: {
                startDate: "",
                endDate: "",
            }
        });
        this.searchForm = this.fb.group({
            search: [null],
        });
        this.checkRole();
    }
    checkRole() {
        this.utils.checkPermision();
    }

    public searchCommission(
        term,
        from = 1,
        to = this.pageTo,
        orderOrigin = "",
        orderBy = ""
    ) {
        console.log("searchCommission", term)

        if (term !== this.paginate) {
            this.paginate = term;
            this.pageIndex = 0;
        }
        const params = { term, from, to, orderOrigin, orderBy };
        // this.subscription = this.contentService.getCommissionsSearch(params).subscribe((resp: any) => {
        //     console.log("getCommissionsSearch", resp)
        //     this.commissions = resp.novelties;
        //     this.totalItems = resp.total;
        //     this.dataSource = new MatTableDataSource<any>(this.commissions);
        // });
    }
    public openCommission(commission) {
        this.currentCommission = commission
        const id = "modal-commission";
        const title = "";
        const template = this.templateAdditionalInfo;

        this.dialog.open(ModalGenericComponent, {
            data: {
            title,
            template,
            id
            },
        });
    }
    public pagination(paginate: any) {
        this.pageIndex = paginate.pageIndex;
        paginate.length = this.totalItems;
        this.from = paginate.pageSize * paginate.pageIndex + 1;
        this.to = paginate.pageSize * (paginate.pageIndex + 1);
        this.searchCommission(this.paginate, this.from, this.to, this.name, this.direction);
    }
    sortCommission(event) {
        this.name = event.active.toUpperCase();
        this.direction = event.direction.toUpperCase();
        if (this.direction === "") {
            this.name = "";
        }
        this.searchCommission(this.paginate, this.from, this.to, this.name, this.direction);
    }

    handleFileInput(event, typeUpload: string) {
        let file: FileList = event.target.files;

        if (this.validFormat(file[0].name)) {
            let formDataCommission: FormData = new FormData();
            formDataCommission.append("formFile", file[0], file[0].name.replace(' ', '_'))

            if (typeUpload === "rejected") {
                this.subscription = this.link.updateStatusCommissionFile(formDataCommission).subscribe((resp: ResponseService) => {
                    let text, type
                    if (resp.state === "Success") {
                        text = "Se ha subido exitosamente el archivos de comisiones rechazadas."
                        type = "success"
                    } else {
                        text = "No pudimos cargar el archivos de comisiones rechazadas."
                        type = "error"
                    }

                    this.openSwal(text, type, "rejected")
                })
            } else if (typeUpload === "eliminated") {
                this.subscription = this.link.deleteCommissionFile(formDataCommission).subscribe((resp: ResponseService) => {
                    let text, type
                    if (resp.state === "Success") {
                        text = "Se ha subido exitosamente el archivos de comisiones eliminadas."
                        type = "success"
                    } else {
                        text = "No pudimos cargar el archivos de comisiones eliminadas."
                        type = "error"
                    }

                    this.openSwal(text, type, "eliminated")
                })
            }
        } else {
            this.openSnackBar("Formato inválido solo se pueden subir archivos con la extensión xlsx, xls", "Cerrar");
        }
    }

    private openSwal(text, type, typeUpload) {
        Swal.fire({
            text,
            type,
            confirmButtonText: "Aceptar",
            confirmButtonClass: `upload-${type}`
        }).then(() => {
            console.log("openSwal", typeUpload)
        });
    }

    private validFormat(nameFile: string) {
        let splitExt = nameFile.split(".")
        let getExtension = splitExt[splitExt.length - 1].toLocaleLowerCase()
        if (getExtension === "xlsx" || getExtension === "xls") {
            return true
        }
        return false
    }

    public getReportRejected() {
        let date = {
          start: this.dateFormCommission.controls.dateRange.value.startDate.format(),
          end: this.dateFormCommission.controls.dateRange.value.endDate.format()
        }
    
        this.subscription = this.link.getReportRejected(date).subscribe((resp: ResponseService) => {
            this.openSnackBar(resp.userMessage, "Cerrar");
        })
    }

    onNoClick(): void {
        this.dialog.closeAll();
    }
}
