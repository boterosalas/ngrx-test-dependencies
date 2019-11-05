import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private http: HttpClient) { }

  url = environment.URL_PROFILE;
  apiCreateUser = 'create';
  apiIdType = 'getIdTypes';
  apiDisableUser = 'disableUser';
  apiUsers = 'getUsers';
  apiComunications = 'setReceiveCommunications';
  apiVerified = 'verifyUser';

  httpOptions = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
    })
  };
  
  token = localStorage.getItem("ACCESS_TOKEN");
  authorization = this.token;

    httpOptionsToken = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };




  public registerUser(userInfo: any){
    return this.http.post((`${this.url}${this.apiCreateUser}`), userInfo, this.httpOptions);
  }

  public idType(): Observable<any>{
    return this.http.get((`${this.url}${this.apiIdType}`), this.httpOptions);
  }

  public getUsers() {
    return this.http.get((`${this.url}${this.apiUsers}`), this.httpOptionsToken).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );;
  }

  public statusUser(id: any, value: boolean) {
    return this.http.post((`${this.url}${this.apiDisableUser}`),{userid:id, value}, this.httpOptionsToken);
  }

  public comunitcations(id: any, value: boolean) {
    return this.http.post((`${this.url}${this.apiComunications}`),{userid:id, value}, this.httpOptionsToken);
  }

  public verifiedUser(id: any, value: boolean) {
    return this.http.post((`${this.url}${this.apiVerified}`),{userid:id, value}, this.httpOptionsToken);
  }


}
