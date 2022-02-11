import { Component, OnInit, ViewChild, OnDestroy, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ResponseService } from 'src/app/interfaces/response';
import { LinksService } from 'src/app/services/links.service';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogEditComponent } from 'src/app/modules/clicker/components/dialog-edit/dialog-edit.component';
moment.locale('es');
import Swal from 'sweetalert2';
import { Observable, Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent extends MatPaginatorIntl implements OnInit, OnDestroy {
  dataSource: any;
  pageIndex = 0;
  pageSize = 50;
  pageTo = 50;
  totalItems: number;
  paginate: string;
  dateForm: FormGroup;
  emailForm: FormGroup;
  dateReportChangeForm: FormGroup;
  private subscription: Subscription = new Subscription();
  ext: string;
  aux: number;
  maxDate = moment(new Date());
  orderOrigin: string;
  orderby: string;
  from: any;
  to: any;
  dateParams: any;
  dateParamsReport: any;
  disButon$: Observable<boolean>;
  disableButon: boolean;
  @ViewChild('templateDialogEmail', { static: false })
  templateEmail: TemplateRef<any>;
  @ViewChild('templateDialogFilter', { static: false })
  templateFilter: TemplateRef<any>;
  dialogRef: MatDialogRef<any>;
  emailPattern = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
  userId: string;
  userMail: string;
  dateNoVisible: boolean;
  export = false;
  filterData = [
    {
      searchtext: '',
      from: null,
      to: null,
      datestart: null,
      dateend: null,
      state: null,
      comunications: null,
      commissions: null,
      business: [],
      stateverification: null,
      documents: null,
      export: false,
      orderby: '',
      ordination: '',
    },
  ];
  selecteds = [
    {
      titulo: 'General',
      value: 1,
    },
    {
      titulo: 'Usuarios externos',
      value: 2,
    },
    {
      titulo: 'Cambios de datos bancarios',
      value: 3,
    },
    {
      titulo: 'Datos de gamificación',
      value: 4,
    },
    {
      titulo: 'Comentarios & Sugerencias',
      value: 5,
    },
    {
      titulo: 'Respuestas de cuentas eliminadas',
      value: 6,
    },
    {
      titulo: 'Referidos',
      value: 7,
    },
    {
      titulo: 'Visualización de las historias',
      value: 8,
    },
    {
      titulo: 'Validación de usuarios',
      value: 9,
    },
  ];

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

  constructor(
    private dialog: MatDialog,
    private usersService: UserService,
    private file: LinksService,
    private fb: FormBuilder,
    public utils: UtilsService,
    private router:Router
  ) {
    super();

    /**
     * Traduccion del paginador
     */

    this.itemsPerPageLabel = 'Items por página';
    this.nextPageLabel = 'Página siguiente';
    this.previousPageLabel = 'Página anterior';
    this.lastPageLabel = 'Última página';
    this.firstPageLabel = 'Primera página';

    this.getRangeLabel = function (page, pageSize, length) {
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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.searchUser('');
    this.formEmail();
    this.dateNoVisible = true;
    this.disableButon = true;
    this.aux = 0;
    this.dateForm = this.fb.group({
      dateRange: [null],
      tipoReport: [null, Validators.required],
    });
    this.dateReportChangeForm = this.fb.group({
      dateRange: [null, Validators.required],
    });
    this.checkRole();
    localStorage.removeItem('bussiness');
    localStorage.removeItem('formFilter');
  }

  checkRole() {
    this.utils.checkPermision();
  }

  pagination(paginate: any) {
    this.pageIndex = paginate;
    this.from = this.pageSize * this.pageIndex + 1 - 50;
    this.to = this.pageSize * (this.pageIndex + 1) - 50;
    this.searchUser(this.paginate, this.from, this.to);
  }

  /**
   * Metodo para buscar usuarios
   * @param term termino
   * @param from desde
   * @param to hasta
   * @param orderOrigin tipo de ordenamiento
   * @param orderby ordenar ASC o DESC
   */

  public searchUser(term, from = 1, to = this.pageTo, orderOrigin = '', orderby = '') {
    this.filterData[0].searchtext = term;
    this.filterData[0].to = to;
    this.filterData[0].from = from;
    this.filterData[0].orderby = orderOrigin;
    this.filterData[0].ordination = orderby;

    if (term !== this.paginate) {
      this.paginate = term;
      this.pageIndex = 0;
    }

    this.subscription = this.file.searchUsers(this.filterData).subscribe((user: any) => {
      this.totalItems = user.total;
      this.dataSource = user.users;
    });
  }

  public userEmail(user) {
    const userId = user.userId;
    const email = user.email;
    const template = this.templateEmail;
    const title = 'Actualizar correo';

    this.dialog.open(DialogEditComponent, {
      data: {
        title,
        template,
        userId,
        email,
      },
    });

    this.emailForm.controls.email.setValue(email);
    this.userMail = email;
    this.userId = userId;
  }

  public openModalFilters() {
    const template = this.templateFilter;
    const title = 'Filtrar Usuarios';

    this.dialogRef = this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        template,
      },
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public changeEmail() {
    Swal.fire({
      title: 'Actualizar correo',
      text: '¿Estás seguro de actualizar el correo?',
      type: 'info',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonClass: 'updateok order-last',
      cancelButtonClass: 'updatecancel',
      allowOutsideClick: false,
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.updateEmail();
      }
    });
  }

  public updateEmail() {
    const id = this.userId;
    const email = this.emailForm.controls.email.value;
    this.subscription = this.usersService.updateUserEmail(id, email).subscribe(
      (respEmail: ResponseService) => {
        this.dialog.closeAll();
        this.utils.openSnackBar(respEmail.userMessage, 'Cerrar');
        this.searchUser(this.paginate);
      },
      (err) => {
        this.utils.openSnackBar(err.userMessage, 'Cerrar');
      }
    );
  }

  public formEmail() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(64)]],
    });
  }

  public userData(user) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['usuario', user.userId]));
    window.open(url, '_blank');
  }


  public getUserExcel() {
    this.dateParams = {
      start: this.dateForm.controls.dateRange.value.startDate.format(),
      end: this.dateForm.controls.dateRange.value.endDate.format(),
    };

    this.subscription = this.file.getUsersExcel(this.dateParams).subscribe((responseExcel: ResponseService) => {
      if (responseExcel.state === 'Success') {
        this.utils.openSnackBar(responseExcel.userMessage, 'Cerrar');
        this.dateForm.reset();
        if (this.dateForm.controls.dateRange.value.startDate === null) {
          this.disableButon = true;
        }
      }
    });
  }

  public getReportChangeExcel() {
    this.dateParamsReport = {
      start: this.dateForm.controls.dateRange.value.startDate.format(),
      end: this.dateForm.controls.dateRange.value.endDate.format(),
    };
    this.subscription = this.file.getHistoricalBankInformation(this.dateParamsReport).subscribe((respExcel: ResponseService) => {
      if (respExcel.state === 'Success') {
        this.utils.openSnackBar(respExcel.userMessage, 'Cerrar');
        this.dateForm.reset();
        if (this.dateForm.controls.dateRange.value.startDate === null) {
          this.disableButon = true;
        }
      }
    });
  }

  change() {
    if (this.aux === 0 || this.aux === 1) {
      this.aux = 2;
    } else {
      this.disableButon = false;
    }
  }

  sort(event) {
    let name = event.active.toUpperCase();
    const direction = event.direction.toUpperCase();
    if (direction === '') {
      name = '';
    }
    this.searchUser(this.paginate, this.from, this.to, name, direction);
  }

  public updateEmployee() {
    this.subscription = this.usersService.updateEmployees().subscribe((respUpdate: ResponseService) => {
      this.utils.openSnackBar(respUpdate.userMessage, 'Cerrar');
    });
  }

  public getStoriesReport() {
    this.subscription = this.usersService.getReportStories().subscribe((respStories: ResponseService) => {
      this.dateForm.reset();
      if (this.dateForm.controls.dateRange.value.startDate === null) {
        this.disableButon = true;
      }
      this.utils.openSnackBar(respStories.userMessage, 'Cerrar');
    });
  }

  public exportusers() {
    this.subscription = this.usersService.getExternalUsers().subscribe((respExport: ResponseService) => {
      this.dateForm.reset();
      if (this.dateForm.controls.dateRange.value.startDate === null) {
        this.disableButon = true;
      }
      this.utils.openSnackBar(respExport.userMessage, 'Cerrar');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onChangeSelected(event) {
    if (event === 'Datos de gamificación' || event === 'Usuarios externos' || event === 'Visualización de las historias' || event === 'Validación de usuarios') {
      this.dateNoVisible = true;
      this.disableButon = false;
      this.dateForm.get('dateRange').setValue(null);
    } else {
      this.dateNoVisible = false;
      this.aux = 1;
      this.disableButon = true;
      this.dateForm.get('dateRange').setValue(null);
    }
  }
  public getGamification() {
    this.subscription = this.usersService.getReportGamification().subscribe((respuExportGamification: ResponseService) => {
      this.dateForm.reset();
      if (this.dateForm.controls.dateRange.value.startDate === null) {
        this.disableButon = true;
      }
      this.utils.openSnackBar(respuExportGamification.userMessage, 'Cerrar');
    });
  }
  public getComments() {
    this.dateParamsReport = {
      start: this.dateForm.controls.dateRange.value.startDate.format('Yyyy-MM-dd HH:mm:ss'),
      end: this.dateForm.controls.dateRange.value.endDate.format('Yyyy-MM-dd HH:mm:ss'),
    };
    this.subscription = this.usersService.getReportCommets(this.dateParamsReport).subscribe((excel: ResponseService) => {
      if (excel.state === 'Success') {
        this.utils.openSnackBar(excel.userMessage, 'Cerrar');
        this.dateForm.reset();
        if (this.dateForm.controls.dateRange.value.startDate === null) {
          this.disableButon = true;
        }
      }
    });
  }

  public getDeleteComments() {
    this.dateParamsReport = {
      start: this.dateForm.controls.dateRange.value.startDate.format('YYYY-MM-DD'),
      end: this.dateForm.controls.dateRange.value.endDate.format('YYYY-MM-DD'),
    };
    this.subscription = this.usersService.getDeleteCommetsRest(this.dateParamsReport).subscribe((remove: ResponseService) => {
      if (remove.state === 'Success') {
        this.utils.openSnackBar(remove.userMessage, 'Cerrar');
        this.dateForm.reset();
        if (this.dateForm.controls.dateRange.value.startDate === null) {
          this.disableButon = true;
        }
      }
    });
  }

  public getRefers() {
    this.dateParamsReport = {
      start: this.dateForm.controls.dateRange.value.startDate.format('YYYY-MM-DD'),
      end: this.dateForm.controls.dateRange.value.endDate.format('YYYY-MM-DD'),
    };
    this.subscription = this.usersService.getReportReferral(this.dateParamsReport).subscribe((respReferral: ResponseService) => {
      if (respReferral.state === 'Success') {
        this.utils.openSnackBar(respReferral.userMessage, 'Cerrar');
        this.dateForm.reset();
        if (this.dateForm.controls.dateRange.value.startDate === null) {
          this.disableButon = true;
        }
      }
    });
  }

  public getAnyReport() {
    if (this.dateForm.controls.tipoReport.value === '1') {
      this.getUserExcel();
    } else if (this.dateForm.controls.tipoReport.value === '2') {
      this.exportusers();
    } else if (this.dateForm.controls.tipoReport.value === '3') {
      this.getReportChangeExcel();
    } else if (this.dateForm.controls.tipoReport.value === '4') {
      this.getGamification();
    } else if (this.dateForm.controls.tipoReport.value === '5') {
      this.getComments();
    } else if (this.dateForm.controls.tipoReport.value === '6') {
      this.getDeleteComments();
    } else if (this.dateForm.controls.tipoReport.value === '7') {
      this.getRefers();
    } else if (this.dateForm.controls.tipoReport.value === '8') {
      this.getStoriesReport();
    } else if (this.dateForm.controls.tipoReport.value === '9') {
      this.validationUsers();
    }
  }

  public validationUsers(){
    this.subscription = this.usersService.getValidationlUsers().subscribe((validation: ResponseService) => {
      this.dateForm.reset();
      if (this.dateForm.controls.dateRange.value.startDate === null) {
        this.disableButon = true;
      }
      this.utils.openSnackBar(validation.userMessage, 'Cerrar');
    });
  }

  public exportUsersFilter() {
    this.filterData[0].export = true;
    this.subscription = this.file.searchUsers(this.filterData).subscribe(() => {
      this.filterData[0].export = false;
      this.utils.openSnackBar('Al terminar de procesar el archivo se enviará un correo', 'Cerrar');
    });
  }

  public infoFilter(data) {
    this.filterData = [
      {
        searchtext: this.paginate,
        from: 1,
        to: 50,
        datestart: data.dateStart,
        dateend: data.dateEnd,
        state: data.state,
        comunications: data.comunications,
        commissions: data.commissions,
        business: data.business,
        stateverification: data.stateVerification,
        documents: data.documents,
        export: this.export,
        orderby: 'IDENTIFICATION',
        ordination: 'ASC',
      },
    ];

    this.pageIndex = 0;

    this.subscription = this.file.searchUsers(this.filterData).subscribe((user: any) => {
      this.totalItems = user.total;
      this.dataSource = user.users;
    });
  }
}
