import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  constructor(private http: HttpClient) { }

  url = environment.URL_VETEX;
  
  public getProducts(params: {term: string, from:string, to:string}){
    params.from = params && params.from ? params.from : '1';
    params.to = params && params.to ? params.to : '50';
    const apiSearchVetex = `api/catalog_system/pub/products/search?ft=${params.term}&_from=${params.from}&_to=${params.to}`
    return this.http.get((`${this.url + apiSearchVetex}`));
  }

}
