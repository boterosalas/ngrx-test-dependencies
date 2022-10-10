import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { DataRangeInterface } from 'src/app/interfaces/dateRangeInterface';
import { LinksService } from 'src/app/services/links.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ResponseService } from 'src/app/interfaces/response';
import decode from 'jwt-decode';

@Component({
  selector: 'app-report-partner',
  templateUrl: './report-partner.component.html',
  styleUrls: ['./report-partner.component.scss'],
})
export class ReportPartnerComponent implements OnInit {
  startDate = moment(new Date());
  startCompareDate = undefined;
  endDate = moment(new Date());
  endCompareDate = undefined;
  phygitalReportData = [];
  items = [];
  name: string = '';
  icon: string;
  selectedDate: boolean;
  showCashier = false;
  showPartner = false;
  decodeToken = decode(localStorage.getItem('ACCESS_TOKEN'))

  constructor(private link: LinksService, private utils: UtilsService) { }

  ngOnInit(): void {
    this.resetDates();

    if (this.decodeToken.role === 'PARTNER') {
      this.showPartner = true;
      this.showCashier = false;
    }

    if (this.decodeToken.role === 'PARTNER-CASHIER') {
      this.showPartner = false;
      this.showCashier = true;
    }
  }

  public getDate(e: DataRangeInterface) {
    this.startDate = moment(e.startDate);
    this.endDate = moment(e.endDate);
    this.selectedDate = true;

    const params = {
      startDate: this.startDate.format('YYYY-MM-DD'),
      endDate: this.endDate.format('YYYY-MM-DD'),
      export: false,
    };


    if (!this.startCompareDate) {
      this.getSales();
      this.link.getBussinessPartnerKPI(params).subscribe((kpiFilter: ResponseService) => {
        this.items = kpiFilter.objectResponse.kpi;
      });
    } else {
      const params = {
        startDate: this.startDate.format('YYYY-MM-DD'),
        endDate: this.endDate.format('YYYY-MM-DD'),
        startcompare: this.startCompareDate.format('YYYY-MM-DD'),
        endcompare: this.endCompareDate.format('YYYY-MM-DD'),
        export: false,
      };

      this.link.getComparedates(params).subscribe((compare: ResponseService) => {
        this.items = compare.objectResponse.kpi;
      });

    }

  }

  public getCompareDate(e: DataRangeInterface) {
    this.startCompareDate = moment(e.startDate);
    this.endCompareDate = moment(e.endDate);
    const params = {
      startDate: this.startDate.format('YYYY-MM-DD'),
      endDate: this.endDate.format('YYYY-MM-DD'),
      startcompare: this.startCompareDate.format('YYYY-MM-DD'),
      endcompare: this.endCompareDate.format('YYYY-MM-DD'),
      export: false,
    };

    this.link.getComparedates(params).subscribe((compare: ResponseService) => {
      this.items = compare.objectResponse.kpi;
    });
  }

  public exportOrderNotFinish() {
    const params = {
      startDate: this.startDate.format('YYYY-MM-DD'),
      endDate: this.endDate.format('YYYY-MM-DD'),
      export: true,
    };

    if (this.startCompareDate || this.endCompareDate) {
      const paramsCompare = {
        startDate: this.startDate.format('YYYY-MM-DD'),
        endDate: this.endDate.format('YYYY-MM-DD'),
        startcompare: this.startCompareDate.format('YYYY-MM-DD'),
        endcompare: this.endCompareDate.format('YYYY-MM-DD'),
        export: true,
      };

      this.link.getComparedates(paramsCompare).subscribe((exportCompare: ResponseService) => {
        this.utils.openSnackBar(exportCompare.userMessage, 'cerrar');
      });
    } else {
      this.getSales();
      this.link.getBussinessPartnerKPI(params).subscribe((exportKpi: ResponseService) => {
        this.utils.openSnackBar(exportKpi.userMessage, 'cerrar');
      });
    }
  }

  resetDates(){
    this.getPartnersKPI();
    this.getSales();
  }

  public getPartnersKPI() {

    this.startCompareDate = undefined;

    const params = {
      startDate: this.startDate.format('YYYY-MM-DD'),
      endDate: this.endDate.format('YYYY-MM-DD'),
      export: false,
    };

    this.link.getBussinessPartnerKPI(params).subscribe((kpi: ResponseService) => {
      this.items = kpi.objectResponse.kpi;
      this.name = kpi.objectResponse.business;
      this.icon = kpi.objectResponse.icon;
    });

  }

  getSales(){
    const params = {
      startDate: this.startDate.format('YYYY-MM-DD'),
      endDate: this.endDate.format('YYYY-MM-DD'),
      idBusiness: this.decodeToken.idbusiness || '75',
    };
    this.link.getSalesByShops(params).subscribe((res: any) => {
      this.phygitalReportData = res.objectResponse;
    });
  }
}
