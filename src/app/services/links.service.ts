import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseService } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private http: HttpClient) { }

  url = environment.URL_REFERAL;
  urlComission = environment.URL_COMISSION;
  
  // comission = 'commissions';
  reports = 'Reports/ClickerPerformanceReport';
  apiKPI = 'Reports/getKPI';
  apiUsersExcel= 'Reports/getUsersExcel';
  apiAuditExcel= 'Reports/getAudit';
  apigetReportClickam= 'Reports/getReportClickam';
  apiUsers= 'Reports/getUsers';
  insurance = 'Insurance/ProcessFiles';
  apiSaveLink = 'Link/SaveLink';
  apiPostReferrrals = 'Link/downloadReferrals';
  apiGetTotalLinks = 'Link/GetTotalLinksGenerated';
  apiFile = 'commissions/getUrlFileCommissions';
  apigetDetailPaymentClicker = 'commissions/getDetailPaymentClicker';
  apigenerateCommissions = 'commissions/generateCommissionsFile';
  apiHistory = 'commissions/getPaymentHistoryClicker';
  apiupdatePaymentDate= 'commissions/updatePaymentDate';

  public saveLink(SaveLink: any) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.post((`${this.url + this.apiSaveLink}`), SaveLink, httpOptions);
  }

  public downloadReferrals(dates: any) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.post((`${this.url + this.apiPostReferrrals}`), dates, httpOptions);
  }

  public getLink(identification: string) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    let apiGetLink = `${this.apiGetTotalLinks}=${identification}`;
    return this.http.get((`${this.url + apiGetLink}`), httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getReports() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    let apiReport = `${this.reports}`;
    return this.http.get((`${this.urlComission}/${apiReport}`), httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getKPI() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get((`${this.urlComission}/${this.apiKPI}`), httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getPayment(params) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get((`${this.urlComission}${this.apiHistory}?from=${params.from}&to=${params.to}`), httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getFileReport() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get((`${this.urlComission}${this.apiFile}`), httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }
  
  public getDetailPaymentClicker(date:string) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get((`${this.urlComission}/${this.apigetDetailPaymentClicker}?paymentDate=${date}`), httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getUsersExcel(params: any) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get((`${this.urlComission}${this.apiUsersExcel}?email=${params.email}&start=${params.start}&end=${params.end}`), httpOptions);
  }

  public getAudit(params: any) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get((`${this.urlComission}${this.apiAuditExcel}?email=${params.email}&start=${params.start}&end=${params.end}`), httpOptions);
  }

  public getReportClickam(params: any) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get((`${this.urlComission}${this.apigetReportClickam}?email=${params.email}&start=${params.start}&end=${params.end}`), httpOptions);
  }

  public sendfile(formdata) {
      let token = localStorage.getItem("ACCESS_TOKEN");
      let authorization = token;
      let data = new FormData();
      data.append("FileBase64", formdata.fileBase64);
      // data.append("Business", formdata.business);
      data.append("email", formdata.email);
    const httpOptions = {
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
      })
    };
    return this.http.post((`${environment.URL_COMISSION}${this.apigenerateCommissions}`), formdata , httpOptions );
  }

  public updatePaymentDate(formdata) {
    let token = localStorage.getItem("ACCESS_TOKEN");
    let authorization = token;
    let data = new FormData();
    data.append("FileBase64", formdata.fileBase64);
    data.append("email", formdata.email);
  const httpOptions = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
      "Content-Type": "application/json",
      Authorization: "Bearer " + authorization,
    })
  };
  return this.http.post((`${environment.URL_COMISSION}${this.apiupdatePaymentDate}`), formdata , httpOptions );
}

  public searchUsers(term?: any) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get((`${this.urlComission}${this.apiUsers}?searchText=${term.term}&from=${term.from}&to=${term.to}&orderBy=${term.orderOrigin}&ordination=${term.orderBy}`), httpOptions).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }
  
}
