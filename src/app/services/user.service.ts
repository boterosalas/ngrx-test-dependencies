import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map, tap, distinctUntilChanged } from "rxjs/operators";
import { ResponseService } from "../interfaces/response";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService) {
    // this.auth.isLogged$.pipe(distinctUntilChanged()).subscribe(val => {
    //   if(!!val || this.auth.isLoggedIn()) {
    //     this.getProfile();
    //   }
    // })
  }

  url = environment.URL_PROFILE;
  urlEmployee = environment.URL_VALIDATE_EMPLOYEE;
  apiProfile = "userprofile/GetUserProfile";
  apiActivateProfile = "userprofile/activateUser";
  apiShorUrl= 'userprofile/getShortURL';
  apiCreateUser = 'userprofile/create';
  apiIdType = 'userprofile/getIdTypes';
  apigetBankAccountNumber = 'userprofile/getBankAccountNumber';
  apichangeBankInformation = 'userprofile/changeBankInformation';
  apiDisableUser = 'userprofile/disableUser';
  apiUpdateUser = 'userprofile/updateUser';
  apiUsers = 'userprofile/getUsers';
  apiGetBasicData = 'userprofile/getBasicData';
  apiComunications = 'userprofile/setReceiveCommunications';
  apiVerified = 'userprofile/verifyUser';
  apiDepartment = 'userprofile/getDeparments';
  apiBanks = 'userprofile/getBanks';
  apiUploadFiles = 'userprofile/upload';
  apiDownloadFile = 'userprofile/downloadBase64';
  apiGetuserdata = "userprofile/getuserdata"
  apiUpdateUserEmail = "userprofile/updateUserEmail"

  token = localStorage.getItem("ACCESS_TOKEN");
  authorization = this.token;


  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authorization,
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
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };

    return this.http.post(`${this.url + this.apiActivateProfile}`, {email:email}, httpOptions);
  }

  getShortUrl(url: string)  {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    const apiShort= `${this.url}${this.apiShorUrl}?url=${encodeURIComponent(url)}`
    return this.http.get(apiShort, httpOptions).pipe(
      map((url: any) => {
        return url.objectResponse;
      })
    );
  }

  getBasicData()  {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get((`${this.url}${this.apiGetBasicData}`), httpOptions).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }

  getuserdata()  {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get((`${this.url}${this.apiGetuserdata}`), httpOptions).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }

  public registerUser(userInfo: any){
    return this.http.post((`${this.url}${this.apiCreateUser}`), userInfo, this.httpOptions);
  }

  public uploadFiles(params: any){
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.post((`${this.url}${this.apiUploadFiles}`), params, httpOptions);
  }

  public idType(){
    return this.http.get((`${this.url}${this.apiIdType}`), this.httpOptions);
  }

  public downloadFile(identification: string, typeDocument: string){
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "APPLICATION/octet-stream",
        Authorization: "Bearer " + this.authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
        responseType : 'blob',
        Accept : 'application/pdf',
        observe : 'response'
      })
    };
    return this.http.get((`${this.url}${this.apiDownloadFile}?identification=${identification}&typeDocument=${typeDocument}`), httpOptions);
  }

  public getDepartments(){
    return this.http.get((`${this.url}${this.apiDepartment}`), this.httpOptions);
  }

  public getBanks(){
    return this.http.get((`${this.url}${this.apiBanks}`), this.httpOptions);
  }

  public validateEmployee(id: string, document: string){
    return this.http.get((`${this.urlEmployee}validateEmployee?id=${id}&documentType=${document}`), this.httpOptions);
  }


  public searchUsers(term?: any) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.get((`${this.url}${this.apiUsers}?searchText=${term.term}&from=${term.from}&to=${term.to}`), httpOptions).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }

  public statusUser(id: any, value: boolean) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.post((`${this.url}${this.apiDisableUser}`),{userid:id, value}, httpOptions);
  }

  public updateUserEmail(userid: string, email: string) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.post((`${this.url}${this.apiUpdateUserEmail}`),{userid, email}, httpOptions);
  }

  public getBankAccountNumber(password: any) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.post((`${this.url}${this.apigetBankAccountNumber}`),{password}, httpOptions);
  }

  public changeBankInformation(id: any, data:any) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.post((`${this.url}${this.apichangeBankInformation}`),data, httpOptions);
  }

  public updateUser(data:any) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.post((`${this.url}${this.apiUpdateUser}`),data, httpOptions);
  }

  public comunitcations(id: any, value: boolean) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.post((`${this.url}${this.apiComunications}`),{userid:id, value}, httpOptions);
  }

  public verifiedUser(id: any, value: boolean) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION
      })
    };
    return this.http.post((`${this.url}${this.apiVerified}`),{userid:id, value}, httpOptions);
  }

  
}
