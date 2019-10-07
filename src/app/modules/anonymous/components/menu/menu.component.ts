import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseService } from 'src/app/interfaces/response';
import { UtilsService } from 'src/app/services/utils.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private auth:AuthService,   private utils: UtilsService) { }

  options:[] = [];
  isOpenMenu: boolean;
  isLoggedIn: any;

  ngOnInit() {
    this.auth.getMenu().subscribe((resp:any) => {
      this.options = resp;
    });

    this.isLoggedIn = this.auth.isLoggedIn;
    
  }

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
