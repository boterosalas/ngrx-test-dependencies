import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseService } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private http: HttpClient) { }

  url = environment.URL_REFERAL;
  urlReport = environment.URL_REPORT;
  apiSaveLink = 'SaveLink';
  

  public saveLink(SaveLink: any) {
    return this.http.post((`${this.url + this.apiSaveLink}`), SaveLink);
  }

  public getLink(identification: string) {
    let apiGetLink = `GetTotalLinksGenerated?identification=${identification}`;
    return this.http.get((`${this.url + apiGetLink}`)).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }

  public getReports(identification: string) {
    let apiReport = `ClickerPerformanceReport?identification=${identification}`;
    return this.http.get((`${this.urlReport + apiReport}`)).pipe(
      map((resp: ResponseService) => {
        return resp.objectResponse;
      })
    );
  }
  
}
