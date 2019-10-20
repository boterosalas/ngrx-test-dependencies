import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
    })
  };

  url = environment.URL_CONTENT;
  
  public getProductsPagination(params: {term: string, from:number, to:number}){
    const apiSearchVetex = `getProducts?ft=${params.term}&_from=${params.from}&_to=${params.to}&fq=1`
    return this.http.get(`${this.url + apiSearchVetex}`, this.httpOptions).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }

}
