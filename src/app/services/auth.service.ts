import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, retry, delay, retryWhen, tap, take } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { Forgotpassword } from '../interfaces/forgotpassword';
import { Recoverpassword } from '../interfaces/recoverpassword';
import { UserService } from './user.service';
import { ResponseService } from '../interfaces/response';
// import { SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService,
    // private authService: SocialAuthService
  ) {
    this.isLogged$.subscribe((val) => {
      this.getRole();
      if (!!val || this.isLoggedIn()) {
        this.getMenuClicker().subscribe((res) => {
          this.role = this.getRole$.value;
          this.getMenu$.next(res);
          this.rate$.next(true)
        });
      } else {
        this.role = this.getRole$.value;
        this.getMenu().subscribe((res) => {
          this.getMenu$.next(res);
          this.rate$.next(false);
        });
      }
    });
  }

  url = environment.URL_SECURITY;
  apiLogin = 'Authentication/login';
  apiGetmenus = 'Authentication/getMenus';
  apiGetmenusClicker = 'Authentication/getMenusByRol';
  apiGetmenusFromAdmin = 'Authentication/getMenus?visible=false';
  apiGetmenusNoLogin = 'Authentication/getMenus?visible=true';
  apiGetmenusNoLoginViewUser = 'Authentication/getMenus?visible=false';
  apiSaveMenu = 'Authentication/savemenu';
  apiSaveMenuActive = 'Authentication/saveactivemenu';
  apiSaveMenuGroup = 'Authentication/savegroup';
  apiDeleteMenu = 'Authentication/deletemenu';
  apiDeleteMenuGroup = 'Authentication/deletegroup';
  apiSaveOrderMenus = 'Authentication/saveordermenus';
  apiSaveOrderGrupoMenus = 'Authentication/saveordergrupomenus';
  apiSaveOrderGrupoClickerMenus = 'Authentication/saveordermenus';
  apiForgotPassword = 'Authentication/recoveryPassword';
  apiRecoverPassword = 'Authentication/resetpassword';
  apiChangePassword = 'Authentication/changePassword';
  apisendactivation = 'activation/sendactivation';
  apiGetsAdmins = 'permissions/getusersadmin';
  apiGetPermisionAdmin = 'permissions/getpermissionsbyuser';
  apiSavePermision = 'permissions/savepermissions';
  apiRefresh = 'token/refresh';

  role = '';

  token = localStorage.getItem('ACCESS_TOKEN');
  authorization = this.token;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authorization,

    }),
  };

  isLogged$ = new BehaviorSubject<boolean>(false);
  rate$ = new BehaviorSubject<boolean>(false);
  getMenu$ = new BehaviorSubject<any>(null);
  getRole$ = new BehaviorSubject<any>(null);
  subs = [];

  routeBased() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const tokenDecode = decode(token);
    if (tokenDecode.role === 'CLICKER') {
      if (window.location.toString().includes('url')) {
        this.router.navigateByUrl(window.location.toString());
      } else {
        this.router.navigate(['/inicio']);
      }
      this.isLogged$.next(true);
    }
    if (tokenDecode.role === 'ADMIN' || tokenDecode.role === 'SUPERADMIN') {
      localStorage.clear();
    }

    if (tokenDecode.role === 'PARTNER' || tokenDecode.role === 'PARTNER-CASHIER') {
      this.router.navigate(['/partner']);
      this.isLogged$.next(true);
      if (tokenDecode.role === 'PARTNER-CASHIER') {
        this.getRole$.next('PARTNER-CASHIER');
      } else {
        this.getRole$.next('PARTNER');
      }
    }
  }

  public login(userInfo: any) {
    return this.http.post(`${this.url + this.apiLogin}`, userInfo, this.httpOptions);
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
    // if (token == null) {
    //   return false;
    // } else {
    //   return !this.jwtHelper.isTokenExpired(token);
    // }
  }

  public logout() {
    localStorage.clear();
    // this.authService.signOut();
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
    this.getRole$.next(null);
    this.isLogged$.next(false);
  }

  public getRole() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token !== null) {
      const tokenPayload = decode(token);
      this.role = tokenPayload.role;
      return this.getRole$.next(this.role);
    } else {
      return this.getRole$.next(null);
    }
  }

  public getMenu() {
    return this.http.get(`${this.url + this.apiGetmenus}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: any) => {
        return resp.objectResponse;
      })
    );
  }

  public getMenuClicker(visible: boolean = false) {
    return this.http.get(`${this.url + this.apiGetmenusClicker}?visible=${visible}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: any) => {
        return resp.objectResponse;
      })
    );
  }

  public getMenusFromAdmin() {
    return this.http.get(`${this.url + this.apiGetmenusFromAdmin}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: any) => {
        return resp.objectResponse;
      })
    );
  }

  public getmenusNoLogin() {
    return this.http.get(`${this.url + this.apiGetmenusNoLogin}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: any) => {
        return resp.objectResponse;
      })
    );
  }

  public getmenusNoLoginUserView() {
    return this.http.get(`${this.url + this.apiGetmenusNoLoginViewUser}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: any) => {
        return resp.objectResponse;
      })
    );
  }

  public saveMenu(datos: any) {
    return this.http.post(`${this.url + this.apiSaveMenu}`, datos, this.httpOptions).pipe(
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

  public saveMenuActive(datos: any) {
    return this.http.post(`${this.url + this.apiSaveMenuActive}`, datos, this.httpOptions).pipe(
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

  public saveMenuGroup(datos: any) {
    return this.http.post(`${this.url + this.apiSaveMenuGroup}`, datos, this.httpOptions).pipe(
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

  public deleteMenu(id: any) {
    return this.http.delete(`${this.url + this.apiDeleteMenu}?id=${id}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public deleteGroup(id: any) {
    return this.http.delete(`${this.url + this.apiDeleteMenuGroup}?id=${id}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public saveOrderMenus(datos: any) {
    return this.http.post(`${this.url + this.apiSaveOrderMenus}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public saveOrderGrupoMenus(datos: any) {
    return this.http.post(`${this.url + this.apiSaveOrderGrupoMenus}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public saveOrderGrupoClickerMenus(datos: any) {
    return this.http.post(`${this.url + this.apiSaveOrderGrupoClickerMenus}`, datos, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }

  public changePassword(data: any) {
    return this.http.post(`${this.url}${this.apiChangePassword}`, data, this.httpOptions);
  }

  public forgotPassword(username: Forgotpassword) {
    return this.http.post(`${this.url + this.apiForgotPassword}`, { email: username }, this.httpOptions);
  }

  public sendActivation(username: string) {
    return this.http.post(`${this.url + this.apisendactivation}`, { email: username }, this.httpOptions);
  }

  public refreshToken() {
    const accesstoken = localStorage.getItem('ACCESS_TOKEN');
    const refreshtoken = localStorage.getItem('REFRESH_TOKEN');
    return this.http.post(`${this.url + this.apiRefresh}`, { AccessToken: accesstoken, refreshtoken }, this.httpOptions);
  }

  public recoverPassword(password: Recoverpassword) {
    return this.http.post(`${this.url + this.apiRecoverPassword}`, password, this.httpOptions);
  }
  public getUsersAdmin() {
    return this.http.get(`${this.url + this.apiGetsAdmins}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: any) => {
        return resp.objectResponse;
      })
    );
  }
  public getPermisionByUser(rol) {
    return this.http.get(`${this.url + this.apiGetPermisionAdmin}?rol=${rol}`, this.httpOptions).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(3000),
          take(3),
          tap((errorStatus) => { })
        )
      ),
      map((resp: any) => {
        return resp.objectResponse;
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
      map((bussiness: ResponseService) => {
        return bussiness;
      })
    );
  }
  ngOnDestroy(): void {
    this.subs.length > 0 && this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
