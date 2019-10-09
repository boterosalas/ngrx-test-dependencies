import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private http: HttpClient) { }

  url = environment.URL_PROFILE;
  apiCreateUser = 'UserProfile/create';
  apiIdType = 'UserProfile/getIdTypes';


  public registerUser(userInfo: any){
    return this.http.post((`${this.url + this.apiCreateUser}`), userInfo);
  }

  public idType(): Observable<any>{
    return this.http.get((`${this.url + this.apiIdType}`));
  }


}
