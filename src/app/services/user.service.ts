import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map, tap, distinctUntilChanged } from "rxjs/operators";
import { ResponseService } from "../interfaces/response";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.isLogged$.pipe(distinctUntilChanged()).subscribe(val => {
      if(!!val || this.auth.isLoggedIn()) {
        this.getProfile();
      }
    })
  }

  url = environment.URL_PROFILE;
  apiProfile = "userprofile/getuserprofile";
  apiActivateProfile = "userprofile/activateUser";

  httpOptions = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
    })
  };

  userInfo$ = new BehaviorSubject<any>(null);

  public getProfile() {
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
      .get(this.url + this.apiProfile, httpOptions)
      .pipe(map((res: ResponseService) => res.objectResponse))
      .subscribe((resp: ResponseService) => {
        this.userInfo$.next(resp);
      });
  }

  public activateProfile(email: string) {
    return this.http.post(`${this.url + this.apiActivateProfile}`, {email:email}, this.httpOptions);
  }
}
