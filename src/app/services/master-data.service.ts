import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
    })
  };

  url = environment.URL_MASTER;
  apiDepartment = 'data/getDeparments';
  apiBanks = 'data/getBanks';

  public getDepartments(){
    return this.http.get((`${this.url}${this.apiDepartment}`), this.httpOptions);
  }

  public getBanks(){
    return this.http.get((`${this.url}${this.apiBanks}`), this.httpOptions);
  }

}
