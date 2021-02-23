import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import * as moment from "moment";
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
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder
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
  dataSource: any;
  displayedColumns: string[] = ['idclicker', 'subscription', 'users', 'identification', 'cellphone', 'email', 'status'];
  ngOnInit() {
    this.dateForm = this.fb.group({
      dateRange: [null],
    });
    this.searchForm = this.fb.group({
      search: [null],
    });
    this.dataSource = [{
      idclicker: 1,
      firstNames: "Santiago",
      lastNames: "Teran",
      cellphone: "3224981267",
      identification: "12121212",
      email: "hamil@unicauca.edu.co",
      state: "Activo",
      solicitud: "2020-02-04"
    },
    {
      idclicker: 2,
      firstNames: "Santiago",
      lastNames: "Teran",
      identification: "12121212",
      cellphone: "3224981267",
      email: "hamil@unicauca.edu.co",
      state: "Inactivo",
      solicitud: "2020-02-04"
    },
    {
      idclicker: 3,
      firstNames: "Santiago",
      lastNames: "Teran",
      cellphone: "3224981267",
      identification: "12121212",
      email: "hamil@unicauca.edu.co",
      state: "Inactivo",
      solicitud: "2020-02-04"
    },
    {
      idclicker: 4,
      firstNames: "Santiago",
      lastNames: "Teran",
      cellphone: "3224981267",
      identification: "12121212",
      email: "hamil@unicauca.edu.co",
      state: "Inactivo",
      solicitud: "2020-02-04"
    }]
  }
  public openDialog() {
    const title = "";
    const template = "";
    this.dialog.open(DialogNewsComponent, {
      data: {
        title,
        template,
      },
    });
  }
}
