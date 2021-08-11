import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import decode from 'jwt-decode';
import { AuthService } from './services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    if (this.authService.isLoggedIn()) {
      const expectedRole = route.data.role;
      const superRole = route.data.superRole;
      const token = localStorage.getItem('ACCESS_TOKEN');
      // decode the token to get its payload
      const tokenPayload = decode(token);
      if (
        tokenPayload.role !== expectedRole &&
        tokenPayload.role !== superRole
      ) {
        this.router.navigate(['inicio']);
        return false;
      }
      return true;
    }
  }
}
