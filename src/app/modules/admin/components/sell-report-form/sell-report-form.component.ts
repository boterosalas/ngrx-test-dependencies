import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';
import { LinksService } from 'src/app/services/links.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sell-report-form',
  templateUrl: './sell-report-form.component.html',
  styleUrls: ['./sell-report-form.component.scss'],
})
export class SellReportFormComponent implements OnInit {
  maxDate = moment(new Date());

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

  sellForm: FormGroup;
  business: Object[] = [];

  type = [
    { title: 'Link', value: 'LINK' },
    { title: 'Cédula', value: 'CEDULA' },
    { title: 'Referido', value: 'REFERRED' },
    { title: 'Clickam', value: 'CLICKAM' },
  ];

  startDate: string;
  endDate: string;
  startDateComision: string;
  endDateComision: string;
  activeButton = true;

  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private link: LinksService,
    private utils: UtilsService,
    private content: ContentService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.sellForm = this.fb.group({
      business: [''],
      id: [''],
      medium: [''],
      dateRange: [null],
    });

    this.getAllBusiness();

    if (localStorage.getItem('starComission') !== null) {
      this.sellForm.controls.dateRange.setValue({
        startDate: localStorage.getItem('starComission'),
        endDate: localStorage.getItem('endComission'),
      });
      this.startDateComision = localStorage.getItem('starComission');
      this.endDateComision = localStorage.getItem('endComission');
      this.activeButton = false;
    }
  }

  public getAllBusiness() {
    this.subscription = this.content.getAllBusiness().subscribe((resp) => {
      this.business = resp;
    });
  }

  exportFilter() {
    const data = {
      start: this.startDateComision,
      end: this.endDateComision,
      identification: this.sellForm.controls.id.value,
      business: this.sellForm.controls.business.value,
      startoncreatedate: this.startDate === undefined ? '' : this.startDate,
      endoncreatedate: this.endDate === undefined ? '' : this.endDate,
      medium: this.sellForm.controls.medium.value,
    };

    this.subscription = this.link.getReportClickam(data).subscribe((resp: ResponseService) => {
      this.utils.openSnackBar(resp.userMessage, 'Cerrar');
      this.dialogRef.close();
    });
  }

  public filterDate(e) {
    this.startDate = e.startDate;
    this.endDate = e.endDate;
  }

  public filterComision(e) {
    this.startDateComision = moment(e.startDate._d).format('YYYY-MM-DD');
    this.endDateComision = moment(e.endDate._d).format('YYYY-MM-DD');

    localStorage.setItem('starComission', this.startDateComision);
    localStorage.setItem('endComission', this.endDateComision);

    if (this.startDate !== '') {
      this.activeButton = false;
    } else {
      this.activeButton = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
