import { Component, OnInit, HostListener } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private utils: UtilsService, public auth: AuthService) { }
  
  ngOnInit() {
  }

  /**
   * Los host listener se encargan de mostrar los formularios de iniciar sesion, registro, menu
   * Tambien se encargan de ocultarlos
   */

  @HostListener('over')
  openRegister() {
    this.utils.showRegisterForm();
    this.utils.hideMenu();
  }

  @HostListener('over')
  hideMenu() {
    this.utils.hideMenu();
  }

}
