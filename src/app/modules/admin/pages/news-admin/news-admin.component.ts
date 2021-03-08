import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginatorIntl, MatSnackBar, MatTableDataSource } from '@angular/material';
import * as moment from "moment";
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { UserService } from 'src/app/services/user.service';
//import { ModalGeneicComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { DialogNewsComponent } from '../../components/dialog-news/dialog-news.component';
moment.locale("es");
@Component({
    selector: 'app-news-admin',
    templateUrl: './news-admin.component.html',
    styleUrls: ['./news-admin.component.scss']
})
export class NewsAdminComponent implements OnInit {
    maxDate = moment(new Date());
    dateForm: FormGroup;
    searchForm: FormGroup;
    pageTo: number = 50;
    paginate: string;
    pageIndex: number = 0;
    totalItems: number;
    newsUser: Array<any>;
    pageSize: number;
    from: any;
    to: any;
    private subscription: Subscription = new Subscription();
    constructor(
        private paginator: MatPaginatorIntl,
        private dialog: MatDialog,
        private fb: FormBuilder,
        private usersService: UserService,
        private _snackBar: MatSnackBar,
    ) {

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
    displayedColumns: string[] = ['idclicker', 'subscription', 'users', 'identification', 'cellphone', 'email', 'status'];
    ngOnInit() {

        this.searchUser("");
        this.dateForm = this.fb.group({
            dateRange: [null],
        });
        this.searchForm = this.fb.group({
            search: [null],
        });

    }

    public searchUser(
        term,
        from = 1,
        to = this.pageTo,
        orderOrigin = "",
        orderBy = ""
    ) {
        if (term !== this.paginate) {
            this.paginate = term;
            this.pageIndex = 0;
        }
        const params = { term, from, to, orderOrigin, orderBy };
        this.subscription = this.usersService.getAllNews(params).subscribe((user: any) => {
            this.newsUser = user.novelties;
            this.totalItems = user.total;
            this.dataSource = new MatTableDataSource<any>(this.newsUser);
        });
    }
    public openDialog(element: any) {

        const title = "";
        const template = "";
        this.dialog.open(DialogNewsComponent, {
            data: {
                title,
                template,
                element
            },
        });
        this.dialog.afterAllClosed.subscribe(() => {
            this.searchUser("");
        });
    }
    public getReportExcel() {
        let dateParams = {
            start: this.dateForm.controls.dateRange.value.startDate.format("YYYY-MM-DD"),
            end: this.dateForm.controls.dateRange.value.endDate.format("YYYY-MM-DD")
        };
        this.usersService.getExportNewsExcel(dateParams).subscribe((responseExcel: ResponseService) => {
            if (responseExcel.state === "Success") {
                this.openSnackBar(responseExcel.userMessage, "Cerrar");
                this.dateForm.reset();
            }
        });
    }
    public pagination(paginate: any) {
        this.pageIndex = paginate.pageIndex;
        paginate.length = this.totalItems;
        this.from = paginate.pageSize * paginate.pageIndex + 1;
        this.to = paginate.pageSize * (paginate.pageIndex + 1);
        this.searchUser(this.paginate, this.from, this.to);
    }
    sort(event) {
        let name = event.active.toUpperCase();
        let direction = event.direction.toUpperCase();
        if (direction === "") {
            name = "";
        }
        this.searchUser(this.paginate, this.from, this.to, name, direction);
    }
}
