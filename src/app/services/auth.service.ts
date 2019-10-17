import { Injectable, OnDestroy } from "@angular/core";
import { User } from "../interfaces/user";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { BehaviorSubject, Subscription } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import decode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class AuthService implements OnDestroy {
  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) {
    this.getRole();
    this.isLogged$.subscribe(val => {
      if(!!val || this.isLoggedIn()) {
        this.getMenuClicker().subscribe(res => {
          this.getMenu$.next(res);
        });
      } else {
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
  role = "";

  isLogged$ = new BehaviorSubject<boolean>(false);
  getMenu$ = new BehaviorSubject<any>(null);
  subs = [];

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

  public getRole() {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if(token !== null) {
        const tokenPayload = decode(token);
        this.role = tokenPayload.role;
      } else {
        return false;
      }
  }

  public getMenu() {
      return this.http.get(`${this.url + this.apiGetmenus}`).pipe(
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
        Authorization: "Bearer " + authorization
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

  ngOnDestroy(): void {
    this.subs.length > 0 && this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
