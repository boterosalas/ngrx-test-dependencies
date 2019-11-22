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
    console.log(dates);
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
    let apiReport = `${this.reports}?identification=${identification}`;
    return this.http.get((`${this.urlComission}/${apiReport}`), this.httpOptions).pipe(
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
  
}
