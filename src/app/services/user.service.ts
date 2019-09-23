import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  authorization = localStorage.getItem("ACCESS_TOKEN");
  parsed = JSON.parse(this.authorization);
  token = this.parsed.objectResponse;
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': "Bearer "+this.token
    })
  };

  
  

  url = environment.URL_PROFILE;
  apiProfile = 'api/userprofile/getuserprofile';

  public getProfile() {
    console.log(this.token);
    return this.http.get(this.url + this.apiProfile, this.httpOptions);
  }


}
