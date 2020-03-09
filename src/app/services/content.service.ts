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
  apiGetBusiness = 'business/getBusiness';
  apiGetBusinessContent = 'business/getContent';
  sendSearch = {};

  public getNews() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get(`${this.url + this.apiNews}`, httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getBusiness() {
    return this.http.get(`${this.url + this.apiGetBusiness}`).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getBusinessContent(id: string) {
    return this.http.get(`${this.url + this.apiGetBusinessContent}?idBusiness=${id}`).pipe(
      map((business: ResponseService) => {
        return business.objectResponse;
      })
    );
  }

  public getAssured() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get(`${this.url + this.apiAssured}`, httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getTrips() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get(`${this.url + this.apiTrips}`, httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getCategory() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get(`${this.url + this.apiCategories}`, httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getOffers() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get(`${this.url + this.apiOffers}`, httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getProductsPagination(params: {term: any, from:number, to:number, order: string}){
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
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
    return this.http.post(`${this.url + apiSearchVetex}`, this.sendSearch, httpOptions).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }

}
