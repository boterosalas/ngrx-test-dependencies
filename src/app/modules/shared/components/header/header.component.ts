import { Component, OnInit, Output, EventEmitter, HostListener, Input } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isHome: boolean;
  @Input() internal: boolean;
  isLoggedIn: any;

  constructor(
    private utils: UtilsService,
    private auth: AuthService
  ) { }

  ngOnInit() { 
    this.isLoggedIn = this.auth.isLoggedIn;
  }

  @HostListener('over')
  showLogin() {
    this.utils.showloginForm();
  }

  @HostListener('over')
  showMenu() {
    this.utils.showMenu();
  }

  // @HostListener('over')
  // hideMenu() {
  //   this.utils.hideMenu();
  // }

}
