import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map, retry, delay, retryWhen, tap, take } from "rxjs/operators";
import { ResponseService } from "../interfaces/response";

@Injectable({
  providedIn: "root",
})
export class ContentService {
  constructor(private http: HttpClient) {}

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
  apibiggy="search/trade-policy/1"
  apiNews = "product/getNews";
  apiAssured = "product/getProductsSegurosExito";
  apiTrips = "product/getProductsViajesExito";
  apiOffers = "offer/getOffers";
  apiCategories = "offer/getCategories";
  apiProducts = "product";
  apiGetBusiness = "business/getBusiness";
  apiGetBusinessClicker = "business/getbusinessclicker";
  apiGetBusinessContent = "business/getContent";
  apiGetcategoriesbusiness = "business/getcategoriesbusiness";
  apiRegisterbusiness = "business/registerbusiness";
  apiGetbusinessexcel = "business/getbusinessexcel";
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
            tap((errorStatus) => {})
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
            tap((errorStatus) => {})
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
            tap((errorStatus) => {})
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
            tap((errorStatus) => {})
          )
        ),
        map((business: ResponseService) => {
          return business.objectResponse;
        })
      );
  }

  public getCategoriesBusiness() {
    return this.http
      .get(`${this.url + this.apiGetcategoriesbusiness}`, this.httpOptions)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(1000),
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
          delay(1000),
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
          delay(1000),
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
          delay(1000),
          take(3),
          tap((errorStatus) => {})
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
    return this.http.get(`${this.urlbiggyExito}${this.apibiggy}?query=${params.term}&sort=orders:desc&page=${params.page}&count=${params.count}`);
  }

  public biggySearchCarulla(
    params: {
      term: any;
      page: number;
      count: number;
      order: string;
    }
  ) {
    return this.http.get(`${this.urlbiggyCarulla}${this.apibiggy}?query=${params.term}&sort=orders:desc&page=${params.page}&count=${params.count}`);
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
        tap((errorStatus) => {}),
        map((user: any) => {
          return user.objectResponse;
        })
      );
  }
}
