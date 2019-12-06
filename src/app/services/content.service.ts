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

  token = localStorage.getItem("ACCESS_TOKEN");
  authorization = this.token;


  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authorization,
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
    })
  };

  url = environment.URL_CONTENT;
  apiNews = 'product/getNews';
  apiAssured= 'product/getProductsSegurosExito';
  apiTrips= 'product/getProductsViajesExito';
  apiOffers= 'offer/getOffers';
  apiCategories= 'offer/getCategories';
  apiProducts = 'product';
  sendSearch = {};

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

  public getCategory() {
    return this.http.get(`${this.url + this.apiCategories}`, this.httpOptions).pipe(
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

  // public getProductsPagination(params: {term: string, from:number, to:number}){
  //   const apiSearchVetex = `${this.apiProducts}/getProducts?ft=${params.term}&_from=${params.from}&_to=${params.to}&fq=1`
  //   return this.http.get(`${this.url + apiSearchVetex}`, this.httpOptions).pipe(
  //     map((user: any) => {
  //       return user.objectResponse;
  //     })
  //   );
  // }

  public getProductsPagination(params: {term: any, from:number, to:number, order: string}){
    if(isNaN(params.term) === true) {
      if(params.order !== '') {
        this.sendSearch = {parameters: `?ft=${params.term}&_from=${params.from}&_to=${params.to}&fq=sellerIds:1&O=${params.order}`};
      }else {
        this.sendSearch = {parameters: `?ft=${params.term}&_from=${params.from}&_to=${params.to}&fq=sellerIds:1`};
      }
    } else {
      this.sendSearch = {parameters: `?ft=${params.term}&fq=sellerIds:1`};
    }
    const apiSearchVetex = `${this.apiProducts}/getProducts`
    return this.http.post(`${this.url + apiSearchVetex}`, this.sendSearch, this.httpOptions).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }

}
