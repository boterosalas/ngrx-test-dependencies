import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';
import { LinksService } from 'src/app/services/links.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-dialog-filter-users',
  templateUrl: './dialog-filter-users.component.html',
  styleUrls: ['./dialog-filter-users.component.scss'],
})
export class DialogFilterUsersComponent implements OnInit, OnDestroy {
  constructor(public fb: FormBuilder, private content: ContentService, private link:LinksService, private utils: UtilsService) {}

  private subscription: Subscription = new Subscription();
  maxDate = moment(new Date());
  dateParams: any;
  showDate = true;
  filterUsers: FormGroup;
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

  bussiness = [];
  chipsBussiness = [];
  chipsBussinessId = [];

  selectable = true;
  removable = true;
  addOnBlur = true;
  @Output() objectSend = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input() filter: boolean;

  status = [
    { name: 'Registrados', value: 'REGISTRADOS' },
    { name: 'Activos nuevos', value: 'NUEVOS' },
    { name: 'Usuario de baja', value: 'BAJA' },
    { name: 'Activos', value: 'ACTIVOS' },
    { name: 'Inactivos 1', value: 'INACTIVOS1' },
    { name: 'Inactivos 2', value: 'INACTIVOS2' },
    { name: 'Inactivos 3', value: 'INACTIVOS3' },
  ];

  comunication = [
    { name: 'Email', value: 'EMAIL' },
    { name: 'SMS', value: 'SMS' },
    { name: 'Email/SMS', value: 'EMAILSMS' },
    { name: 'Ninguna', value: 'NINGUNA' },
  ];

  commissions = [
    { name: 'Menos de $10.000', value: 'MENOR' },
    { name: 'Mas de $10.000', value: 'MAYOR' },
    { name: 'Comisiones del periodo', value: 'PERIODO' },
  ];

  accountBank = [
    { name: 'Verificada', value: true },
    { name: 'No verificada', value: false },
  ];

  documents = [
    { name: 'Con documentos', value: 'CONDOCUMENTOS' },
    { name: 'Con Rut', value: 'CONRUT' },
    { name: 'Sin documentos', value: 'SINDOCUMENTOS' },
  ];

  ngOnInit() {
    this.filterForm();
    this.getAllBusiness();

    if(!this.filter) {
          const filterData = localStorage.getItem('formFilter');
          const bussinesss = localStorage.getItem('bussiness');
      
          if (filterData !== null) {
            const obFr = JSON.parse(filterData);
            this.filterUsers.controls.comunication.setValue(obFr.comunication);
            this.filterUsers.controls.status.setValue(obFr.status);
            this.filterUsers.controls.commissions.setValue(obFr.commissions);
            this.filterUsers.controls.accountBank.setValue(obFr.accountBank);
            this.filterUsers.controls.documents.setValue(obFr.documents);
            const startDate = obFr.dateRange.startDate === null ? '' : obFr.dateRange.startDate;
            const endDate = obFr.dateRange.endDate === null ? '' : obFr.dateRange.endDate;
            this.filterUsers.controls.dateRange.setValue({
              startDate: startDate,
              endDate: endDate,
            });
          }
      
          if (bussinesss !== null) {
            const obbus = JSON.parse(bussinesss);
            this.chipsBussiness = obbus;
          }
    }
  }

  public getAllBusiness() {
    this.subscription = this.content.getAllBusiness().subscribe((resp) => {
      this.bussiness = resp;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public filterForm() {
    this.filterUsers = this.fb.group({
      dateRange: [''],
      status: [null],
      comunication: [null],
      commissions: [null],
      accountBank: [null],
      bussiness: [''],
      chipBussiness: [''],
      documents: [null],
    });
  }

  public resetStatus() {
    this.filterUsers.controls.status.setValue(null);
  }

  public resetComunication() {
    this.filterUsers.controls.comunication.setValue(null);
  }

  public resetCommissions() {
    this.filterUsers.controls.commissions.setValue(null);
  }

  public resetAccount() {
    this.filterUsers.controls.accountBank.setValue(null);
  }

  public resetDocuments() {
    this.filterUsers.controls.documents.setValue(null);
  }

  public onChangeSelected(val) {
    if (this.chipsBussiness.length === 0) {
      this.chipsBussiness.push(val);
      localStorage.setItem('bussiness', JSON.stringify(val));
    } else {
      if (this.chipsBussiness.includes(val) === false) {
        this.chipsBussiness.push(val);
      }
    }
    localStorage.setItem('bussiness', JSON.stringify(this.chipsBussiness));
  }

  remove(bussiness: any): void {
    const index = this.chipsBussiness.indexOf(bussiness);

    if (index >= 0) {
      this.chipsBussiness.splice(index, 1);
    }
  }

  public clearFilters() {
    this.filterUsers.reset();
    this.chipsBussiness = [];
    this.chipsBussinessId = [];
    localStorage.removeItem('bussiness');
    localStorage.removeItem('formFilter');
  }

  public aplyFilters() {
    this.chipsBussinessId = [];
    this.chipsBussiness.forEach((element) => {
      this.chipsBussinessId.push(element.id);
    });

    const validDateStart =
      this.filterUsers.controls.dateRange.value.startDate === undefined ||
      this.filterUsers.controls.dateRange.value.startDate === null ||
      this.filterUsers.controls.dateRange.value.startDate === '';
    const validDateEnd =
      this.filterUsers.controls.dateRange.value.endDate === undefined ||
      this.filterUsers.controls.dateRange.value.endDate === null ||
      this.filterUsers.controls.dateRange.value.endDate === '';

    const data = {
      dateStart: validDateStart ? null : this.filterUsers.controls.dateRange.value.startDate,
      dateEnd: validDateEnd ? null : this.filterUsers.controls.dateRange.value.endDate,
      state: this.filterUsers.controls.status.value,
      comunications: this.filterUsers.controls.comunication.value,
      commissions: this.filterUsers.controls.commissions.value,
      business: this.chipsBussinessId,
      stateVerification: this.filterUsers.controls.accountBank.value,
      documents: this.filterUsers.controls.documents.value,
    };

    
    if(!this.filter) {
      this.objectSend.emit(data);
    } else {
      this.subscription = this.link.exportFilterUsers([data]).subscribe((resp: ResponseService) => {
        this.utils.openSnackBar(resp.userMessage, 'Cerrar');
      });
    }

    localStorage.setItem('formFilter', JSON.stringify(this.filterUsers.value));
  }

  public closeModal() {
    this.close.emit();
  }
}
