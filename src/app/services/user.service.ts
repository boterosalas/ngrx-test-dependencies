import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
  map,
  tap,
  distinctUntilChanged,
  retry,
  delay,
  retryWhen,
  take,
} from "rxjs/operators";
import { ResponseService } from "../interfaces/response";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService) {
    // this.auth.isLogged$.pipe(distinctUntilChanged()).subscribe(val => {
    //   if(!!val || this.auth.isLoggedIn()) {
    //     this.getProfile();
    //   }
    // })
  }
  urlReports = environment.URL_REPORTS;
  url = environment.URL_PROFILE;
  urlEmployee = environment.URL_VALIDATE_EMPLOYEE;
  apiProfile = "userprofile/GetUserProfile";
  apiActivateProfile = "userprofile/activateUser";
  apiShorUrl = "userprofile/getShortURL";
  apiCreateUser = "userprofile/create";
  apiIdType = "userprofile/getIdTypes";
  apigetBankAccountNumber = "userprofile/getBankAccountNumber";
  apichangeBankInformation = "userprofile/changeBankInformation";
  apiDisableUser = "userprofile/disableUser";
  apiUpdateUser = "userprofile/updateUser";
  apiUsers = "userprofile/getUsers";
  apiGetBasicData = "userprofile/getBasicData";
  apiComunications = "userprofile/setReceiveCommunications";
  apiVerified = "userprofile/verifyUser";
  apiDepartment = "userprofile/getDeparments";
  apiBanks = "userprofile/getBanks";
  apiUploadFiles = "userprofile/upload";
  apiDownloadFile = "userprofile/downloadBase64";
  apiGetuserdata = "userprofile/getuserdata";
  apiUpdateUserEmail = "userprofile/updateUserEmail";
  apiRegisterUserTerms = "userprofile/registeruserterms";
  apiSaveUserOnboardingViewed = "userprofile/saveuseronboardingviewed";
  apiSaveUserAccepttermsReferrals = "userprofile/saveuseraccepttermsreferrals";
  apiSaveUserDevice = "notification/saveuserdevice";
  apiUpdateEmployees = "userprofile/updateemployees";
  apiGetExternalUsers = "userprofile/getexternalusers";
  apiDeleteUser = "userprofile/deleteaccount"
  apiReporUserGamification = "reports/getreportgamification";
  apiSaveNews = "new/savenew";
  apiUploadNews = "new/uploadnew";
  token = localStorage.getItem("ACCESS_TOKEN");
  authorization = this.token;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authorization,
      "Ocp-Apim-Subscription-Key": environment.SUBSCRIPTION,
    }),
  };

  userInfo$ = new BehaviorSubject<any>(null);

  public getProfile() {
    return this.http
      .get(this.url + this.apiProfile, this.httpOptions)
      .pipe(
        map((res: ResponseService) => res.objectResponse),
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      )
      .subscribe((resp: ResponseService) => {
        this.userInfo$.next(resp);
      });
  }

  public activateProfile(email: string) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const authorization = token;

    return this.http
      .post(
        `${this.url + this.apiActivateProfile}`,
        { email: email },
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  getShortUrl(url: string) {
    const apiShort = `${this.url}${this.apiShorUrl}?url=${encodeURIComponent(
      url
    )}`;
    return this.http.get(apiShort, this.httpOptions).pipe(
      map((url: any) => {
        return url.objectResponse;
      })
    );
  }

  getBasicData() {
    return this.http
      .get(`${this.url}${this.apiGetBasicData}`, this.httpOptions)
      .pipe(
        map((user: any) => {
          return user.objectResponse;
        })
      );
  }

  getuserdata() {
    return this.http
      .get(`${this.url}${this.apiGetuserdata}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((user: any) => {
          return user.objectResponse;
        })
      );
  }

  public registerUser(userInfo: any) {
    return this.http
      .post(`${this.url}${this.apiCreateUser}`, userInfo, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public saveUserAcceptTermsReferrals() {
    return this.http
      .post(
        `${this.url}${this.apiSaveUserAccepttermsReferrals}`,
        {},
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public updateEmployees() {
    return this.http
      .post(`${this.url}${this.apiUpdateEmployees}`, {}, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public getExternalUsers(params: any) {
    return this.http
      .get(`${this.url}${this.apiGetExternalUsers}?&start=${params.start}&end=${params.end}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public saveOnboarding(save: any) {
    return this.http
      .post(
        `${this.url}${this.apiSaveUserOnboardingViewed}`,
        { viewed: save },
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public saveUserDevice(userid: string, token: string) {
    return this.http.post(
      `${this.url}${this.apiSaveUserDevice}`,
      { userid: userid, device: token },
      this.httpOptions
    );
  }

  public uploadFiles(params: any) {
    return this.http
      .post(`${this.url}${this.apiUploadFiles}`, params, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public idType() {
    return this.http.get(`${this.url}${this.apiIdType}`, this.httpOptions);
  }

  public downloadFile(identification: string, typeDocument: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "APPLICATION/octet-stream",
        Authorization: "Bearer " + this.authorization,
        "Ocp-Apim-Subscription-Key": environment.SUBSCRIPTION,
        responseType: "blob",
        Accept: "application/pdf",
        observe: "response",
      }),
    };
    return this.http.get(
      `${this.url}${this.apiDownloadFile}?identification=${identification}&typeDocument=${typeDocument}`,
      httpOptions
    );
  }

  public getDepartments() {
    return this.http.get(`${this.url}${this.apiDepartment}`, this.httpOptions);
  }

  public getBanks() {
    return this.http.get(`${this.url}${this.apiBanks}`, this.httpOptions);
  }

  public validateEmployee(id: string, document: string) {
    return this.http.get(
      `${this.urlEmployee}validateEmployee?id=${id}&documentType=${document}`,
      this.httpOptions
    );
  }

  public searchUsers(term?: any) {
    return this.http
      .get(
        `${this.url}${this.apiUsers}?searchText=${term.term}&from=${term.from}&to=${term.to}`,
        this.httpOptions
      )
      .pipe(
        map((user: any) => {
          return user.objectResponse;
        })
      );
  }

  public statusUser(id: any, value: boolean) {
    return this.http
      .post(
        `${this.url}${this.apiDisableUser}`,
        { userid: id, value },
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public updateUserEmail(userid: string, email: string) {
    return this.http
      .post(
        `${this.url}${this.apiUpdateUserEmail}`,
        { userid, email },
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public getBankAccountNumber(password: any) {
    return this.http
      .post(
        `${this.url}${this.apigetBankAccountNumber}`,
        { password },
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public changeBankInformation(id: any, data: any) {
    return this.http
      .post(
        `${this.url}${this.apichangeBankInformation}`,
        data,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public updateUser(data: any) {
    return this.http
      .post(`${this.url}${this.apiUpdateUser}`, data, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public registeruserterms(id: any) {
    return this.http
      .post(
        `${this.url}${this.apiRegisterUserTerms}`,
        { idbusiness: id },
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public comunitcations(id: any, value: boolean) {
    return this.http
      .post(
        `${this.url}${this.apiComunications}`,
        { userid: id, value },
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public verifiedUser(id: any, value: boolean) {
    return this.http
      .post(
        `${this.url}${this.apiVerified}`,
        { userid: id, value },
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public deleteUser(data: any) {
    return this.http
      .post(
        `${this.url}${this.apiDeleteUser}`,
        data,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
    //`${this.url}${this.apiDeleteUser}`
  }
  public getReportGamification() {
    return this.http
      .get(`${this.urlReports}${this.apiReporUserGamification}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }
  //apiSaveNews
  public saveNews(data: any) {
    return this.http
      .post(
        `${this.url}${this.apiSaveNews}`,
        data,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
    //`${this.url}${this.apiDeleteUser}`
  }
  public uploadFileNews(data: any) {
    return this.http
      .post(
        `${this.url}${this.apiUploadNews}`,
        data,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
    //`${this.url}${this.apiDeleteUser}`
  }
}
