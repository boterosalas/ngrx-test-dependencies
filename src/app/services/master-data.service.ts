import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, retry, delay, retryWhen, tap, take } from 'rxjs/operators';
import { ResponseService } from '../interfaces/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterDataService {
  constructor(private http: HttpClient) {}
  token = localStorage.getItem('ACCESS_TOKEN');
  authorization = this.token;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
    }),
  };
  httpOptionsSet = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authorization,
      
    }),
  };
  url = environment.URL_MASTER;
  apiDepartment = 'data/getDeparments';
  apiBanks = 'data/getBanks';
  apiTerms = 'data/getterms';
  apiSetTerms = 'data/saveterm';
  public getDepartments() {
    return this.http.get(`${this.url}${this.apiDepartment}`, this.httpOptions);
  }

  public getBanks() {
    return this.http.get(`${this.url}${this.apiBanks}`, this.httpOptions);
  }
  public getTerms() {
    return this.http.get(`${this.url}${this.apiTerms}`, this.httpOptions);
  }
  public setTerms(data: any) {
    return this.http.post(`${this.url + this.apiSetTerms}`, data, this.httpOptionsSet).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }
}
