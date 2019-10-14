import { Component, OnInit, HostListener } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private utils: UtilsService, private auth: AuthService) { }

 
  isOpenMenu: boolean;
  private subscription: Subscription = new Subscription();
  
  ngOnInit() {
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

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}
