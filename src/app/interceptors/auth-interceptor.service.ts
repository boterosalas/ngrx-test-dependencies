import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Injector } from '@angular/core';
import { ResponseService } from '../interfaces/response';
import { LoaderService } from '../services/loader.service';
import decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  countError = 0;
  countError2 = 0;
  auth: any;

  constructor(private injector: Injector, private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.auth = this.injector.get<AuthService>(AuthService);
    const token: string = localStorage.getItem('ACCESS_TOKEN');

    if(token !== null) {
      const tokenDecode = decode(token);
      if(tokenDecode.state !== 'ACTIVO') {
        localStorage.clear();
      }
    }


    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this.loaderService.hide();
        if (err.status === 401 && token !== null) {
          this.countError += 1;
          if (this.countError === 1) {
            this.auth.refreshToken().subscribe((resp: ResponseService) => {
              if (resp.state !== 'Error') {
                let token = resp.objectResponse.token;
                let refreshToken = resp.objectResponse.refreshToken;
                localStorage.setItem('ACCESS_TOKEN', token);
                localStorage.setItem('REFRESH_TOKEN', refreshToken);
                setTimeout(() => {
                  this.countError = 0;
                }, 15000);
              } else {
                if (resp.objectResponse.result === false) {
                  localStorage.clear();
                  document.location.reload();
                }
              }
            });
          }
        } else {
          if (err.status !== 401) {
            if (this.countError2 === 0) {
              console.log(err);
            }
            this.countError2 += 1;
            setTimeout(() => {
              this.loaderService.hide();
              this.countError2 = 0;
            }, 15000);
          }
        }
        return throwError(err);
      })
    );
  }
}
