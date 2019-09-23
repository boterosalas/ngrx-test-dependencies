import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  url = environment.URL_SECURITY;
  apiLogin = 'api/Authentication/login';

  public login(userInfo: User){

    return this.http.post((`${this.url + this.apiLogin}`), userInfo);

  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }

}
