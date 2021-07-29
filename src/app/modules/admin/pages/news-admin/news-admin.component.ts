import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MatPaginatorIntl,
  MatSnackBar,
  MatTableDataSource,
} from "@angular/material";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { ResponseService } from "src/app/interfaces/response";
import { UserService } from "src/app/services/user.service";
import { UtilsService } from "src/app/services/utils.service";
import { LinksService } from "src/app/services/links.service";
//import { ModalGeneicComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { DialogNewsComponent } from "../../components/dialog-news/dialog-news.component";
import { ModalGenericComponent } from "src/app/modules/shared/components/modal-generic/modal-generic.component";
moment.locale("es");
@Component({
  selector: "app-news-admin",
  templateUrl: "./news-admin.component.html",
  styleUrls: ["./news-admin.component.scss"],
})
export class NewsAdminComponent implements OnInit {
  searchForm: FormGroup;
  pageTo: number = 50;
  paginate: string;
  pageIndex: number = 0;
  totalItems: number;
  newsUser: Array<any>;
  pageSize: number = 50;
  from: any;
  to: any;
  name: any;
  direction: any;
  dialogRef: MatDialogRef<any>;
  @ViewChild("templateDialogFilter", { static: false })
  templateFilter: TemplateRef<any>;
  export = false;
  filterData = 
    {
      searchText: "",
      from: null,
      to: null,
      start: null,
      end: null,
      state: null,
      business: [],
      export: false,
      orderBy: "",
      ordination: "",
    }
  

  items = [
    {
      code: "totalnovelties",
      title: "Total de novedades",
      icon: "tio-message_failed",
      number: 0,
    },
    {
      code: "totalpending",
      title: "Pendientes",
      icon: "tio-info",
      number: 0,
    },
    {
      code: "totalinprogress",
      title: "En revisión",
      icon: "tio-time",
      number: 0,
    },
    {
      code: "totalsolved",
      title: "Solucionados",
      icon: "tio-checkmark_circle",
      number: 0,
    },
    {
      code: "totalusers",
      title: "Usuarios únicos",
      icon: "tio-account_circle",
      number: 0,
    },
    {
      code: "effectiveness",
      title: "Tasa de efectividad",
      icon: "tio-chart_bar_4",
      number: 0,
    },
  ];

  private subscription: Subscription = new Subscription();
  constructor(
    private paginator: MatPaginatorIntl,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private usersService: UserService,
    private _snackBar: MatSnackBar,
    public utils: UtilsService,
    private kpi: LinksService
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
    firstDay: 1, // first day is monday
  };

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  dataSource: any;
 

  ngOnInit() {
    this.searchUser("");
    this.searchForm = this.fb.group({
      search: [null],
    });
    this.checkRole();
    this.getKPI();
    localStorage.removeItem('bussinessNovelties');
    localStorage.removeItem('formFilterNovelties');
  }

  checkRole() {
    this.utils.checkPermision();
  }

  public getKPI() {
    this.subscription = this.kpi.getkpiNovelties(this.filterData).subscribe((resp) => {
      this.items = this.items.map((item) => {
        return {
          ...item,
          number:
            item.code === "effectiveness"
              ? resp[item.code] * 100
              : resp[item.code],
        };
      });
    });
  }

  public searchUser(
    term,
    from = 1,
    to = this.pageTo,
    orderOrigin = "",
    orderBy = ""
  ) {

    this.filterData.searchText = term;
    this.filterData.to = to;
    this.filterData.from = from;
    this.filterData.orderBy = orderOrigin;
    this.filterData.ordination = orderBy;

    if (term !== this.paginate) {
      this.paginate = term;
      this.pageIndex = 0;
    }

    this.subscription = this.usersService
      .getAllNews(this.filterData)
      .subscribe((user: any) => {
        this.newsUser = user.novelties;
        this.totalItems = user.total;
        if(this.pageIndex ===  0){
          this.dataSource = this.newsUser.slice(this.pageIndex, this.pageSize);
        } else {
          this.dataSource = this.newsUser.slice(this.pageIndex  * this.pageSize - this.pageSize, this.pageIndex  * this.pageSize);
          // this.newsUser =   user.novelties;
          this.dataSource = user.novelties;
        }
      });
  }

  public openDialog(element: any) {
    const title = "";
    const template = "";
    this.dialog.open(DialogNewsComponent, {
      height: '500px',
      data: {
        title,
        template,
        element,
      },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.searchUser(this.paginate, this.from, this.to);
      this.getKPI();
    });
  }

  public getReportExcel() {
    this.filterData.export = true;
    this.usersService
      .getExportNewsExcel(this.filterData)
      .subscribe((responseExcel: ResponseService) => {
        if (responseExcel.state === "Success") {
          this.openSnackBar(responseExcel.userMessage, "Cerrar");
        }
      });
  }

  pagination(paginate: any) {
    this.pageIndex = paginate;
    this.from = (this.pageSize * this.pageIndex + 1) - 50;
    this.to = (this.pageSize * (this.pageIndex + 1)) - 50;
    this.searchUser(
      this.paginate,
      this.from,
      this.to,
      this.name,
      this.direction
    );
    
  }


  sort(event) {
    this.name = event.active.toUpperCase();
    this.direction = event.direction.toUpperCase();
    if (this.direction === "") {
      this.name = "";
    }
    this.searchUser(
      this.paginate,
      this.from,
      this.to,
      this.name,
      this.direction
    );
  }

  public openModalFilters() {
    const template = this.templateFilter;
    const title = "Filtrar novedades";

    this.dialogRef = this.dialog.open(ModalGenericComponent, {
      width: "800px",
      maxWidth: "90vw",
      data: {
        title,
        template,
      },
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public infoFilter(data) {
    this.filterData = 
      {
        searchText: this.paginate,
        from: 1,
        to: 50,
        start: data.dateStart,
        end: data.dateEnd,
        state: data.state,
        business: data.business,
        export: this.export,
        orderBy: "IDENTIFICATION",
        ordination: "ASC",
      }
    

    this.pageIndex = 0;

    this.subscription = this.usersService
      .getAllNews(this.filterData)
      .subscribe((user: any) => {
        this.newsUser = user.novelties;
        this.totalItems = user.total;
        this.dataSource = user.novelties;
      });

      this.getKPI();

      
  }

}
