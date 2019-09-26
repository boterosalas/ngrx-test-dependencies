import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShortenerService {

  constructor(private http: HttpClient) { }
  url = environment.URL_PROFILE;
  apiShorUrl= 'api/userprofile/getShortURL';
  
  getShortUrl(url: string)  {
    const apiShort= `${this.url}${this.apiShorUrl}?=${encodeURIComponent(url)}`
    return this.http.get(apiShort,  {responseType: 'text'}).pipe(
      map((url: any) => {
        const parseUrl =  JSON.parse(url);
        return parseUrl.objectResponse;
      })
    );
  }

}
