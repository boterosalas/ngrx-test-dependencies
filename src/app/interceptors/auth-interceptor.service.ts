import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Injector } from '@angular/core';
import { ResponseService } from '../interfaces/response';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  countError = 0;
  countError2 = 0;

  constructor(
    private injector: Injector,
    private loaderService: LoaderService
  ) {}


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth = this.injector.get<AuthService>(AuthService);
    const token: string = localStorage.getItem('ACCESS_TOKEN');
    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }

    this.loaderService.show();

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this.loaderService.hide();
        if (err.status === 401 && token !== null) {
          this.countError += 1;
          if (this.countError === 1) {
            auth.refreshToken().subscribe((resp: ResponseService) => {
             //  console.log('respuesta servicio', resp);
              if (resp.state !== 'Error') {
                const token = resp.objectResponse.token;
                const refreshToken = resp.objectResponse.refreshToken;
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
            this.countError2 +=1;
            setTimeout(() => {
              this.loaderService.hide();
              this.countError2 = 0;
            }, 5000);
            return;
          }
        }

        return throwError(err);
      })
    );
  }
}


