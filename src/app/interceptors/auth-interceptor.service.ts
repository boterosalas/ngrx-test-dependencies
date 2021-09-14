import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, takeLast, mergeAll, switchMap, mergeMap, tap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Injector } from '@angular/core';
import { ResponseService } from '../interfaces/response';
import { LoaderService } from '../services/loader.service';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  countError: number = 0;

  constructor(public auth: AuthService, private injector: Injector, private loaderService: LoaderService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.auth = this.injector.get(AuthService);
    const token: string = localStorage.getItem('ACCESS_TOKEN');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });
    }

    this.loaderService.show();

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this.loaderService.hide();
        if (err.status === 401 && token !== null) {
          this.countError += 1;
          if (this.countError === 1) {
            this.auth.refreshToken().subscribe((resp: ResponseService) => {
              //  console.log('respuesta servicio', resp);
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
          if (err.status === 500 || err.status === 404 || err.status === 400 || err.status === 403) {
            Swal.fire({
              html: `<h3 class='delete-title-comision'>Ha ocurrido un problema</h3> <div class='w-container'> <p class="mb-0"> <strong>Código:</strong> ${err.error.statusCode}</p> <p class="mb-0"><strong>Mensaje:</strong> ${err.error.message}</p> </div> `,
              confirmButtonText: 'Cerrar',
              cancelButtonText: 'Cancelar',
              showCancelButton: false,
              confirmButtonClass: 'badreq',
              allowOutsideClick: false,
            });
            return;
          }
        }

        return throwError(err);
      })
    );
  }
}
