import { Injectable } from '@angular/core';
import { Recoverpassword } from '../interfaces/recoverpassword';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecoverpasswordService {

  constructor(private http: HttpClient) { }

  url = environment.URL_SECURITY;
  apiRecoverPassword = 'Authentication/resetpassword';

  httpOptions = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
    })
  };

  public recoverPassword(password: Recoverpassword) {
    return this.http.post((`${this.url + this.apiRecoverPassword}`), password, this.httpOptions);
  }

}
