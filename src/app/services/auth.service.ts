import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, take, first, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  url = environment.URL_SECURITY;
  apiLogin = 'api/Authentication/login';
  apiGetmenus= 'api/Authentication/getMenus';
  apiGetmenusClicker= 'api/Authentication/getMenusByRol';

  menuInfo$ = new BehaviorSubject<any>(null);

  isLogged$ = new BehaviorSubject<boolean>(false);

  public login(userInfo: User){

    return this.http.post((`${this.url + this.apiLogin}`), userInfo);
 
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
    this.router.navigate(['']);
    this.isLogged$.next(false);
  }

  public getMenu(){
    return this.http.get(`${this.url + this.apiGetmenus}`).pipe(
      map((resp: any) => {
        return resp.objectResponse;
      },
      take(1)
      )
    );
  }

  public getMenuClicker(){
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization
      })
    };
    
    return this.http.get(`${this.url + this.apiGetmenusClicker}`, httpOptions).pipe(
      map((resp: any) => {
        return resp.objectResponse;
      })
    );
  }

}
