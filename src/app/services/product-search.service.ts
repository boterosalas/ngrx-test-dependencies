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
      "Content-Type": "application/json",
      "Accept": "application/json"
    })
  };

  url = environment.URL_VETEX;
  
  public getProductsPagination(params: {term: string, from:number, to:number}){
    const apiSearchVetex = `getProducts?ft=${params.term}&_from=${params.from}&_to=${params.to}`
    return this.http.get(`${this.url + apiSearchVetex}`).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );;
  }

  // public getTotalItems(params: {term: string}){
  //   const apiSearchVetex = `getProducts?ft=${params.term}`
  //   return this.http.get(`${this.url + apiSearchVetex}`);
  // }

}
