import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  constructor(private http: HttpClient) { }

  url = environment.URL_VETEX;
  
  public getProducts(term: string, from:string = '1', to:string = '50'){
    const apiSearchVetex = `api/catalog_system/pub/products/search?ft=${term}&_from=${from}&_to=${to}`
    return this.http.get((`${this.url + apiSearchVetex}`));
  }

}
