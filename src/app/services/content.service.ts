import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ResponseService } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  url = environment.URL_CONTENT;
  apiNews = 'getNews';
  apiAssured= 'getProductsSegurosExito';
  apiTrips= 'getProductsViajesExito';

  public getNews() {
    return this.http.get(`${this.url + this.apiNews}`).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getAssured() {
    return this.http.get(`${this.url + this.apiAssured}`).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getTrips() {
    return this.http.get(`${this.url + this.apiTrips}`).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

}
