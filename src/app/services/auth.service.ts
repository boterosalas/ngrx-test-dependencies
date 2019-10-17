import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { map, distinctUntilChanged } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { ResponseService } from "../interfaces/response";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) {}

  url = environment.URL_SECURITY;
  apiLogin = "Authentication/login";
  apiGetmenus = "Authentication/getMenus";
  apiGetmenusClicker = "Authentication/getMenusByRol";

  isLogged$ = new BehaviorSubject<boolean>(false);
  menuInfo$ = new BehaviorSubject<any>(this.getMenu());
  menuInfoClicker$ = new BehaviorSubject<any>(this.getMenuClicker());

  public login(userInfo: User) {
    return this.http.post(`${this.url + this.apiLogin}`, userInfo);
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
    this.isLogged$.next(false);
  }

  public getMenu() {
    if (!this.isLoggedIn()) {
      return this.http
        .get(`${this.url + this.apiGetmenus}`)
        .pipe(map((res: ResponseService) => res))
        .subscribe((resp: any) => {
          this.menuInfo$.next(resp.objectResponse);
        });
    }
  }

  public getMenuClicker() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization
      })
    };
    if (this.isLoggedIn()) {
      return this.http
        .get(`${this.url + this.apiGetmenusClicker}`, httpOptions)
        .pipe(map((res: ResponseService) => res))
        .subscribe((resp: any) => {
          this.menuInfoClicker$.next(resp.objectResponse);
        });
    }
  }

  public getMenuMobile() {
    if (!this.isLoggedIn()) {
      return this.http.get(`${this.url + this.apiGetmenus}`).pipe(
        map((resp: any) => {
          return resp.objectResponse;
        })
      );
    }
  }

  public getMenuClickerMobile() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization
      })
    };
    if (this.isLoggedIn()) {
      return this.http
        .get(`${this.url + this.apiGetmenusClicker}`, httpOptions)
        .pipe(
          map((resp: any) => {
            return resp.objectResponse;
          })
        );
    }
  }
}
