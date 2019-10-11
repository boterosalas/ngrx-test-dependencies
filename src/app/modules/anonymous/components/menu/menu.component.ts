import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public auth:AuthService,   private utils: UtilsService) { }

  options = [
    {name: 'Incio', route:'inicio'},
    {name: 'Click Academy', route:'click-academy'},
    {name: 'Ofertas', route:'ofertas'},
    {name: 'Preguntas Frecuentes', route:'preguntas-frecuentes'},
  ];
  isOpenMenu: boolean;
  private subscription: Subscription = new Subscription();
  
  ngOnInit() {

    // if(!this.auth.isLoggedIn()) {
    //   this.subscription = this.auth.getMenu().subscribe((resp:any) => {
    //     this.options = resp;
    //   });
    // } 
    
    if(this.auth.isLoggedIn()) {
      this.subscription =  this.auth.getMenuClicker().subscribe((resp:any) => {
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
