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
  apiUsersExcel= 'Reports/getUsersExcel'
  apiUsers= 'Reports/getUsers'
  insurance = 'Insurance/ProcessFiles'
  apiSaveLink = 'Link/SaveLink';
  apiPostReferrrals = 'Link/downloadReferrals';
  apiGetTotalLinks = 'Link/GetTotalLinksGenerated';
  apiFile = 'commissions/getUrlFileCommissions';
  apigenerateCommissions = 'commissions/generateCommissionsFile';
  apiHistory = 'commissions/getPaymentHistoryClicker';

  token = localStorage.getItem("ACCESS_TOKEN");
  authorization = this.token;

  httpOptions = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
      Authorization: "Bearer " + this.authorization,
    })
  };
  

  public saveLink(SaveLink: any) {
    return this.http.post((`${this.url + this.apiSaveLink}`), SaveLink, this.httpOptions);
  }

  public downloadReferrals(dates: any) {
    return this.http.post((`${this.url + this.apiPostReferrrals}`), dates, this.httpOptions);
  }

  public getLink(identification: string) {
    let apiGetLink = `${this.apiGetTotalLinks}=${identification}`;
    return this.http.get((`${this.url + apiGetLink}`), this.httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getReports(identification: string) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    let apiReport = `${this.reports}?identification=${identification}`;
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
    return this.http.get((`${this.urlComission}${this.apiHistory}?from=${params.from}&to=${params.to}`), this.httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getFileReport() {
    return this.http.get((`${this.urlComission}/${this.apiFile}`), this.httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getUsersExcel(params: any) {
    return this.http.get((`${this.urlComission}${this.apiUsersExcel}?email=${params.email}&start=${params.start}&end=${params.end}`), this.httpOptions);
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
