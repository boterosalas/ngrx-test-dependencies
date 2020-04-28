import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { Injector } from "@angular/core";
import { ResponseService } from '../interfaces/response';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService,
    private injector: Injector
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.auth = this.injector.get(AuthService);
    const token: string = localStorage.getItem("ACCESS_TOKEN");
    

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && token !== null) {
           this.auth.refreshToken().subscribe((resp:ResponseService) => {
            let token = resp.objectResponse.token;
            let refreshToken = resp.objectResponse.refreshToken;
            localStorage.setItem("ACCESS_TOKEN", token);
            localStorage.setItem("REFRESH_TOKEN", refreshToken);
            // document.location.reload();
           })
        }

        return throwError(err);
      })
    );
  }
}
