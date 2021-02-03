import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  map,
  retry,
  delay,
  retryWhen,
  concatMap,
  take,
  tap,
} from "rxjs/operators";
import { ResponseService } from "../interfaces/response";
import { Observable, of, throwError, concat } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LinksService {
  constructor(private http: HttpClient) { }

  url = environment.URL_REFERAL;
  urlComission = environment.URL_COMISSION;
  urlReports = environment.URL_REPORTS;
  urlApiContent = environment.URL_CONTENT;
  // comission = 'commissions';
  reports = "Reports/ClickerPerformanceReport";
  apiKPI = "Reports/getKPI";
  apikpiresume = "Reports/getkpiresume";
  //https://apitestexito.azure-api.net/Dllo-clickam-md-apireport/api/Reports/getkpibusiness
  apikpibussiness = "Reports/getkpibusiness";
  //https://apitestexito.azure-api.net/Dllo-clickam-md-apireport/api/Reports/getkpitotaldata
  apikpiTotal = "Reports/getkpitotaldata";
  apiUsersExcel = "Reports/getUsersExcel";
  apiUsersHistoricalBankInformation = "Reports/gethistoricalbankinformation"
  apiAuditExcel = "Reports/getAudit";
  apiGetReportReferral = "Reports/getreportreferral";
  apigetReportClickam = "Reports/getReportClickam";
  apiUsers = "Reports/getUsers";
  insurance = "Insurance/ProcessFiles";
  apiSaveLink = "Link/SaveLink";
  apiSaveLinkRefered = "link/savelinkreferred";
  apiPostReferrrals = "Link/downloadReferrals";
  apiGetTotalLinks = "Link/GetTotalLinksGenerated";
  apiGetUrl = "link/geturl";
  apiFile = "commissions/getUrlFileCommissions";
  apigetDetailPaymentClicker = "commissions/getDetailPaymentClicker";
  apigenerateCommissions = "commissions/generateCommissionsFile";
  apiHistory = "commissions/getPaymentHistoryClicker";
  apiLinkHistory = "linkhistory/getlinkhistory";
  apiupdatePaymentDate = "commissions/updatePaymentDate";
  apiGetReferrals = "referrals/getreferrals";
  apiGetAmounts = "amount/getamounts";
  apiSaveAmountCommission = "amount/saveamountcommission";
  apiSaveAmountReferred = "amount/saveamountreferred";
  apiGetmedals = "medal/getmedals";
  apiPicking = "picking/importfilepickingcommissions"
  apiOrder = "business/orderbusiness"
  token = localStorage.getItem("ACCESS_TOKEN");
  authorization = this.token;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authorization,
      "Ocp-Apim-Subscription-Key": environment.SUBSCRIPTION,
    }),
  };

  public saveLink(SaveLink: any) {
    return this.http
      .post(`${this.url + this.apiSaveLink}`, SaveLink, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public sendPickingfile(formdata) {
    let data = new FormData();
    data.append("FileBase64", formdata.fileBase64);
    // data.append("Business", formdata.business);
    // data.append("email", formdata.email);

    return this.http
      .post(
        `${environment.URL_COMISSION}${this.apiPicking}`,
        formdata,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public saveLinkRefer(SaveLink: any) {
    return this.http
      .post(`${this.url + this.apiSaveLinkRefered}`, SaveLink, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public saveAmountCommission(amount: any) {
    return this.http
      .post(`${this.urlComission + this.apiSaveAmountCommission}`, amount, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public saveAmountReferred(amount: any) {
    return this.http
      .post(`${this.urlComission + this.apiSaveAmountReferred}`, amount, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public downloadReferrals(dates: any) {
    return this.http
      .post(`${this.url + this.apiPostReferrrals}`, dates, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public getReports() {
    let apiReport = `${this.reports}`;
    return this.http.get(`${this.urlComission}${apiReport}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(1000),
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
          delay(1000),
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
    return this.http.get(`${this.urlComission}${this.apiGetAmounts}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(1000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getReferrals(params) {
    return this.http
      .get(
        `${this.urlComission}${this.apiGetReferrals}?from=${params.from}&to=${params.to}&orderBy=DATE&ordination=DESC`,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
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
      }));

  }

  public getKPI(date: any) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        "Ocp-Apim-Subscription-Key": environment.SUBSCRIPTION,
      }),
    };
    return this.http
      .get(`${this.urlComission}${this.apiKPI}?start=${date.start}&end=${date.end}`, httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
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
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        "Ocp-Apim-Subscription-Key": environment.SUBSCRIPTION,
      }),
    };
    return this.http
      .get(`${this.urlReports}${this.apikpiresume}`, httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
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
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        "Ocp-Apim-Subscription-Key": environment.SUBSCRIPTION,
      }),
    };
    return this.http
      .get(`${this.urlReports}${this.apikpibussiness}?start=${date.start}&end=${date.end}`, httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((resp: ResponseService) => {
          return resp.objectResponse;
        })
      );
  }
  public getTotalKPI(date: any) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        "Ocp-Apim-Subscription-Key": environment.SUBSCRIPTION,
      }),
    };
    return this.http
      .get(`${this.urlReports}${this.apikpiTotal}?start=${date.start}&end=${date.end}`, httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((resp: ResponseService) => {
          return resp.objectResponse;
        })
      );
  }
  public getPayment(params) {
    return this.http
      .get(
        `${this.urlComission}${this.apiHistory}?from=${params.from}&to=${params.to}`,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
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
      .get(
        `${this.urlComission}${this.apiLinkHistory}?from=${params.from}&to=${params.to}&orderBy=${params.orderBy}`,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
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
    return this.http
      .get(`${this.urlComission}${this.apiFile}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((resp: ResponseService) => {
          return resp.objectResponse;
        })
      );
  }

  public getDetailPaymentClicker(date: string) {
    return this.http
      .get(
        `${this.urlComission}/${this.apigetDetailPaymentClicker}?paymentDate=${date}`,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
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
    //Falta cambio en urlReports
    return this.http
      .get(
        `${this.urlComission}${this.apiUsersExcel}?&start=${params.start}&end=${params.end}`,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }
  public getHistoricalBankInformation(params: any) {
    //Cambio la urlReports
    return this.http
      .get(
        `${this.urlReports}${this.apiUsersHistoricalBankInformation}?&start=${params.start}&end=${params.end}`,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public getAudit(params: any) {
    return this.http
      .get(
        `${this.urlComission}${this.apiAuditExcel}?&start=${params.start}&end=${params.end}`,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public getReportReferral() {
    return this.http
      .get(
        `${this.urlComission}${this.apiGetReportReferral}`,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public getReportClickam(params: any) {
    return this.http
      .get(
        `${this.urlComission}${this.apigetReportClickam}?&start=${params.start}&end=${params.end}`,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public sendfile(formdata) {
    let data = new FormData();
    data.append("FileBase64", formdata.fileBase64);
    // data.append("Business", formdata.business);
    data.append("email", formdata.email);

    return this.http
      .post(
        `${environment.URL_COMISSION}${this.apigenerateCommissions}`,
        formdata,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public updatePaymentDate(formdata) {
    let data = new FormData();
    data.append("FileBase64", formdata.fileBase64);
    data.append("email", formdata.email);
    return this.http
      .post(
        `${environment.URL_COMISSION}${this.apiupdatePaymentDate}`,
        formdata,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public searchUsers(term?: any) {
    //Falta cambio en urlReports
    return this.http
      .get(
        `${this.urlComission}${this.apiUsers}?searchText=${term.term}&from=${term.from}&to=${term.to}&orderBy=${term.orderOrigin}&ordination=${term.orderBy}`,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((user: any) => {
          return user.objectResponse;
        })
      );
  }
  public putOrder(datos?: any) {
    return this.http
      .post(
        `${environment.URL_CONTENT}${this.apiOrder}`,
        datos,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }
}
