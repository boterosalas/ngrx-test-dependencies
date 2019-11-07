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
  comission = 'commissions';
  reports = 'Reports';
  insurance = 'Insurance/ProcessFiles'

  apiSaveLink = 'SaveLink';
  apiFile = 'getUrlFileCommissions';

  httpOptions = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
    })
  };
  

  public saveLink(SaveLink: any) {
    return this.http.post((`${this.url + this.apiSaveLink}`), SaveLink, this.httpOptions);
  }

  public getLink(identification: string) {
    let apiGetLink = `GetTotalLinksGenerated?identification=${identification}`;
    return this.http.get((`${this.url + apiGetLink}`), this.httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getReports(identification: string) {
    let apiReport = `ClickerPerformanceReport?identification=${identification}`;
    return this.http.get((`${this.urlComission}${this.reports}/${apiReport}`), this.httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getFileReport() {
    return this.http.get((`${this.urlComission}${this.comission}/${this.apiFile}`), this.httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public sendfile(formdata) {
      let data = new FormData();
      data.append("FileBase64", formdata.fileBase64);
      data.append("Business", formdata.business);
      data.append("email", formdata.email);
    const httpOptions = {
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
        "Content-Type": "application/json"
      })
    };
    return this.http.post((`${environment.URL_COMISSION}${this.insurance}`), formdata , httpOptions );
  }
  
}
