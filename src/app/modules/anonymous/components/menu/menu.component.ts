import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private auth:AuthService,   private utils: UtilsService) { }

  options = [];
  isOpenMenu: boolean;
  private subscription: Subscription = new Subscription();
  
  ngOnInit() {


    if(!this.auth.isLoggedIn()) {
      this.subscription = this.auth.getMenu().subscribe((resp:any) => {
        this.options = resp;
      });
    } 
    
    if(this.auth.isLoggedIn()) {
      this.subscription =  this.auth.getMenuClicker().subscribe((resp:any) => {
        console.log(resp);
        this.options = resp;
      });
    }

    
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
