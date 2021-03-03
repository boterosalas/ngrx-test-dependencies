import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map, retry, delay, retryWhen, tap, take } from "rxjs/operators";
import { ResponseService } from "../interfaces/response";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ContentService {
  constructor(private http: HttpClient) { }

  token = localStorage.getItem("ACCESS_TOKEN");
  authorization = this.token;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authorization,
      "Ocp-Apim-Subscription-Key": environment.SUBSCRIPTION,
    }),
  };

  url = environment.URL_CONTENT;
  urlbiggyExito = "https://search.biggylabs.com.br/search-api/v1/exitocol/api/";
  urlbiggyCarulla = "https://search.biggylabs.com.br/search-api/v1/carulla/api/";
  apibiggy = "search/trade-policy/1"
  apiNews = "product/getNews";
  apiAssured = "product/getProductsSegurosExito";
  apiTrips = "product/getProductsViajesExito";
  apiOffers = "offer/getOffers";
  apiCategories = "offer/getCategories";
  apiProducts = "product";
  apiGetBusiness = "business/getBusiness";
  apiGetAllBusiness = "business/getallbusiness";
  apiSaveActiveBusiness = "business/saveactivebusiness";
  apiGetLinkBusiness = "business/generatelinkbusiness";
  apiGetBusinessClicker = "business/getbusinessclicker";
  apiGetBusinessContent = "business/getContent";
  apiGetcategoriesbusiness = "business/getcategoriesbusiness";
  apiRegisterbusiness = "business/registerbusiness";
  apiGetbusinessexcel = "business/getbusinessexcel";
  apiAddCategory = "business/savecategory";
  apiDeleteCategory = "business/deletecategory";
  apiGetCommissions = "business/getcommissions";
  apiGetAllCategory = "business/getallcategories"
  apiOrderCategory = "business/ordercategories";
  apiGetpopups = "popups/getpopups";
  apiUploadContent = "library/uploadcontentlibrary";
  apiGetContentVideo = "library/getcontentlibrary";
  apiDeleteContent = "library/deletecontentslibrary";
  apiDownloadContent = "library/downloadzip";
  sendSearch = {};

  public getNews() {
    return this.http.get(`${this.url + this.apiNews}`, this.httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getBusiness() {
    return this.http
      .get(`${this.url + this.apiGetBusiness}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((user: ResponseService) => {
          return user.objectResponse;
        })
      );
  }
  public getCommissions() {
    return this.http
      .get(`${this.url + this.apiGetCommissions}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((user: ResponseService) => {
          return user.objectResponse;
        })
      );
  }

  public getAllBusiness() {
    return this.http
      .get(`${this.url + this.apiGetAllBusiness}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((user: ResponseService) => {
          return user.objectResponse;
        })
      );
  }

  public saveActiveBusiness(bussiness: any) {
    return this.http
      .post(`${this.url + this.apiSaveActiveBusiness}`, bussiness, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((bussiness: ResponseService) => {
          return bussiness;
        })
      );
  }

  public getLinkBusiness(bussiness) {
    return this.http
      .post(`${this.url + this.apiGetLinkBusiness}`, bussiness, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((user: ResponseService) => {
          return user.objectResponse;
        })
      );
  }

  public getPopupus() {
    return this.http
      .get(`${this.url + this.apiGetpopups}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((user: ResponseService) => {
          return user.objectResponse;
        })
      );
  }

  public getBusinessClicker() {
    return this.http
      .get(`${this.url + this.apiGetBusinessClicker}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((user: ResponseService) => {
          return user.objectResponse;
        })
      );
  }

  public businessExcel() {
    return this.http
      .post(`${this.url + this.apiGetbusinessexcel}`, {}, this.httpOptions)
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

  public registerBusinessClicker(data: object) {
    return this.http.post(
      `${this.url + this.apiRegisterbusiness}`,
      data,
      this.httpOptions
    );
  }

  public getBusinessContent(id: string) {
    return this.http
      .get(
        `${this.url + this.apiGetBusinessContent}?idBusiness=${id}`,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((business: ResponseService) => {
          return business.objectResponse;
        })
      );
  }

  public getCategoriesBusinessHome() {
    return this.http
      .get(`${this.url + this.apiGetcategoriesbusiness}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
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
          delay(1000),
          take(3),
          tap((errorStatus) => { })
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
          delay(1000),
          take(3),
          tap((errorStatus) => { })
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
          delay(1000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public getOffers() {
    return this.http.get(`${this.url + this.apiOffers}`, this.httpOptions).pipe(
      map((user: ResponseService) => {
        return user.objectResponse;
      })
    );
  }

  public biggySearchExito(
    params: {
      term: any;
      page: number;
      count: number;
      order: string;
    }
  ) {
    return this.http.get(`${this.urlbiggyExito}${this.apibiggy}?query=${params.term}&page=${params.page}&count=${params.count}`);
  }

  public biggySearchCarulla(
    params: {
      term: any;
      page: number;
      count: number;
      order: string;
    }
  ) {
    return this.http.get(`${this.urlbiggyCarulla}${this.apibiggy}?query=${params.term}&page=${params.page}&count=${params.count}`);
  }

  public getProductsPagination(params: {
    term: any;
    from: number;
    to: number;
    order: string;
  }) {
    if (isNaN(params.term) === true) {
      if (params.order !== "") {
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
    return this.http
      .post(`${this.url + apiSearchVetex}`, this.sendSearch, this.httpOptions)
      .pipe(
        delay(1000),
        take(3),
        tap((errorStatus) => { }),
        map((user: any) => {
          return user.objectResponse;
        })
      );
  }

  public deleteCategory(datos: any) {
    return this.http
      .delete(`${this.url + this.apiDeleteCategory}?id=${datos.id}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        )
      );
    //return `Eliminando Categoria`
  }
  public addCategory(datos: any) {
    return this.http
      .post(`${this.url + this.apiAddCategory}`, datos, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((bussiness: ResponseService) => {
          return bussiness;
        })
      );
  }
  public orderCategory(datos: any) {
    return this.http
      .post(`${this.url + this.apiOrderCategory}`, datos, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((bussiness: ResponseService) => {
          return bussiness;
        })
      );
  }
  public getAllBusinessContent(id: string) {
    return this.http
      .get(
        `${this.url + this.apiGetAllCategory}?idbusiness=${id}`,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((business: ResponseService) => {
          return business.objectResponse;
        })
      );
  }
  public getVideosImage(id: any) {
    return this.http
      .get(
        `${this.url + this.apiGetContentVideo}?idbusiness=${id}`,
        this.httpOptions
      )
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((business: ResponseService) => {
          return business;
        })
      );
  }
  public setContentImgVi(data) {
    let httpOptionsSet = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.authorization,
        "Ocp-Apim-Subscription-Key": environment.SUBSCRIPTION,
      }),
    };
    return this.http
      .post(`${this.url + this.apiUploadContent}`, data, httpOptionsSet);
  }
  //apiDeleteContent
  public deleteContent(data: any) {
    return this.http
      .post(`${this.url + this.apiDeleteContent}`, data, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
            take(3),
            tap((errorStatus) => { })
          )
        ),
        map((bussiness: ResponseService) => {
          return bussiness;
        })
      );
  }
  public downloadF(data: any) {
    let httpOptionsDow = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authorization,
        "Ocp-Apim-Subscription-Key": environment.SUBSCRIPTION,
      }),
      responseType: 'blob' as 'json'
    };

    return this.http
      .post(`${this.url + this.apiDownloadContent}`, data, httpOptionsDow);

  }


}
