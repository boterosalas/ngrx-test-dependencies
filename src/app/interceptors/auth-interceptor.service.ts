import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { Injector } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    public auth: AuthService,
    private user: UserService,
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
        if (err.status === 401) {
          //  this.auth.refreshToken().subscribe((resp:any) => {
          //   localStorage.setItem("ACCESS_TOKEN", resp.objectResponse.token);
          //   localStorage.setItem("REFRESH_TOKEN", resp.objectResponse.refreshToken);
          //  })
          localStorage.clear();
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 500);
        }

        return throwError(err);
      })
    );
  }
}
