import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { DataRangeInterface } from 'src/app/interfaces/dateRangeInterface';
import { LinksService } from 'src/app/services/links.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ResponseService } from 'src/app/interfaces/response';

@Component({
  selector: 'app-report-partner',
  templateUrl: './report-partner.component.html',
  styleUrls: ['./report-partner.component.scss'],
})
export class ReportPartnerComponent implements OnInit {
  startDate = moment(new Date());
  endDate = moment(new Date());
  items = [];

  constructor(private link: LinksService, private utils: UtilsService) {}

  ngOnInit(): void {
    this.getPartnersKPI();
  }

  public getDate(e: DataRangeInterface) {
    this.startDate = moment(e.startDate);
    this.endDate = moment(e.endDate);
    const params = {
      startDate: this.startDate.format('YYYY-MM-DD'),
      endDate: this.endDate.format('YYYY-MM-DD'),
      export: false,
    };
    this.link.getBussinessPartnerKPI(params).subscribe((kpiFilter: ResponseService) => {
      this.items =  kpiFilter.objectResponse;
    });
  }

  public exportOrderNotFinish() {
    const params = {
      startDate: this.startDate.format('YYYY-MM-DD'),
      endDate: this.endDate.format('YYYY-MM-DD'),
      export: true,
    };

    this.link.getBussinessPartnerKPI(params).subscribe((exportKpi:ResponseService) => {
      this.utils.openSnackBar(exportKpi.userMessage, 'cerrar')
    });
  }

  public getPartnersKPI() {
    const params = {
      startDate: this.startDate.format('YYYY-MM-DD'),
      endDate: this.endDate.format('YYYY-MM-DD'),
      export: false,
    };

    this.link.getBussinessPartnerKPI(params).subscribe((kpi:ResponseService) => {
      this.items = kpi.objectResponse;
    })
  }
}