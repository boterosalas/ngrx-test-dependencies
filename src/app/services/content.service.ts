import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ResponseService } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
    })
  };

  url = environment.URL_CONTENT;
  apiNews = 'product/getNews';
  apiAssured= 'product/getProductsSegurosExito';
  apiTrips= 'product/getProductsViajesExito';
  apiOffers= 'offer/getOffers';
  apiProducts = 'product';

  public getNews() {
    return this.http.get(`${this.url + this.apiNews}`, this.httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getAssured() {
    return this.http.get(`${this.url + this.apiAssured}`, this.httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getTrips() {
    return this.http.get(`${this.url + this.apiTrips}`, this.httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getOffers() {
    return this.http.get(`${this.url + this.apiOffers}`, this.httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getProductsPagination(params: {term: string, from:number, to:number}){
    const apiSearchVetex = `${this.apiProducts}/getProducts?ft=${params.term}&_from=${params.from}&_to=${params.to}&fq=1`
    return this.http.get(`${this.url + apiSearchVetex}`, this.httpOptions).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }

}
