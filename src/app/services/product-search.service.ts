import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  constructor(private http: HttpClient) { }

  url = environment.URL_VETEX;
  
  public getProductsPagination(params: {term: string, from:string, to:string}){
    const apiSearchVetex = `api/catalog_system/pub/products/search?ft=${params.term}&_from=${params.from}&_to=${params.to}`
    return this.http.get((`${this.url + apiSearchVetex}`));
  }

  public getTotalItems(params: {term: string}){
    const apiSearchVetex = `api/catalog_system/pub/products/search?ft=${params.term}`
    return this.http.get((`${this.url + apiSearchVetex}`));
  }

}
