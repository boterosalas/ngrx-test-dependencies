import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  token = localStorage.getItem("ACCESS_TOKEN");
  authorization = JSON.parse(this.token);

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authorization
    })
  };

  url = environment.URL_PROFILE;
  apiProfile = "api/userprofile/getuserprofile";

  public getProfile() {
    return this.http.get(this.url + this.apiProfile, this.httpOptions).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }
}
