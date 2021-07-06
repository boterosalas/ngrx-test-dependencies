import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-dialog-filter-users',
  templateUrl: './dialog-filter-users.component.html',
  styleUrls: ['./dialog-filter-users.component.scss']
})
export class DialogFilterUsersComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private content: ContentService
    ) { 
    }
    
    ngOnInit() {
    this.filterForm();
    this.getAllBusiness();
  }

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
    firstDay: 1 // first day is monday
  }

  bussiness = [];
  chipsBussiness = [];

  status = [
    {value: 'Registrados'},
    {value: 'Activos nuevos'},
    {value: 'Usuario de baja'},
    {value: 'Activos'},
    {value: 'Inactivos 1'},
    {value: 'Inactivos 2'},
    {value: 'Inactivos 3'},
  ];

  comunication = [
    {value: 'Recibe comunicación'},
    {value: 'No recibe comunicación (Lista negra)'},
  ];

  commissions = [
    {value: 'Menos de $10.000'},
    {value: 'Mas de $10.000'},
    {value: 'Comisiones del periodo'},
  ];

  accountBank = [
    {value: 'Verificada'},
    {value: 'No verificada'},
  ];

  documents =  [
    {value: 'Con documentos'},
    {value: 'Sin documentos'},
  ];


  public getAllBusiness() {
    this.subscription = this.content.getAllBusiness().subscribe(resp => {
     this.bussiness = resp;
    })

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public filterForm() {
    this.filterUsers = this.fb.group(
      {
        dateRange: ['', Validators.required],
        status: ['', Validators.required],
        comunication: ['', Validators.required],
        commissions: ['', Validators.required],
        accountBank: ['', Validators.required],
        bussiness: ['', Validators.required],
        documents: ['', Validators.required],
      }
    );
  }

  public onChangeSelected(val) {
    console.log(val)
  }

}
