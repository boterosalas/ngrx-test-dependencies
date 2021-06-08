import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private router: Router,
    private auth: AuthService,
    private user: UserService
  ) { }

  isOpen = false;
  isOpenMenu = false;
  isRegisterOpen = false;
  showForgotForm = false;
  showActivateForm = false;
  medals: any;
  pathBlog: any;

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() changeMenu: EventEmitter<boolean> = new EventEmitter();
  @Output() changeRegister: EventEmitter<boolean> = new EventEmitter();
  @Output() showForgotFormEmit: EventEmitter<boolean> = new EventEmitter();
  @Output() showActivateFormEmit: EventEmitter<boolean> = new EventEmitter();

  showloginForm() {
    this.isOpen = true;
    this.change.emit(this.isOpen);
  }

  showRegisterForm() {
    this.isOpen = true;
    this.changeRegister.emit(this.isOpen);
  }

  hideloginForm() {
    this.isOpen = false;
    this.change.emit(this.isOpen);
  }

  showMenu() {
    this.isOpenMenu = true;
    this.changeMenu.emit(this.isOpenMenu);
  }

  hideMenu() {
    this.isOpenMenu = false;
    this.changeMenu.emit(this.isOpenMenu);
  }

  public showForgot() {
    this.showForgotForm = true;
    this.showForgotFormEmit.emit(this.showForgotForm);
  }

  public showActivate() {
    this.showActivateForm = true;
    this.showActivateFormEmit.emit(this.showActivateForm);
  }

  public hideActivate() {
    this.showActivateForm = false;
    this.showActivateFormEmit.emit(this.showActivateForm);
  }

  public async logout() {
    localStorage.clear();
    this.auth.getRole$.next(null);
    this.auth.isLogged$.next(false);
    this.user.userInfo$.next(null);
    await this.router.navigate(['/inicio']);
  }
  public checkPermision() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    // decode the token to get its payload
    const tokenPayload = decode(token);
    this.auth.getPermisionByUser("ADMIN").subscribe((respByUser) => {
      let ubication = location.href;
      let route = ubication.split("/");
      let routeslite = '/' + route[route.length - 1];

      const infoRoute = respByUser.find(x => x.route === routeslite)

      if (infoRoute) {
        this.user.getPermision().subscribe((respPermision) => {
          if (respPermision.state === "Success") {
            const permisions = respPermision.objectResponse;
  
            if(permisions) {
              const permissionUser = permisions.find(x => x.userid === tokenPayload.userid)
              if (permissionUser && permissionUser.permissions) {
                const permissionRoute = permissionUser.permissions.find(x => x.menuid === infoRoute.idmenu)

                if (!permissionRoute || !permissionRoute.value) {
                  this.router.navigate(["configuracion"])
                }
              }
            }
          }
        })
      }
    })
  }
}
