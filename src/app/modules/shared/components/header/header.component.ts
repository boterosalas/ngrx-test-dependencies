import { Component, OnInit, HostListener, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';
import { LinksService } from 'src/app/services/links.service';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { ResponseService } from 'src/app/interfaces/response';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() isHome: boolean;
  @Input() internal: boolean;
  @Input() name: string;
  @Output() sidenav = new EventEmitter();
  menuItems: any = [];
  role: string;

  private subscription: Subscription = new Subscription();

  isLoggedIn: any;
  firstNames: string;
  lastNames: string;
  amount: any;

  notifications = [];
  total: any;

  constructor(private utils: UtilsService, public auth: AuthService, private _content: ContentService) {}

  ngOnInit() {
    // this.getAmount();
    this.getMenu();
    this.getNotications();
  }

  public getMenu() {
    this.subscription = this.auth.getmenusNoLoginUserView().subscribe((resp) => {
      this.menuItems = resp[0].menus;
    });
  }

  public open() {
    this.sidenav.emit();
  }

  public logout() {
    this.utils.logout();
  }

  @HostListener('over')
  showLogin() {
    this.utils.showloginForm();
  }

  @HostListener('over')
  showMenu() {
    this.utils.showMenu();
  }

  @HostListener('over')
  openRegister() {
    this.utils.showRegisterForm();
  }

  // public getAmount() {
  //   let count = 0;
  //   const interval = setInterval(() => {
  //     this.amount = localStorage.getItem('Amount');
  //     count++;
  //   }, 500);

  //   if (count === 3) {
  //     clearInterval(interval);
  //   }
  // }

  public getNotications() {
    this.auth.getRole$.subscribe((role) => {
      this.role = role;
      if (role === 'CLICKER') {
        this._content.getNotificationAdmin(false).subscribe((notification: ResponseService) => {
          this.notifications = notification.objectResponse.published;
          this.total = notification.objectResponse.total;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
