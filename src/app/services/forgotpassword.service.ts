import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Forgotpassword } from '../interfaces/forgotpassword';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private http: HttpClient) { }

  url = environment.URL_SECURITY;
  apiForgotPassword = 'api/Authentication/recoveryPassword';

  public forgotPassword(username: Forgotpassword) {
    return this.http.post((`${this.url + this.apiForgotPassword}`),{ email:username});
  }

}
