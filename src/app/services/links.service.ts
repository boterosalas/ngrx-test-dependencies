import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry, delay, retryWhen, concatMap, take, tap } from 'rxjs/operators';
import { ResponseService } from '../interfaces/response';
import { Observable, of, throwError, concat, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LinksService implements OnDestroy {
  getAmount$: Subscription = new Subscription();
  constructor(private http: HttpClient) { }

  url = environment.URL_REFERAL;
  ulrReport = environment.URL_REPORTS;
  urlComission = environment.URL_COMISSION;
  urlReports = environment.URL_REPORTS;
  urlApiContent = environment.URL_CONTENT;

  reports = 'Reports/ClickerPerformanceReport';
  apiKPI = 'Reports/getKPI';
  apikpiresume = 'Reports/getkpiresume';
  apiGetReports = 'reports/getreports';

  apikpibussiness = 'Reports/getkpibusiness';
  apiSalesByShops = 'reports/salesbyshops';
  apiGetComparativeDates = 'reports/getcomparativedates';

  apikpiTotal = 'Reports/getkpitotaldata';
  apiUsersExcel = 'Reports/getUsersExcel';
  apiGetCommissionsDeletedUsers = 'reports/getcommissionsdeletedusers';

  apiUsersHistoricalBankInformation = 'admin/gethistoricalbankinformation';
  apiAuditExcel = 'Reports/getAudit';
  apiAuditUserInfo = 'admin/getreportupdateinfoclicker';
  apiGetReportReferral = 'Reports/getreportreferral';
  apigetReportClickam = 'Reports/getReportClickam';
  apigetPaymentReport = 'reports/getpaymentreport';
  apigetReportTerms = 'reports/getterms';
  apigetReportCommissions = 'reports/getadmincommissions';
  apiUsers = 'Reports/getUsers';
  apiExportFilterUsers = 'reports/getusersfilter';
  insurance = 'Insurance/ProcessFiles';
  apiSaveLink = 'Link/SaveLink';
  apiSaveLinkRefered = 'link/savelinkreferred';
  apiPostReferrrals = 'Link/downloadReferrals';
  apiGetTotalLinks = 'Link/GetTotalLinksGenerated';
  apiGetUrl = 'link/geturl';
  apiGetUrlWidget = "link/savelinkwidget";
  apiFile = 'commissions/getUrlFileCommissions';
  apigetDetailPaymentClicker = 'commissions/getDetailPaymentClicker';
  apigenerateCommissions = 'commissions/generateCommissionsFile';
  apiHistory = 'commissions/getPaymentHistoryClicker';
  apiLinkHistory = 'linkhistory/getlinkhistory';
  apiupdatePaymentDate = 'commissions/updatePaymentDate';
  apiUpdateStatusCommissionFile = 'commissions/updatestatuscommissionfile';
  apiUpdateStatusCommission = 'commissions/updatestatuscommission';
  apiDeleteCommissionFile = 'commissions/deletecommissionfile';
  apiDeleteCommission = 'commissions/deletecommission';
  apiSaveCutOffDate = 'commissions/savecutoffdate';
  apiGetCutOffDate = 'commissions/getcutoffdate';
  apiGetReferrals = 'referrals/getreferrals';
  apiGetAmounts = 'amount/getamounts';
  apiSaveAmountCommission = 'amount/saveamountcommission';
  apiSaveAmountReferred = 'amount/saveamountreferred';
  apiGetmedals = 'medal/getmedals';
  apiPicking = 'picking/importfilepickingcommissions';
  apiOrder = 'business/orderbusiness';
  apiSellers = 'seller/getsellers';
  apiGetReport = 'reports/clickerperformancereport';
  apiGetReportById = 'reports/GetReportClickerRewards';
  apiGetReportMonth = 'reports/getcommissionpaymentreport';
  apiAudit = 'reports/getaudit';
  apikpiNovelties = 'new/getkpinovelties';
  apiReportRejected = 'reports/getreportrejected';
  apiGetOrderNumber = 'orders/getorder';
  apiReprocessOrdersInvoiced = 'orders/reprocessordersinvoiced';
  token = localStorage.getItem('ACCESS_TOKEN');
  authorization = this.token;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authorization,
    }),
  };

  public saveLink(SaveLink: any) {
    return this.http.post(`${this.url + this.apiSaveLink}`, SaveLink, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public sendPickingfile(formdata) {
    const data = new FormData();
    data.append('file', formdata.file);

    return this.http.post(`${environment.URL_COMISSION}${this.apiPicking}`, formdata, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public saveLinkRefer(SaveLink: any) {
    return this.http.post(`${this.url + this.apiSaveLinkRefered}`, SaveLink, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public saveAmountCommission(amount: any) {
    return this.http.post(`${this.urlComission + this.apiSaveAmountCommission}`, amount, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public saveCutOffDate(value: number) {
    return this.http.post(`${this.urlComission + this.apiSaveCutOffDate}`, { value: value }, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public saveAmountReferred(amount: any) {
    return this.http.post(`${this.urlComission + this.apiSaveAmountReferred}`, amount, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public downloadReferrals(dates: any) {
    return this.http.post(`${this.url + this.apiPostReferrrals}`, dates, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getReports() {
    const apiReport = `${this.reports}`;
    return this.http.get(`${this.urlComission}${apiReport}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getCutOffDate() {
    return this.http.get(`${this.urlComission}${this.apiGetCutOffDate}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getMedals() {
    return this.http.get(`${this.urlComission}${this.apiGetmedals}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getAmount() {
    this.getAmount$ = this.http.get(`${this.urlComission}${this.apiGetAmounts}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    ).subscribe((amount) => {
      localStorage.setItem('Amount', amount.amountsCommission);
      localStorage.setItem('AmonuntReferred', amount.amountsReferred);
    });
  }

  public getReferrals(params) {
    return this.http
      .get(`${this.urlComission}${this.apiGetReferrals}?from=${params.from}&to=${params.to}&orderBy=DATE&ordination=DESC`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(3000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((resp: ResponseService) => {
          return resp.objectResponse;
        })
      );
  }

  public getUrl(code: string) {
    return this.http.get(`${this.url}${this.apiGetUrl}?code=${code}`, this.httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }
  public getUrlWidget(data: any) {
    return this.http.post(`${this.url}${this.apiGetUrlWidget}`, data, this.httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getKPI(date: any) {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const authorization = token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authorization,

      }),
    };
    return this.http.get(`${this.urlComission}${this.apiKPI}?start=${date.start}&end=${date.end}`, httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }
  public getResume() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const authorization = token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authorization,

      }),
    };
    return this.http.get(`${this.urlReports}${this.apikpiresume}`, httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getBussinessKPI(date: any) {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const authorization = token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authorization,

      }),
    };
    const datesGet0 = date.start.split('T');
    const datesGet1 = date.end.split('T');
    return this.http.get(`${this.urlReports}${this.apikpibussiness}?start=${datesGet0[0]}&end=${datesGet1[0]}`, httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getBussinessPartnerKPI(params: any) {
    return this.http.get(`${this.urlReports}${this.apikpibussiness}?start=${params.startDate}&end=${params.endDate}&export=${params.export}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp;
      })
    );
  }

  public getSalesByShops(params: any) {
    return this.http.get(`${this.urlReports}${this.apiSalesByShops}?start=${params.startDate}&end=${params.endDate}&idbusiness=${params.idBusiness}`, this.httpOptions)
  }

  public getComparedates(params: any) {
    return this.http.get(`${this.urlReports}${this.apiGetComparativeDates}?start=${params.startDate}&end=${params.endDate}&startcompare=${params.startcompare}&endcompare=${params.endcompare}&export=${params.export}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp;
      })
    );
  }

  public getTotalKPI(date: any) {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const authorization = token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authorization,

      }),
    };
    const datesGet0 = date.start.split('T');
    const datesGet1 = date.end.split('T');
    return this.http.get(`${this.urlReports}${this.apikpiTotal}?start=${datesGet0[0]}&end=${datesGet1[0]}`, httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getPayment(userId: string, params: any) {
    return this.http.get(`${this.urlComission}${this.apiHistory}?userid=${userId}&from=${params.from}&to=${params.to}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getLinkHistory(params) {
    return this.http
      .get(`${this.urlReports}${this.apiLinkHistory}?from=${params.from}&to=${params.to}&orderBy=${params.orderBy}&ordination=${params.orderOrigin}&start=${params.startDate}&end=${params.endDate}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(3000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((resp: ResponseService) => {
          return resp.objectResponse;
        })
      );
  }

  public getFileReport() {
    return this.http.get(`${this.ulrReport}${this.apiGetReportMonth}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp;
      })
    );
  }

  public getDetailPaymentClicker(date: string, id: string) {
    return this.http.get(`${this.urlComission}${this.apigetDetailPaymentClicker}?userid=${id}&paymentDate=${date}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getUsersExcel(params: any) {
    return this.http.get(`${this.urlReports}${this.apiUsersExcel}?&start=${params.start}&end=${params.end}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public deleteImports(params: any) {
    return this.http.get(`${this.urlReports}${this.apiGetCommissionsDeletedUsers}?&start=${params.start}&end=${params.end}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getHistoricalBankInformation(params: any) {
    return this.http
      .get(`${this.urlReports}${this.apiUsersHistoricalBankInformation}?&start=${params.start}&end=${params.end}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(3000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public getAudit(params: any) {
    return this.http.get(`${this.urlComission}${this.apiAuditExcel}?&start=${params.start}&end=${params.end}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getReportReferral() {
    return this.http.get(`${this.urlComission}${this.apiGetReportReferral}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getReport(params: any) {
    return this.http.get(`${this.urlReports}${this.apiGetReports}?from=${params.from}&to=${params.to}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: any) => {
        return resp.objectResponse;
      })
    );
  }

  public getReportTerms() {
    return this.http.get(`${this.ulrReport}${this.apigetReportTerms}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getReportCommissions() {
    return this.http.get(`${this.ulrReport}${this.apigetReportCommissions}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getReportUser(id?: string) {
    return this.http.get(`${this.ulrReport}${this.apiGetReport}?userid=${id}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getRewardsReportById(params: any) {
    let queryString = '?';
    Object.keys(params).forEach((x, idx) => {
      queryString += `${x}=${Object.values(params)[idx]}&`
    })
    queryString = queryString.substring(0, queryString.length - 1);
    return this.http.get(`${this.ulrReport}${this.apiGetReportById}${queryString.length > 1 ? queryString : ''}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getReportClickam(params: any) {
    return this.http.get(`${this.urlReports}${this.apigetReportClickam}?&start=${params.start}&end=${params.end}&identification=${params.identification}&business=${params.business}&startoncreatedate=${params.startoncreatedate}&endoncreatedate=${params.endoncreatedate}&medium=${params.medium}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getPaymentReport(params: any) {
    return this.http.get(`${this.urlReports}${this.apigetPaymentReport}?&start=${params.start}&end=${params.end}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getAuditoria(params: any) {
    return this.http.get(`${this.urlReports}${this.apiAudit}?&start=${params.start}&end=${params.end}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }
  public getAuditoriaDatosUser(params: any) {
    return this.http.get(`${this.urlReports}${this.apiAuditUserInfo}?&start=${params.start}&end=${params.end}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }
  public sendfile(formdata) {
    const data = new FormData();
    data.append('FileBase64', formdata.fileBase64);
    // data.append("Business", formdata.business);
    data.append('email', formdata.email);

    return this.http.post(`${environment.URL_COMISSION}${this.apigenerateCommissions}`, formdata, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public updatePaymentDate(formdata) {
    const data = new FormData();
    data.append('FileBase64', formdata.fileBase64);
    data.append('email', formdata.email);
    return this.http.post(`${environment.URL_COMISSION}${this.apiupdatePaymentDate}`, formdata, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public searchUsers(data: any) {
    return this.http.post(`${this.urlReports}${this.apiUsers}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      ),
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }

  public exportFilterUsers(data: any) {
    return this.http.post(`${this.urlReports}${this.apiExportFilterUsers}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public putOrder(datos?: any) {
    return this.http.post(`${this.urlApiContent}${this.apiOrder}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getSellers() {
    return this.http.get(`${this.urlComission}${this.apiSellers}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }

  public getkpiNovelties(data: any) {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const authorization = token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authorization,

      }),
    };

    return this.http.post(`${this.urlReports}${this.apikpiNovelties}`, data, httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public updateStatusCommissionFile(formdata) {
    const httpOptionsForm = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authorization,

      }),
    };

    return this.http.post(`${environment.URL_COMISSION}${this.apiUpdateStatusCommissionFile}`, formdata, httpOptionsForm).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp;
      })
    );
  }

  public deleteCommissionFile(formdata) {
    const httpOptionsForm = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authorization,

      }),
    };

    return this.http.post(`${environment.URL_COMISSION}${this.apiDeleteCommissionFile}`, formdata, httpOptionsForm).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp;
      })
    );
  }

  public getReportRejected(date: any) {
    return this.http.get(`${this.ulrReport}${this.apiReportRejected}?start=${date.start}&end=${date.end}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp;
      })
    );
  }

  public updateCommission(data) {
    return this.http.post(`${environment.URL_COMISSION}${this.apiUpdateStatusCommission}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp;
      })
    );
  }

  public deleteCommission(data) {
    return this.http.post(`${environment.URL_COMISSION}${this.apiDeleteCommission}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp;
      })
    );
  }

  public getOrderNumber(params) {
    return this.http
      .get(`${this.urlComission}${this.apiGetOrderNumber}?orderid=${params.reference}&business=${params.bussiness}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(3000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((resp: ResponseService) => {
          return resp;
        })
      );
  }

  public reprocessOrdersInvoiced() {
    return this.http.post(`${environment.URL_COMISSION}${this.apiReprocessOrdersInvoiced}`, {}, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(1),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp;
      })
    );
  }

  ngOnDestroy(): void {
    this.getAmount$.unsubscribe();
  }

}
