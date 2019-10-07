import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map, tap } from "rxjs/operators";
import { ResponseService } from "../interfaces/response";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {
    this.getProfile();
  }

  url = environment.URL_PROFILE;
  apiProfile = "api/userprofile/getuserprofile";
  apiActivateProfile = "api/userprofile/activateUser";

  userInfo$ = new BehaviorSubject<any>(null);

  public getProfile() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization
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
    return this.http.post(`${this.url + this.apiActivateProfile}`, { email });
  }
}
