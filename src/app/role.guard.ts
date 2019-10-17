import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import decode from "jwt-decode";
import { AuthService } from "./services/auth.service";
@Injectable({
  providedIn: "root"
})
export class RoleGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    if(this.authService.isLoggedIn()) {
        const expectedRole = route.data.role;
        const token = localStorage.getItem("ACCESS_TOKEN");
        // decode the token to get its payload
        const tokenPayload = decode(token);
        if (!this.authService.isLoggedIn() || tokenPayload.role !== expectedRole) {
          this.router.navigate(["/"]);
          return false;
        }
        return true;
      }
    }
}
