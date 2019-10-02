import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}


  url = environment.URL_PROFILE;
  apiProfile = "api/userprofile/getuserprofile";
  apiActivateProfile = "api/userprofile/activateUser";

  public getProfile() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;
  
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization
      })
    };

    return this.http.get(this.url + this.apiProfile, httpOptions).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }

  public activateProfile(email: string){
    return this.http.post(`${this.url + this.apiActivateProfile}`, {email});
  }

}
