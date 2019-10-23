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
  urlReport = environment.URL_REPORT;
  urlComission = environment.URL_COMISSION;
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
    return this.http.get((`${this.urlReport + apiReport}`), this.httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getFileReport() {
    return this.http.get((`${this.urlComission + this.apiFile}`), this.httpOptions).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }
  
}
