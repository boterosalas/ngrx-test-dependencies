import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private http: HttpClient) { }

  url = environment.URL_PROFILE;
  apiCreateUser = 'create';
  apiIdType = 'getIdTypes';

  httpOptions = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
    })
  };


  public registerUser(userInfo: any){
    return this.http.post((`${this.url + this.apiCreateUser}`), userInfo, this.httpOptions);
  }

  public idType(): Observable<any>{
    return this.http.get((`${this.url + this.apiIdType}`), this.httpOptions);
  }


}
