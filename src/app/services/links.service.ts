import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry, delay, retryWhen, concatMap, take, tap } from 'rxjs/operators';
import { ResponseService } from '../interfaces/response';
import { Observable, of, throwError, concat } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  constructor(private http: HttpClient) {}

  url = environment.URL_REFERAL;
  ulrReport = environment.URL_REPORTS;
  urlComission = environment.URL_COMISSION;
  urlReports = environment.URL_REPORTS;
  urlApiContent = environment.URL_CONTENT;

  reports = 'Reports/ClickerPerformanceReport';
  apiKPI = 'Reports/getKPI';
  apikpiresume = 'Reports/getkpiresume';

  apikpibussiness = 'Reports/getkpibusiness';

  apikpiTotal = 'Reports/getkpitotaldata';
  apiUsersExcel = 'Reports/getUsersExcel';

  apiUsersHistoricalBankInformation = 'admin/gethistoricalbankinformation';
  apiAuditExcel = 'Reports/getAudit';
  apiAuditUserInfo = 'admin/getreportupdateinfoclicker';
  apiGetReportReferral = 'Reports/getreportreferral';
  apigetReportClickam = 'Reports/getReportClickam';
  apigetReportTerms = 'reports/getterms';
  apigetReportCommissions = 'reports/getadmincommissions';
  apiUsers = 'Reports/getUsers';
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
  apiGetReferrals = 'referrals/getreferrals';
  apiGetAmounts = 'amount/getamounts';
  apiSaveAmountCommission = 'amount/saveamountcommission';
  apiSaveAmountReferred = 'amount/saveamountreferred';
  apiGetmedals = 'medal/getmedals';
  apiPicking = 'picking/importfilepickingcommissions';
  apiOrder = 'business/orderbusiness';
  apiSellers = 'seller/getsellers';
  apiGetReport = 'reports/clickerperformancereport';
  apiGetReportMonth = 'reports/getcommissionpaymentreport';
  apiAudit = 'reports/getaudit';
  apikpiNovelties = 'new/getkpinovelties';
  apiReportRejected = 'reports/getreportrejected';
  apiGetOrderNumber = 'orders/getorder';
  token = localStorage.getItem('ACCESS_TOKEN');
  authorization = this.token;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authorization,
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
    }),
  };

  public saveLink(SaveLink: any) {
    return this.http.post(`${this.url + this.apiSaveLink}`, SaveLink, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      )
    );
  }

  public sendPickingfile(formdata) {
    const data = new FormData();
    data.append('FileBase64', formdata.fileBase64);
    // data.append("Business", formdata.business);
    // data.append("email", formdata.email);

    return this.http.post(`${environment.URL_COMISSION}${this.apiPicking}`, formdata, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      )
    );
  }

  public saveLinkRefer(SaveLink: any) {
    return this.http.post(`${this.url + this.apiSaveLinkRefered}`, SaveLink, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      )
    );
  }

  public saveAmountCommission(amount: any) {
    return this.http.post(`${this.urlComission + this.apiSaveAmountCommission}`, amount, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      )
    );
  }

  public saveAmountReferred(amount: any) {
    return this.http.post(`${this.urlComission + this.apiSaveAmountReferred}`, amount, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      )
    );
  }

  public downloadReferrals(dates: any) {
    return this.http.post(`${this.url + this.apiPostReferrrals}`, dates, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
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
          tap((errorStatus) => {})
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
          tap((errorStatus) => {})
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getAmount() {
    return this.http.get(`${this.urlComission}${this.apiGetAmounts}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getReferrals(params) {
    return this.http
      .get(`${this.urlComission}${this.apiGetReferrals}?from=${params.from}&to=${params.to}&orderBy=DATE&ordination=DESC`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(3000),
            take(3),
            tap((errorStatus) => {})
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
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
      }),
    };
    return this.http.get(`${this.urlComission}${this.apiKPI}?start=${date.start}&end=${date.end}`, httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
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
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
      }),
    };
    return this.http.get(`${this.urlReports}${this.apikpiresume}`, httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
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
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
      }),
    };
    const datesGet0 = date.start.split('T');
    const datesGet1 = date.end.split('T');
    return this.http.get(`${this.urlReports}${this.apikpibussiness}?start=${datesGet0[0]}&end=${datesGet1[0]}`, httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
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
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
      }),
    };
    const datesGet0 = date.start.split('T');
    const datesGet1 = date.end.split('T');
    return this.http.get(`${this.urlReports}${this.apikpiTotal}?start=${datesGet0[0]}&end=${datesGet1[0]}`, httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }
  public getPayment(params) {
    return this.http.get(`${this.urlComission}${this.apiHistory}?from=${params.from}&to=${params.to}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getLinkHistory(params) {
    return this.http
      .get(`${this.urlReports}${this.apiLinkHistory}?from=${params.from}&to=${params.to}&orderBy=${params.orderBy}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(3000),
            take(3),
            tap((errorStatus) => {})
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
          tap((errorStatus) => {})
        )
      ),
      map((resp: ResponseService) => {
        return resp;
      })
    );
  }

  public getDetailPaymentClicker(date: string) {
    return this.http.get(`${this.urlComission}/${this.apigetDetailPaymentClicker}?paymentDate=${date}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
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
          tap((errorStatus) => {})
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
            tap((errorStatus) => {})
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
          tap((errorStatus) => {})
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
          tap((errorStatus) => {})
        )
      )
    );
  }

  public getReportTerms() {
    return this.http.get(`${this.ulrReport}${this.apigetReportTerms}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
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
          tap((errorStatus) => {})
        )
      )
    );
  }

  public getReportUser() {
    return this.http.get(`${this.ulrReport}${this.apiGetReport}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      )
    );
  }
  public getReportClickam(params: any) {
    return this.http.get(`${this.urlReports}${this.apigetReportClickam}?&start=${params.start}&end=${params.end}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
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
          tap((errorStatus) => {})
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
          tap((errorStatus) => {})
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
          take(3),
          tap((errorStatus) => {})
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
          take(3),
          tap((errorStatus) => {})
        )
      )
    );
  }

  public searchUsers(data: any) {
    return this.http.post(`${this.urlReports}${this.apiUsers}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }
  public putOrder(datos?: any) {
    return this.http.post(`${environment.URL_CONTENT}${this.apiOrder}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
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
          tap((errorStatus) => {})
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
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
      }),
    };

    return this.http.post(`${this.urlReports}${this.apikpiNovelties}`, data, httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
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
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
      }),
    };

    return this.http.post(`${environment.URL_COMISSION}${this.apiUpdateStatusCommissionFile}`, formdata, httpOptionsForm).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
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
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
      }),
    };

    return this.http.post(`${environment.URL_COMISSION}${this.apiDeleteCommissionFile}`, formdata, httpOptionsForm).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
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
          tap((errorStatus) => {})
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
          take(3),
          tap((errorStatus) => {})
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
          take(3),
          tap((errorStatus) => {})
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
            tap((errorStatus) => {})
          )
        ),
        map((resp: ResponseService) => {
          return resp;
        })
      );
  }



}
