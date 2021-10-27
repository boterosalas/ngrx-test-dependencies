import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { UtilsService } from 'src/app/services/utils.service';
import { LinksService } from 'src/app/services/links.service';
import { ContentService } from 'src/app/services/content.service';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { dataAdditionalInfo } from '../../../../content/content-aditional-info-commissions';
import Swal from 'sweetalert2';
import { DataRangeInterface } from 'src/app/interfaces/dateRangeInterface';
moment.locale('es');
@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.scss'],
})
export class CommissionsComponent implements OnInit {
  maxDate = moment(new Date());
  dateFormCommission: FormGroup;
  searchForm: FormGroup;
  pageTo = 20;
  paginate: string;
  pageIndex = 0;
  totalItems: number;
  textConfirm: string;
  typeConfirm: string;
  commissions: Array<any>;
  currentCommission: any;
  pageSize: number;
  from: any;
  to: any;
  name: any;
  direction: any;
  dataAdditionalInfoValue: any;
  startDate: string;
  endDate: string;

  @ViewChild('templateAdditionalInfo', { static: false })
  templateAdditionalInfo: TemplateRef<any>;

  @ViewChild('templateConfirm', { static: false })
  templateConfirm: TemplateRef<any>;

  dataSource: any;
  displayedColumns: string[] = [
    'identification',
    'nameuser',
    'idusers',
    'commissiondate',
    'idcommission',
    'business',
    'product',
    'ordernumber',
  ];

