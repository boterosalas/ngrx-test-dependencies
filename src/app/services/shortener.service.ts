import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShortenerService {

  constructor(private http: HttpClient) { }

  
  getShortUrl(url: string)  {
    const apiShort= `http://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
    return this.http.get(apiShort,  {responseType: 'text'});
  }

}
