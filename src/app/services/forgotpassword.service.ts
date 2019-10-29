import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Forgotpassword } from '../interfaces/forgotpassword';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private http: HttpClient) { }

  url = environment.URL_SECURITY;
  apiForgotPassword = 'recoveryPassword';

  httpOptions = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
    })
  };

  public forgotPassword(username: Forgotpassword) {
    return this.http.post((`${this.url + this.apiForgotPassword}`),{email:username}, this.httpOptions);
  }

}