  private subscription: Subscription = new Subscription();
  constructor(
    private paginator: MatPaginatorIntl,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public utils: UtilsService,
    private link: LinksService,
    private contentService: ContentService
  ) {
    this.dataAdditionalInfoValue = dataAdditionalInfo;

    this.paginator.itemsPerPageLabel = 'Ítems por página';
    this.paginator.getRangeLabel = function (page, pageSize, length) {
      if (length === 0 || pageSize === 0) {
        return '0 de ' + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return startIndex + 1 + ' de ' + endIndex + ' ítems de ' + length;
    };
  }
  locale = {
    locale: 'es',
    direction: 'ltr', // could be rtl
    weekLabel: 'W',
    separator: ' a ', // default is ' - '
    cancelLabel: 'Cancelar', // detault is 'Cancel'
    applyLabel: 'Aplicar', // detault is 'Apply'
    clearLabel: 'Limpiar', // detault is 'Clear'
    customRangeLabel: 'Custom range',
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: 1, // first day is monday
  };
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnInit() {
    //   this.searchCommission('');
    this.dateFormCommission = this.fb.group({
      dateRange: {
        startDate: moment(new Date(2020, 1, 1), 'DD/MM/YYYY'),
        endDate: moment(new Date(), 'DD/MM/YYYY'),
      },
    });
    this.searchForm = this.fb.group({
      search: [null],
    });
    this.checkRole();
  }
  checkRole() {
    this.utils.checkPermision();
  }

  public searchCommission(term, from = 1, to = this.pageTo, orderOrigin = '', orderBy = '') {
    if (term !== this.paginate) {
      this.paginate = term;
      this.pageIndex = 0;
    }

    const start = this.dateFormCommission
      ? this.dateFormCommission.controls.dateRange.value.startDate.format('YYYY-MM-DD')
      : moment(new Date(2020, 0, 1)).format('YYYY-MM-DD');
    const end = this.dateFormCommission
      ? this.dateFormCommission.controls.dateRange.value.endDate.format('YYYY-MM-DD')
      : moment().format('YYYY-MM-DD');

    const params = { start, end, term, from, to, orderOrigin, orderBy };
    this.subscription = this.contentService.getCommissionsSearch(params).subscribe((resp: any) => {
      this.commissions = resp.objectResponse.commissions;
      this.totalItems = resp.objectResponse.total;
      this.dataSource = new MatTableDataSource<any>(this.commissions);
    });
  }
  public openCommission(commission) {
    this.currentCommission = commission.id;

    this.setValueAdditionalInfo(commission);

    const id = 'modal-commission';
    const title = '';
    const template = this.templateAdditionalInfo;

    this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        template,
        id,
      },
    });
  }

  public openConfirm(type) {
    this.typeConfirm = type;
    this.textConfirm =
      type === 'rejected-commission'
        ? '¿Está seguro que desea rechazar la comisión seleccionada?'
        : '¿Está seguro que desea eliminar la comisión seleccionada?';

    const id = type;
    const title = type === 'rejected-commission' ? 'Rechazar comisión' : 'Eliminar comisión';
    const template = this.templateConfirm;

    this.dialog.open(ModalGenericComponent, {
      data: {
        template,
        title,
        id,
      },
    });
  }

  private setValueAdditionalInfo(commission) {
    const keysCommission = Object.keys(commission);

    for (let index = 0; index < keysCommission.length; index++) {
      const key = keysCommission[index];
      for (let index2 = 0; index2 < this.dataAdditionalInfoValue.length; index2++) {
        if (this.dataAdditionalInfoValue[index2].info.some((x) => x.code === key)) {
          this.dataAdditionalInfoValue[index2].info.find((x) => x.code === key).value = commission[key];
          break;
        }
      }
    }
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
    if (this.direction === '') {
      this.name = '';
    }
    this.searchCommission(this.paginate, this.from, this.to, this.name, this.direction);
  }

  handleFileInput(event, typeUpload: string) {
    const file: FileList = event.target.files;

    if (this.validFormat(file[0].name)) {
      const formDataCommission: FormData = new FormData();
      formDataCommission.append('formFile', file[0], file[0].name.replace(' ', '_'));

      if (typeUpload === 'rejected') {
        this.subscription = this.link.updateStatusCommissionFile(formDataCommission).subscribe((status: ResponseService) => {
          let text;
          let type;
          if (status.state === 'Success') {
            text = 'Se ha subido exitosamente el archivos de comisiones rechazadas.';
            type = 'success';
          } else {
            text = 'No pudimos cargar el archivos de comisiones rechazadas.';
            type = 'error';
          }

          this.openSwal(text, type, 'rejected');
        });
      } else if (typeUpload === 'eliminated') {
        this.subscription = this.link.deleteCommissionFile(formDataCommission).subscribe((remove: ResponseService) => {
          let text;
          let type;
          if (remove.state === 'Success') {
            text = 'Se ha subido exitosamente el archivos de comisiones eliminadas.';
            type = 'success';
          } else {
            text = 'No pudimos cargar el archivos de comisiones eliminadas.';
            type = 'error';
          }

          this.openSwal(text, type, 'eliminated');
        });
      }
    } else {
      this.openSnackBar('Formato inválido solo se pueden subir archivos con la extensión xlsx, xls', 'Cerrar');
    }
  }

  private openSwal(text, type, typeUpload) {
    Swal.fire({
      text,
      type,
      confirmButtonText: 'Aceptar',
      confirmButtonClass: `upload-${type}`,
    }).then(() => {
      this.searchCommission(this.paginate, this.from, this.to, this.name, this.direction);
    });
  }

  private validFormat(nameFile: string) {
    const splitExt = nameFile.split('.');
    const getExtension = splitExt[splitExt.length - 1].toLocaleLowerCase();
    if (getExtension === 'xlsx' || getExtension === 'xls') {
      return true;
    }
    return false;
  }

  public getReportRejected() {
    const date = {
      start: this.dateFormCommission.controls.dateRange.value.startDate.format(),
      end: this.dateFormCommission.controls.dateRange.value.endDate.format(),
    };

    this.subscription = this.link.getReportRejected(date).subscribe((resp: ResponseService) => {
      this.openSnackBar(resp.userMessage, 'Cerrar');
    });
  }

  public updateCommission() {
    const data = {
      id: this.currentCommission,
      statusCommission: 'Rechazado',
    };

    this.subscription = this.link.updateCommission(data).subscribe((update: ResponseService) => {
      this.openSnackBar(update.userMessage, 'Cerrar');
      this.dialog.closeAll();
      this.searchCommission(this.paginate, this.from, this.to, this.name, this.direction);
    });
  }

  public deleteCommission() {
    const data = {
      id: this.currentCommission,
    };

    this.subscription = this.link.deleteCommission(data).subscribe((resp: ResponseService) => {
      this.openSnackBar(resp.userMessage, 'Cerrar');
      this.dialog.closeAll();
      this.searchCommission(this.paginate, this.from, this.to, this.name, this.direction);
    });
  }

  onNoClick(): void {
    const close: any = document.querySelector(`#${this.typeConfirm} #closeDialog`);
    if (close) {
      close.click();
    }
  }

  public generateCommisions(): void {
    this.contentService.generateComissions().subscribe();
  }

  public getDate(e:DataRangeInterface) {
    this.startDate = e.startDate;
    this.endDate = e.endDate;
  }

  public exportOrderNotFinish() {
    const params = {
      startDate: this.startDate,
      endDate : this.endDate
    }

    console.log(params);

  }

}
