import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap, delay, retryWhen, take } from 'rxjs/operators';
import { ResponseService } from '../interfaces/response';
import { BehaviorSubject } from 'rxjs';
import { DataRangeInterface } from '../interfaces/dateRangeInterface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  urlReports = environment.URL_REPORTS;
  url = environment.URL_PROFILE;
  urlEmployee = environment.URL_PROFILE;
  urlContent = environment.URL_CONTENT;

  apiProfile = 'userprofile/GetUserProfile';
  apiReceiveCommunications = 'userprofile/setReceiveCommunications';
  apiGetDocuments = 'userprofile/downloadBase64';
  apiActivateProfile = 'userprofile/activateUser';
  apiShorUrl = 'userprofile/getShortURL';
  apiCreateUser = 'userprofile/create';
  apiIdType = 'userprofile/getIdTypes';
  apigetBankAccountNumber = 'userprofile/getBankAccountNumber';
  apichangeBankInformation = 'userprofile/changeBankInformation';
  apiDisableUser = 'userprofile/disableUser';
  apiUpdateUser = 'userprofile/updateUser';
  apiChangeOrigin = 'userprofile/changeorigin';
  apiUsers = 'userprofile/getUsers';
  apiGetBasicData = 'userprofile/getBasicData';
  apiComunications = 'userprofile/setReceiveCommunications';
  apiVerified = 'userprofile/verifyUser';
  apiDepartment = 'userprofile/getDeparments';
  apiBanks = 'userprofile/getBanks';
  apiUploadFiles = 'userprofile/upload';
  apiDownloadFile = 'userprofile/downloadBase64';
  apiDownload = 'userprofile/download';
  apiGetuserdata = 'userprofile/getuserdata';
  apiUpdateUserEmail = 'userprofile/updateUserEmail';
  apiRegisterUserTerms = 'userprofile/registeruserterms';
  apiSaveUserOnboardingViewed = 'userprofile/saveuseronboardingviewed';
  apiSaveuserRateapp = 'userprofile/saveuserrateapp';
  apiSaveUserAccepttermsReferrals = 'userprofile/saveuseraccepttermsreferrals';
  apiSaveUserDevice = 'notification/saveuserdevice';
  apiUpdateEmployees = 'userprofile/updateemployees';
  apiGetExternalUsers = 'userprofile/getexternalusers';
  apiGetValidationsUsers = 'userprofile/getvalidationusers';
  apiDeleteUser = 'userprofile/deleteaccount';
  apiDeleteUserAdmin = 'userprofile/deleteuseradmin';
  apiReporUserGamification = 'reports/getreportgamification';
  apiReporReferral = 'reports/getreportreferral';
  apiReportCambios = 'reports/getreportfeedback';
  apiDeleteComments = 'reports/getreportfeedbackdeletetion';
  apiReportStories = 'reports/getreportvisitstories';
  apiOrdersNotInvoiced = 'reports/getreportordersnotinvoiced';
  apiGetTopCategories = 'reports/gettopcategories';
  apiGetReportSavers = 'reports/getreportsavers';
  apiSaveSaver = 'userprofile/savesaver';
  token = localStorage.getItem('ACCESS_TOKEN');
  authorization = this.token;
  apiSaveNews = 'new/savenew';
  apiUploadNews = 'new/uploadnew';
  apiGetNews = 'new/getnews';
  apiNoveltyById = 'new/getnoveltybyid';
  apiSaveLabel = 'new/changelabelnew';
  apiGetExcelNews = 'new/getnewsexcel';
  apiSetStatusNew = 'new/changestatusnew';
  apiReportLife = 'report/getcommissionsbyuser';
  apiReportNovetly = 'novelty/getnoveltiesbyuser';
  apiUpdateInfoClicker = 'userprofile/updateinfoclicker';
  apiSaveFeedBack = 'userprofile/savefeedback';
  apiGetStatusVerification = 'userprofile/getstatusverification';
  apiUpdateResponseAccountBank = 'userprofile/updateresponseaccountbank';
  apiSavePermision = 'userprofile/savepermissions';
  apiGetPermision = 'userprofile/getpermissions';
  apiGetFirstBuy = 'userprofile/getfirstbuy';
  apiCreateUserAdmin = 'userprofile/createuseradmin';
  apiUserInfoAditional = 'userprofile/getuserinfoaditional';
  apiGetDocumentsUser = 'userprofile/getdocumentsuser';
  apiSaveNewNovelty = 'new/savenewnovelty';
  apiGetNewsNovelties = 'new/getnewsnovelty';
  apiSaveQualificationNovelty = '/new/noveltyqualification';
  apiGetNewsById = 'new/usernews';
  apiSaveTestimony= 'testimony/savetestimony';
  apiDeleteTestimonies= 'testimony/deletetestimonies';
  apiGetTestimonies= 'testimony/gettestimonies';
  apiGetTestimoniesUser= 'testimony/gettestimoniesuser';
  apiSaveOrderTestimony= 'testimony/saveordertestimony';
  apiSaveActiveTestimony= 'testimony/saveactivetestimony';
  apiSaveCampaign='campaign/savecampaign';
  apiGetCampaign='campaign/getcampaigns';
  apiSaveVisitCampaign='campaign/savevisitcampaign';
  apiChangeBusinessNovelty='new/changebusinessnovelty';
  apiChangeDocumentNovelty='new/changedocumentnovelty';
  apiGetUser = 'phygital/getuser';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authorization,
      
    }),
  };

  userInfo$ = new BehaviorSubject<any>(null);

  onboardingView = new BehaviorSubject<any>({ onboardin: false, popUps: false });
  userOnboardingObservable = this.onboardingView.asObservable();

  public getFirstBuy() {
    return this.http.get(`${this.url}${this.apiGetFirstBuy}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((data: any) => {
        return data.objectResponse;
      })
    );
  }

  public saveCampaign(data: object) {
    return this.http.post(`${this.urlContent + this.apiSaveCampaign}`, data , this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public saveVisitCampaign(id: number) {
    return this.http.post(`${this.urlContent + this.apiSaveVisitCampaign}`, {id} , this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getCampaigns(params) {
    return this.http
      .get(`${this.urlContent}${this.apiGetCampaign}?from=${params.from}&to=${params.to}&orderBy=${params.orderBy}&ordination=${params.orderOrigin}&start=${params.startDate}&end=${params.endDate}&export=${params.exports}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(3000),
            take(3),
            tap((errorStatus) => {})
          )
        ),
        map((resp: ResponseService) => {
          return resp.objectResponse;
        })
      );
  }

  public getProfile() {
    return this.http
      .get(this.url + this.apiProfile, this.httpOptions)
      .pipe(
        map((res: ResponseService) => res.objectResponse),
        retryWhen((errors) =>
          errors.pipe(
            delay(3000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      )
      .subscribe((resp: ResponseService) => {
        this.userInfo$.next(resp);
      });
  }

  getUserPhygital(params:any) {
    return this.http.get(`${this.url}${this.apiGetUser}?identification=${params.identification}&cellphone=${params.cellphone}`, this.httpOptions).pipe(
      map((user: any) => {
        return user;
      })
    );
  }

  public activateProfile(email: string) {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const authorization = token;

    return this.http.post(`${this.url + this.apiActivateProfile}`, { email: email }, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public setReceiveCommunications(data: object) {
    return this.http.post(`${this.url + this.apiReceiveCommunications}`, data , this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  getShortUrl(url: string) {
    const apiShort = `${this.url}${this.apiShorUrl}?url=${encodeURIComponent(url)}`;
    return this.http.get(apiShort, this.httpOptions).pipe(
      map((url: any) => {
        return url.objectResponse;
      })
    );
  }

  getBasicData() {
    return this.http.get(`${this.url}${this.apiGetBasicData}`, this.httpOptions).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }

  getuserdata() {
    return this.http.get(`${this.url}${this.apiGetuserdata}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
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
    return this.http.post(`${this.url}${this.apiCreateUser}`, userInfo, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public saveNewNovelty(newNovelty: any) {
    return this.http.post(`${this.url}${this.apiSaveNewNovelty}`, newNovelty, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  getNewNovelties(id: string) {
    return this.http.get(`${this.url}${this.apiGetNewsNovelties}?id=${id}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public saveUserAcceptTermsReferrals() {
    return this.http.post(`${this.url}${this.apiSaveUserAccepttermsReferrals}`, {}, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public updateEmployees() {
    return this.http.post(`${this.url}${this.apiUpdateEmployees}`, {}, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getExternalUsers() {
    return this.http.get(`${this.url}${this.apiGetExternalUsers}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getValidationlUsers() {
    return this.http.get(`${this.url}${this.apiGetValidationsUsers}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getReportStories() {
    return this.http.get(`${this.urlReports}${this.apiReportStories}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getreportordersnotinvoiced(params: DataRangeInterface) {
    return this.http.get(`${this.urlReports}${this.apiOrdersNotInvoiced}?start=${params.startDate}&end=${params.endDate}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getTop() {
    return this.http.get(`${this.urlReports}${this.apiGetTopCategories}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public saveUserDevice(userid: string, token: string) {
    return this.http.post(`${this.url}${this.apiSaveUserDevice}`, { userid: userid, device: token }, this.httpOptions);
  }

  public uploadFiles(params: any) {
    const httpOptionsSet = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authorization,
      }),
    };

    return this.http.post(`${this.url}${this.apiUploadFiles}`, params, httpOptionsSet).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'APPLICATION/octet-stream',
        Authorization: 'Bearer ' + this.authorization,
        
        responseType: 'blob',
        Accept: 'application/pdf',
        observe: 'response',
      }),
    };
    return this.http.get(`${this.url}${this.apiDownloadFile}?identification=${identification}&typeDocument=${typeDocument}`, httpOptions);
  }

  public downloadFiles(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authorization,
        
      }),
      responseType: 'blob' as 'text',
    };

    return this.http.post(`${this.url}${this.apiDownload}`, data, httpOptions);
  }

  public getDepartments() {
    return this.http.get(`${this.url}${this.apiDepartment}`, this.httpOptions);
  }

  public getBanks() {
    return this.http.get(`${this.url}${this.apiBanks}`, this.httpOptions);
  }

  public saveOnboarding(save: any) {
    return this.http.post(`${this.url}${this.apiSaveUserOnboardingViewed}`, { viewed: save }, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public rateapp(save: any) {
    return this.http.post(`${this.url}${this.apiSaveuserRateapp}`, { rateapp: save }, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public validateEmployee(id: string, document: string) {
    return this.http.get(`${this.urlEmployee}validateEmployee?id=${id}&documentType=${document}`, this.httpOptions);
  }

  public searchUsers(term?: any) {
    return this.http.get(`${this.url}${this.apiUsers}?searchText=${term.term}&from=${term.from}&to=${term.to}`, this.httpOptions).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }

  public statusUser(id: any, value: boolean) {
    return this.http.post(`${this.url}${this.apiDisableUser}`, { userid: id, value }, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public updateUserEmail(userid: string, email: string) {
    return this.http.post(`${this.url}${this.apiUpdateUserEmail}`, { userid, email }, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public changeOrigin(id: any, value: boolean) {
    return this.http.post(`${this.url}${this.apiChangeOrigin}`, { userid: id, isEmployeeGrupoExito: value }, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getBankAccountNumber(password: any) {
    return this.http.post(`${this.url}${this.apigetBankAccountNumber}`, { password }, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public changeBankInformation(id: any, data: any) {
    return this.http.post(`${this.url}${this.apichangeBankInformation}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public updateUser(data: any) {
    return this.http.post(`${this.url}${this.apiUpdateUser}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public registeruserterms(id: any) {
    return this.http.post(`${this.url}${this.apiRegisterUserTerms}`, { idbusiness: id }, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public comunitcations(id: any, value: boolean) {
    return this.http.post(`${this.url}${this.apiComunications}`, { userid: id, value }, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public verifiedUser(id: any, value: number) {
    return this.http.post(`${this.url}${this.apiVerified}`, { userid: id, verified: value }, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public deleteUser(data: any) {
    return this.http.post(`${this.url}${this.apiDeleteUser}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }
  public getReportGamification() {
    return this.http.get(`${this.urlReports}${this.apiReporUserGamification}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }
  public saveNews(data: any) {
    return this.http.post(`${this.url}${this.apiSaveNews}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }
  public uploadFileNews(data: any) {
    return this.http.post(`${this.url}${this.apiUploadNews}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }
  public getAllNews(data: any) {
    return this.http.post(`${this.urlReports}${this.apiGetNews}`, data, this.httpOptions).pipe(
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }

  public getNoveltyById(id: string, userId: any) {
    return this.http.get(`${this.urlReports}${this.apiNoveltyById}?id=${id}&userId=${userId}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getNoveltiesById(id) {
    return this.http.get(`${this.url}${this.apiGetNewsById}?userId=${id}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getExportNewsExcel(data: any) {
    return this.http.post(`${this.urlReports}${this.apiGetExcelNews}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public setStatus(data: any) {
    return this.http.post(`${this.url}${this.apiSetStatusNew}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }
  public saveBusinessNovelty(data: any) {
    return this.http.post(`${this.url}${this.apiChangeBusinessNovelty}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }
  public saveDocumentNovelty(data: any) {
    return this.http.post(`${this.url}${this.apiChangeDocumentNovelty}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public saveLabels(data: any) {
    return this.http.post(`${this.url}${this.apiSaveLabel}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getHojaVida(data: any) {
    return this.http
      .get(`${this.urlReports}${this.apiReportLife}?&userid=${data.userId}&start=${data.start}&end=${data.end}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(3000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }
  public getNovetlyUser() {
    return this.http
      .get(`${this.urlReports}${this.apiReportNovetly}?from=1&to=50&orderBy=CONSECUTIVE&ordination=DESC`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(3000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
  }

  public saveQualificationNovelty(data: any) {
    return this.http.patch(`${this.url}${this.apiSaveQualificationNovelty}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getDocuments(document: string) {
    return this.http.get(`${this.url}${this.apiGetDocuments}?typeDocument=${document}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public updateInfoClicker(data: any) {
    return this.http.post(`${this.url}${this.apiUpdateInfoClicker}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }
  public saveFeedback(data: any) {
    return this.http.post(`${this.url}${this.apiSaveFeedBack}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }
  public getReportCommets(params: any) {
    return this.http.get(`${this.urlReports}${this.apiReportCambios}?&start=${params.start}&end=${params.end}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getDeleteCommetsRest(params: any) {
    return this.http.get(`${this.urlReports}${this.apiDeleteComments}?&start=${params.start}&end=${params.end}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getReportReferral(params: any) {
    return this.http.get(`${this.urlReports}${this.apiReporReferral}?&start=${params.start}&end=${params.end}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getReportsavers() {
    return this.http.get(`${this.urlReports}${this.apiGetReportSavers}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public saveSaver() {
    return this.http.post(`${this.url + this.apiSaveSaver}`, {} , this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getStatusVerification() {
    return this.http.get(`${this.url}${this.apiGetStatusVerification}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public postUpdateResponseAccountBank(data: any) {
    return this.http.post(`${this.url}${this.apiUpdateResponseAccountBank}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getPermision() {
    return this.http.get(`${this.url + this.apiGetPermision}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp;
      })
    );
  }

  public getPermisionPartner(idBusiness:number) {
    return this.http.get(`${this.url + this.apiGetPermision}?idbusiness=${idBusiness}&rol=PARTNER`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp;
      })
    );
  }

  public savePermision(data: any) {
    return this.http.post(`${this.url + this.apiSavePermision}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: ResponseService) => {
        return resp;
      })
    );
  }

  public deleteUserAdmin(data: any) {
    return this.http.post(`${this.url}${this.apiDeleteUserAdmin}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public addUserAdmin(data: any) {
    return this.http.post(`${this.url}${this.apiCreateUserAdmin}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getUserInfoAditional(userId) {
    return this.http.get(`${this.url}${this.apiUserInfoAditional}?userid=${userId}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getDocumentsUser(userId) {
    return this.http.get(`${this.url}${this.apiGetDocumentsUser}?userid=${userId}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      )
    );
  }

  public getTestimonies(visible = false) {
    return this.http.get(`${this.url + this.apiGetTestimonies}?visible=${visible}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getTestimoniesUser() {
    return this.http.get(`${this.url + this.apiGetTestimoniesUser}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public saveTestimonies(data: object) {
    return this.http.post(`${this.url + this.apiSaveTestimony}`, data, this.httpOptions);
  }
  
  public deleteTestimonies(data: any) {
    return this.http.post(`${this.url + this.apiDeleteTestimonies}`, data, this.httpOptions);
  }
  
  public saveOrderTestimonies(data: any) {
    return this.http.post(`${this.url + this.apiSaveOrderTestimony}`, data, this.httpOptions);
  }

  public saveActiveTestimonies(data: any) {
    return this.http.post(`${this.url + this.apiSaveActiveTestimony}`, data, this.httpOptions);
  }

}


