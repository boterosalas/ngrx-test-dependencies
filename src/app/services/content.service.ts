import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, retry, delay, retryWhen, tap, take } from 'rxjs/operators';
import { ResponseService } from '../interfaces/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient) {}

  token = localStorage.getItem('ACCESS_TOKEN');
  authorization = this.token;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authorization,
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
    }),
  };
  urlRefer = environment.URL_REFERAL;
  url = environment.URL_CONTENT;
  urlComission = environment.URL_COMISSION;
  urlExternal = environment.URL_EXTERNAL;
  
  urlbiggyExito = 'https://search.biggylabs.com.br/search-api/v1/exitocol/api/';
  urlbiggyCarulla = 'https://search.biggylabs.com.br/search-api/v1/carulla/api/';
  apibiggy = 'search/trade-policy/1';
  apiNews = 'product/getNews';
  apiAssured = 'product/getProductsSegurosExito';
  apiTrips = 'product/getProductsViajesExito';
  apiOffers = 'offer/getOffers';
  apiPopup = 'offer/getpopup';
  apiSaveVisitOffer = 'offer/savevisitoffer';
  apiCategories = 'offer/getCategories';
  apiProducts = 'product';
  apiGetBusiness = 'business/getBusiness';
  apiGetAllBusiness = 'business/getallbusiness';
  apiSaveActiveBusiness = 'business/saveactivebusiness';
  apiGetLinkBusiness = 'business/generatelinkbusiness';
  apiGetBusinessClicker = 'business/getbusinessclicker';
  apiGetBusinessContent = 'business/getContent';
  apiGetcategoriesbusiness = 'business/getcategoriesbusiness';
  apiRegisterbusiness = 'business/registerbusiness';
  apiGetbusinessexcel = 'business/getbusinessexcel';
  apiAddCategory = 'business/savecategory';
  apiDeleteCategory = 'business/deletecategory';
  apiGetCommissions = 'business/getcommissions';
  apiGetAllCategory = 'business/getallcategories';
  apiOrderCategory = 'business/ordercategories';
  apiComisionByBusiness = 'business/getcommissionsbybusiness';
  apiSaveTips = 'business/savetipbusiness';
  apiInfoBusiness = 'business/saveinfobusiness';
  apiDeleteTip = 'business/deletetipbusiness';
  apiSaveTerms = 'business/savetermbusiness';
  apiGetBussinessById = 'business/getbusinessbyid';
  apiSaveBusinessOrderTip = 'business/saveordertipbusiness';
  apiGetManageCommisionBus = 'category/getcategoriesbyidbusiness';
  apiManageComisionBusiness = 'category/savecategory';
  apiDeleteManageCom = 'category/deletecategory';
  apiGetpopups = 'popups/getpopups';
  apiUploadContent = 'library/uploadcontentlibrary';
  apiGetContentVideo = 'library/getcontentlibrary';
  apiDeleteContent = 'library/deletecontentslibrary';
  apiDownloadContent = 'library/downloadzip';
  apiSaveComision = 'business/savecommissiontable';
  apiDeleteComision = 'business/deletecommissiontable';
  apiSaverefer = 'link/savelinkreferredvisit';
  apiGetBlog = 'blog/getblogs';
  apiGetBlogIndividual = 'blog/getblog';
  apiDeleteBlog = 'blog/deleteblog';
  apiSaveBlog = 'blog/saveblog';
  apiActivateBlog = 'blog/activeblog';
  apiSaveBussiness = 'business/savebusiness';
  apiSendMessage = 'blog/sendmail';
  apiSaveOrderOfer = 'offer/saveorderoffers';
  apiDeleteOfer = 'offer/deleteoffers';
  apiSaveOfer = 'offer/saveoffers';
  apiSaveOferActive = 'offer/saveactiveoffers';
  apiGetStories = 'story/getstories';
  apiSaveStories = 'story/savestories';
  apiDeleteStories = 'story/deletestories';
  apiSaveVisitStory = 'story/savevisitstory';
  apiFooter = 'footer/getfooter';
  apiCommissions = 'commissions/getcommissions';
  apiSaveOrdersYesterday = 'commissions/saveordersyesterday';
  apiGenerateCommissions = 'commissions/generatecommissions';
  apiImportSellerFile = 'seller/importsellerfile';
  apiSaveFooterSection = 'footer/savefooterseccion';
  apiDeleteFooterSection = 'footer/deletefooterseccions';
  apiSaveFooterLink = 'footer/savefooterlink';
  apiDeleteFooterLink = 'footer/deletefooterlinks';
  apiSaveOrderFooterSections = 'footer/saveorderfooterseccions';
  apiSaveOrderFooterLinks = 'footer/saveorderfooterlinks';
  apiDeleteFaqItems = 'faq/deletefaqitems';
  apiSaveFaqSeccion = 'faq/savefaqseccion';
  apiDeleteFaqSeccions = 'faq/deletefaqseccions';
  apiSaveFaqItem = 'faq/savefaqitem';
  apiSaveOrderFaqItems = 'faq/saveorderfaqitems';
  apiSaveOrderFaqSeccions = 'faq/saveorderfaqseccions';
  apiGetFaq = 'faq/getfaq';
  apiGetNotificationAdmin = 'notification/getnotifications';
  apiDeleteNotificationAdmin = 'notification/deletenotification';
  apiSaveNotificationAdmin = 'notification/savenotification';
  apiGetNotificationDetailAdmin = 'notification/getnotification';
  apiViewNotification = 'notification/savevisitnotification';
  apiDeleteNotificationUser = 'notification/deletenotificationuser';
  apiGetBoardings = 'boarding/getboardings';
  apiSaveBoardings = 'boarding/saveboardings';
  apiDeleteBoardings = 'boarding/deleteboardings';
  apiSaveOrderBoardings = 'boarding/saveorderboardings';

  sendSearch = {};

  public saveOrderFooterLinks(datos: any) {
    return this.http.post(`${this.url + this.apiSaveOrderFooterLinks}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public saveOrderFooterSections(datos: any) {
    return this.http.post(`${this.url + this.apiSaveOrderFooterSections}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public deleteFooterLink(datos: any) {
    return this.http.post(`${this.url + this.apiDeleteFooterLink}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public saveFooterLink(datos: any) {
    return this.http.post(`${this.url + this.apiSaveFooterLink}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public deleteFooterSection(datos: any) {
    return this.http.post(`${this.url + this.apiDeleteFooterSection}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public saveFooterSection(datos: any) {
    return this.http.post(`${this.url + this.apiSaveFooterSection}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public getFooter(rol = 'CLICKER') {
    return this.http.get(`${this.url + this.apiFooter}?rol=${rol}`, this.httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getFaqs() {
    return this.http.get(`${this.url + this.apiGetFaq}`, this.httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public saveFaqgroups(datos: any) {
    return this.http.post(`${this.url + this.apiSaveFaqSeccion}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public saveFaqItem(datos: any) {
    return this.http.post(`${this.url + this.apiSaveFaqItem}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public deleteFaqgroups(datos: any) {
    return this.http.post(`${this.url + this.apiDeleteFaqSeccions}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public deleteFaqItems(datos: any) {
    return this.http.post(`${this.url + this.apiDeleteFaqItems}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public saveOrderFaq(datos: any) {
    return this.http.post(`${this.url + this.apiSaveOrderFaqSeccions}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public saveOrderFaqsItem(datos: any) {
    return this.http.post(`${this.url + this.apiSaveOrderFaqItems}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public getNews() {
    return this.http.get(`${this.url + this.apiNews}`, this.httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }
  public getComisionManage(term?: any) {
    return this.http
      .get(
        `${this.urlComission}${this.apiGetManageCommisionBus}?searchText=${term.term}&from=${term.from}&to=${term.to}&orderBy=${term.orderOrigin}&ordination=${term.orderBy}&idBusiness=${term.idbussiness}&marketplace=${term.marketplace}&withoutCommission=${term.notComission}`,
        this.httpOptions
      )
      .pipe(
        map((user: any) => {
          return user.objectResponse;
        })
      );
  }

  public getBusiness() {
    return this.http.get(`${this.url + this.apiGetBusiness}`, this.httpOptions).pipe(
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
  public getBusinessById(data) {
    return this.http.get(`${this.url + this.apiGetBussinessById}?id=${data}`, this.httpOptions).pipe(
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
  public getCommissions() {
    return this.http.get(`${this.url + this.apiGetCommissions}`, this.httpOptions).pipe(
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
  public getCommissionsData(data: any) {
    return this.http.get(`${this.url + this.apiGetCommissions}?idbusiness=${data}`, this.httpOptions).pipe(
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
  public getCommissionsByBussiness(data: any) {
    return this.http.get(`${this.url + this.apiComisionByBusiness}?idbusiness=${data}`, this.httpOptions).pipe(
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
  deleteComisionCategoryBusiness(data) {
    return this.http
      .delete(`${this.urlComission + this.apiDeleteManageCom}?id=${data.id}&marketplace=${data.marketplace}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(3000),
            take(3),
            tap((errorStatus) => {})
          )
        )
      );
  }

  public saveComisionCategory(data: any) {
    return this.http.post(`${this.urlComission + this.apiManageComisionBusiness}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((user: ResponseService) => {
        return user;
      })
    );
  }

  public importSellerFile(file: any) {
    return this.http.post(`${this.urlComission + this.apiImportSellerFile}`, { file }, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((user: ResponseService) => {
        return user;
      })
    );
  }

  public saveOrderTipBusiness(data: any) {
    return this.http.post(`${this.url + this.apiSaveBusinessOrderTip}`, data, this.httpOptions).pipe(
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
  public saveActiveBanner(data: any) {
    return this.http.post(`${this.url + this.apiSaveOferActive}`, data, this.httpOptions).pipe(
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
  public saveInfoBusiness(data: any) {
    return this.http.post(`${this.url + this.apiInfoBusiness}`, data, this.httpOptions).pipe(
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
  public saveTermsConditions(data: any) {
    return this.http.post(`${this.url + this.apiSaveTerms}`, data, this.httpOptions).pipe(
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
  public saveTipBusiness(data: any) {
    return this.http.post(`${this.url + this.apiSaveTips}`, data, this.httpOptions).pipe(
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
  public deleteTipBusiness(data: any) {
    return this.http.delete(`${this.url + this.apiDeleteTip}?id=${data}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      )
    );
  }
  public saveComision(data: any) {
    return this.http.post(`${this.url + this.apiSaveComision}`, data, this.httpOptions).pipe(
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
  public deleteComision(data: any) {
    return this.http.delete(`${this.url + this.apiDeleteComision}?id=${data}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      )
    );
  }

  public getAllBusiness(clickam: boolean = false) {
    return this.http.get(`${this.url + this.apiGetAllBusiness}?clickam=${clickam}`, this.httpOptions).pipe(
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

  public saveActiveBusiness(bussiness: any) {
    return this.http.post(`${this.url + this.apiSaveActiveBusiness}`, bussiness, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public getLinkBusiness(bussiness) {
    return this.http.post(`${this.url + this.apiGetLinkBusiness}`, bussiness, this.httpOptions).pipe(
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

  public getPopupus() {
    return this.http.get(`${this.url + this.apiGetpopups}`, this.httpOptions).pipe(
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

  public getBusinessClicker() {
    return this.http.get(`${this.url + this.apiGetBusinessClicker}`, this.httpOptions).pipe(
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

  public businessExcel() {
    return this.http.post(`${this.url + this.apiGetbusinessexcel}`, {}, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      )
    );
  }

  public registerBusinessClicker(data: object) {
    return this.http.post(`${this.url + this.apiRegisterbusiness}`, data, this.httpOptions);
  }

  public getBusinessContent(id: string) {
    return this.http.get(`${this.url + this.apiGetBusinessContent}?idBusiness=${id}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((business: ResponseService) => {
        return business.objectResponse;
      })
    );
  }

  public getCategoriesBusinessHome() {
    return this.http.get(`${this.url + this.apiGetcategoriesbusiness}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((business: ResponseService) => {
        return business.objectResponse;
      })
    );
  }

  public getAssured() {
    return this.http.get(`${this.url + this.apiAssured}`, this.httpOptions).pipe(
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

  public getTrips() {
    return this.http.get(`${this.url + this.apiTrips}`, this.httpOptions).pipe(
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

  public getCategory() {
    return this.http.get(`${this.url + this.apiCategories}`, this.httpOptions).pipe(
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

  public getBoarding() {
    return this.http.get(`${this.url + this.apiGetBoardings}`, this.httpOptions).pipe(
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

  public saveBoardings(data: object) {
    return this.http.post(`${this.url + this.apiSaveBoardings}`, data, this.httpOptions);
  }

  public deleteBoardings(data: any) {
    return this.http.post(`${this.url + this.apiDeleteBoardings}`, data, this.httpOptions);
  }

  public saveOrderBoarding(data: any) {
    return this.http.post(`${this.url + this.apiSaveOrderBoardings}`, data, this.httpOptions);
  }

  // public getOffers() {
  //   return this.http.get(`${this.url + this.apiOffers}`, this.httpOptions).pipe(
  //     map((user: ResponseService) => {
  //       return user.objectResponse;
  //     })
  //   );
  // }
  public getOffersbyType(type) {
    return this.http.get(`${this.url + this.apiOffers}?type=${type.id}&visible=${type.admin}`, this.httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public biggySearchExito(params: { term: any; page: number; count: number; order: string }) {
    return this.http.get(`${this.urlbiggyExito}${this.apibiggy}?query=${params.term}&page=${params.page}&count=${params.count}`);
  }

  public biggySearchCarulla(params: { term: any; page: number; count: number; order: string }) {
    return this.http.get(`${this.urlbiggyCarulla}${this.apibiggy}?query=${params.term}&page=${params.page}&count=${params.count}`);
  }

  public getProductsPagination(params: { term: any; from: number; to: number; order: string }) {
    if (isNaN(params.term) === true) {
      if (params.order !== '') {
        this.sendSearch = {
          parameters: `?ft=${params.term}&_from=${params.from}&_to=${params.to}&fq=sellerIds:1&O=${params.order}`,
        };
      } else {
        this.sendSearch = {
          parameters: `?ft=${params.term}&_from=${params.from}&_to=${params.to}&fq=sellerIds:1`,
        };
      }
    } else {
      this.sendSearch = { parameters: `?ft=${params.term}&fq=sellerIds:1` };
    }
    const apiSearchVetex = `${this.apiProducts}/getProducts`;
    return this.http.post(`${this.url + apiSearchVetex}`, this.sendSearch, this.httpOptions).pipe(
      delay(3000),
      take(3),
      tap((errorStatus) => {}),
      map((user: any) => {
        return user.objectResponse;
      })
    );
  }
  

  public getProductsOtherBusiness(params: any){
    return this.http.get(`${this.url}product/getProducts?business=${params.id}&search=${params.text}`, this.httpOptions).pipe(
      delay(3000),
      take(3),
      tap((errorStatus) => {}),
      map((user: any) => {
        return user.objectResponse;
      })
    )
  }

  public deleteCategory(datos: any) {
    return this.http.delete(`${this.url + this.apiDeleteCategory}?id=${datos.id}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      )
    );
  }
  public addCategory(datos: any) {
    return this.http.post(`${this.url + this.apiAddCategory}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }
  public orderCategory(datos: any) {
    return this.http.post(`${this.url + this.apiOrderCategory}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }
  public getAllBusinessContent(id: string) {
    return this.http.get(`${this.url + this.apiGetAllCategory}?idbusiness=${id}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((business: ResponseService) => {
        return business.objectResponse;
      })
    );
  }
  public getVideosImage(id: any) {
    return this.http.get(`${this.url + this.apiGetContentVideo}?idbusiness=${id}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((business: ResponseService) => {
        return business;
      })
    );
  }
  public setContentImgVi(data) {
    const httpOptionsSet = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
      }),
    };
    return this.http.post(`${this.url + this.apiUploadContent}`, data, httpOptionsSet);
  }

  public deleteContent(data: any) {
    return this.http.post(`${this.url + this.apiDeleteContent}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }
  public downloadF(data: any) {
    const httpOptionsDow = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
        'Content-Disposition': 'attachment',
      }),
      responseType: 'blob' as 'text',
    };

    return this.http.post(`${this.url + this.apiDownloadContent}`, data, httpOptionsDow);
  }
  public setClick(datos: any) {
    const httpOptionsSet = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
      }),
    };
    return this.http.post(`${this.urlRefer + this.apiSaverefer}`, datos, httpOptionsSet).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }
  public getBlogs(data) {
    return this.http.get(`${this.url + this.apiGetBlog}?from=${data.from}&to=${data.to}&orderBy=${data.orderBy}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((business: ResponseService) => {
        return business;
      })
    );
  }
  public getBlogsAdmin(data) {
    const httpCache = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0',
      }),
    };
    return this.http.get(`${this.url + this.apiGetBlog}?from=${data.from}&to=${200}&orderBy=${data.orderBy}&visible=true`, httpCache).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((business: ResponseService) => {
        return business;
      })
    );
  }
  public getIndividualBlog(data) {
    return this.http.get(`${this.url + this.apiGetBlogIndividual}?path=${data}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((business: ResponseService) => {
        return business;
      })
    );
  }
  public getIndividualBlogId(data) {
    return this.http.get(`${this.url + this.apiGetBlogIndividual}?id=${data}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((business: ResponseService) => {
        return business;
      })
    );
  }
  public deleteBlog(data: any) {
    return this.http.delete(`${this.url + this.apiDeleteBlog}?id=${data}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      )
    );
  }
  public saveBlog(data: any) {
    const httpOptionsSet = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
      }),
    };
    return this.http.post(`${this.url + this.apiSaveBlog}`, data, httpOptionsSet);
  }
  public activeBlog(data: any) {
    const httpOptionsSet = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
      }),
    };
    return this.http.post(`${this.url + this.apiActivateBlog}`, data, httpOptionsSet);
  }
  public saveBussiness(data: any) {
    return this.http.post(`${this.url + this.apiSaveBussiness}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }
  public sendMessage(data: any) {
    const httpOptionsSet = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authorization,
        'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION,
      }),
    };
    return this.http.post(`${this.url + this.apiSendMessage}`, data, httpOptionsSet);
  }
  public deleteOfer(data) {
    return this.http.post(`${this.url + this.apiDeleteOfer}`, data, this.httpOptions).pipe(
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
  public saveOrderOfertBusiness(data: any) {
    return this.http.post(`${this.url + this.apiSaveOrderOfer}`, data, this.httpOptions).pipe(
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

  public saveOfertBusiness(data: any) {
    return this.http.post(`${this.url + this.apiSaveOfer}`, data, this.httpOptions).pipe(
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

  public saveStories(data: any) {
    return this.http.post(`${this.url + this.apiSaveStories}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((result: ResponseService) => {
        return result;
      })
    );
  }

  public saveVisitStories(data: any) {
    return this.http.post(`${this.url + this.apiSaveVisitStory}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((result: ResponseService) => {
        return result;
      })
    );
  }

  public getStories(data: any) {
    return this.http.get(`${this.url + this.apiGetStories}?visible=${data}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((result: ResponseService) => {
        return result;
      })
    );
  }

  public getStoriesadmin(data: any, idBussiness: any) {
    return this.http.get(`${this.url + this.apiGetStories}?idbusiness=${idBussiness}&visible=${data}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((result: ResponseService) => {
        return result;
      })
    );
  }

  public deleteStories(data: any) {
    return this.http.post(`${this.url + this.apiDeleteStories}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((result: ResponseService) => {
        return result;
      })
    );
  }

  public getCommissionsSearch(term?: any) {
    return this.http
      .get(
        `${this.urlComission + this.apiCommissions}?start=${term.start}&end=${term.end}&searchText=${term.term}&from=${term.from}&to=${
          term.to
        }&orderBy=${term.orderOrigin}&ordination=${term.orderBy}`,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(3000),
            take(3),
            tap((errorStatus) => {})
          )
        ),
        map((result: ResponseService) => {
          return result;
        })
      );
  }

  public generateComissions() {
    return this.http.post(`${this.urlComission + this.apiGenerateCommissions}`, {}, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((result: ResponseService) => {
        return result;
      })
    );
  }

  public consultOrders() {
    return this.http.post(`${this.urlComission + this.apiSaveOrdersYesterday}`, {}, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((result: ResponseService) => {
        return result;
      })
    );
  }

  public getPopup() {
    return this.http.get(`${this.url + this.apiPopup}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((result: ResponseService) => {
        return result.objectResponse;
      })
    );
  }

  public saveVisitOffer(data: any) {
    return this.http.post(`${this.url + this.apiSaveVisitOffer}`, data, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((result: ResponseService) => {
        return result;
      })
    );
  }

  public getNotificationAdmin(data: any) {
    return this.http.get(`${this.url + this.apiGetNotificationAdmin}?visible=${data}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((result: ResponseService) => {
        return result;
      })
    );
  }

  public deleteNotificationAdmin(id: any) {
    return this.http.delete(`${this.url + this.apiDeleteNotificationAdmin}?id=${id}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((result: ResponseService) => {
        return result;
      })
    );
  }

  public saveNotificationAdmin(datos: any) {
    return this.http.post(`${this.url + this.apiSaveNotificationAdmin}`, datos, this.httpOptions).pipe(
      map((notification: ResponseService) => {
        return notification;
      })
    );
  }

  public getNotificationDetailAdmin(id: any) {
    return this.http.get(`${this.url + this.apiGetNotificationDetailAdmin}?id=${id}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => {})
        )
      ),
      map((result: ResponseService) => {
        return result;
      })
    );
  }

  public viewNotification(datos: any) {
    return this.http.post(`${this.url + this.apiViewNotification}`, datos, this.httpOptions).pipe(
      map((notification: ResponseService) => {
        return notification;
      })
    );
  }

  public deleteNotificationUser(datos: any) {
    return this.http.post(`${this.url + this.apiDeleteNotificationUser}`, datos, this.httpOptions).pipe(
      map((notification: ResponseService) => {
        return notification;
      })
    );
  }
}
