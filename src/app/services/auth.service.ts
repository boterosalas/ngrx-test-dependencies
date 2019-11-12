import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { BehaviorSubject, Subscription } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import decode from "jwt-decode";
import { Forgotpassword } from '../interfaces/forgotpassword';
import { Recoverpassword } from '../interfaces/recoverpassword';

@Injectable({
  providedIn: "root"
})
export class AuthService implements OnDestroy {
  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) {
    this.isLogged$.subscribe(val => {
      this.getRole();
      if(!!val || this.isLoggedIn()) {
        this.getMenuClicker().subscribe(res => {
          this.role = this.getRole$.value;
          this.getMenu$.next(res);
        });
      } else {
        this.role = this.getRole$.value;
        this.getMenu().subscribe(res => {
          this.getMenu$.next(res);
        });
      }
    });
  }

  url = environment.URL_SECURITY;
  apiLogin = "Authentication/login";
  apiGetmenus = "Authentication/getMenus";
  apiGetmenusClicker = "Authentication/getMenusByRol";
  apiForgotPassword = 'Authentication/recoveryPassword';
  apiRecoverPassword = 'Authentication/resetpassword';

  role = "";

   httpOptions = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
    })
  };

  isLogged$ = new BehaviorSubject<boolean>(false);
  getMenu$ = new BehaviorSubject<any>(null);
  getRole$ = new BehaviorSubject<any>(null);
  subs = [];

  public login(userInfo: any) {
    return this.http.post(`${this.url + this.apiLogin}`, userInfo, this.httpOptions);
  }

  public isLoggedIn() {
    return localStorage.getItem("ACCESS_TOKEN") !== null;
    // if (token == null) {
    //   return false;
    // } else {
    //   return !this.jwtHelper.isTokenExpired(token);
    // }
  }

  public logout() {
    localStorage.removeItem("ACCESS_TOKEN");
    this.router.navigate(["/inicio"]);
    this.getRole$.next(null);
    this.isLogged$.next(false);
  }

  public getRole() {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if(token !== null) {
        const tokenPayload = decode(token);
        this.role = tokenPayload.role;
        return this.getRole$.next(this.role);
      } else {
        return this.getRole$.next(null);
      }
  }

  public getMenu() {
      return this.http.get(`${this.url + this.apiGetmenus}`, this.httpOptions).pipe(
        map((resp: any) => {
           return resp.objectResponse;
        })
      )
  }

  public getMenuClicker() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
      return this.http
        .get(`${this.url + this.apiGetmenusClicker}`, httpOptions)
        .pipe(
          map((resp: any) => {
            return resp.objectResponse;
          })
        );
  }

  public forgotPassword(username: Forgotpassword) {
    return this.http.post((`${this.url + this.apiForgotPassword}`),{email:username}, this.httpOptions);
  }

  public recoverPassword(password: Recoverpassword) {
    return this.http.post((`${this.url + this.apiRecoverPassword}`), password, this.httpOptions);
  }

  ngOnDestroy(): void {
    this.subs.length > 0 && this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
