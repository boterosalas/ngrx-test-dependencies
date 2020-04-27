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
           this.auth.refreshToken().subscribe((resp:any) => {
            localStorage.setItem("ACCESS_TOKEN", resp.objectResponse.token);
            localStorage.setItem("REFRESH_TOKEN", resp.objectResponse.refreshToken);
            document.location.reload();
           })
        }

        return throwError(err);
      })
    );
  }
}
