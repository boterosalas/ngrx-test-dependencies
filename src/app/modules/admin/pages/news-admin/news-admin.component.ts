import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
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
    from: any;
    to: any;
    private subscription: Subscription = new Subscription();
    constructor(
        private dialog: MatDialog,
        private fb: FormBuilder,
        private usersService: UserService,
        private _snackBar: MatSnackBar,
    ) { }
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
        this.dataSource = [{
            consecutive: "000001",
            name: "Santiago Teran",
            cellphone: "3224981267",
            idclicker: "santer457",
            identification: "12121212",
            email: "hamil@unicauca.edu.co",
            urlImage: "",
            statusnovelty: "Pendiente",
            datenovelty: "2020-02-04",
            businessdescription: "Haceb",
            date: "2021-02-25",
            code: "12223444",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            consecutive: "000002",
            name: "Santiago Teran",
            identification: "12121212",
            idclicker: "santer457",
            cellphone: "3224981267",
            date: "2021-02-25",
            email: "hamil@unicauca.edu.co",
            statusnovelty: "Revision",
            urlImage: "https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg",
            datenovelty: "2020-02-04",
            businessdescription: "Haceb",
            code: "12223444",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            consecutive: "000003",
            name: "Santiago Teran",
            date: "2021-02-25",
            cellphone: "3224981267",
            idclicker: "santer457",
            identification: "12121212",
            email: "hamil@unicauca.edu.co",
            statusnovelty: "Revision",
            urlImage: "https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg",
            datenovelty: "2020-02-04",
            businessdescription: "Haceb",
            code: "12223444",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            consecutive: "000004",
            name: "Santiago Teran",
            cellphone: "3224981267",
            date: "2021-02-25",
            idclicker: "santer457",
            identification: "12121212",
            urlImage: "https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg",
            email: "hamil@unicauca.edu.co",
            statusnovelty: "Solucionado",
            businessdescription: "Haceb",
            datenovelty: "2020-02-04",
            code: "12223444",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }]
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
}
