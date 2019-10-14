import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.scss']
})
export class MenuOptionsComponent implements OnInit {

  constructor(public auth:AuthService, private utils: UtilsService) { }

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
        this.options = resp;
      });
    }
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  
  @HostListener('over')
  hideMenu() {
    this.utils.hideMenu();
  }

}
