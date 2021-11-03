import { Component, OnInit, HostListener, OnChanges, DoCheck, Input, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { LoaderService } from 'src/app/services/loader.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
@Component({
  selector: 'app-menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.scss'],
})
export class MenuOptionsComponent implements OnInit, OnDestroy {
  constructor(public auth: AuthService, private utils: UtilsService, private loader: LoaderService, private router: Router) {}

  options = [];
  token = localStorage.getItem('ACCESS_TOKEN');
  authorization = this.token;
  @Input() colfooter;
  @Input() aligmentdesktop = 'center center';
  @Input() aligment;
  @Input() layoutxs = 'row';
  @Input() layoutmd = 'column';
  @Input() showIcon = false;
  @Input() icon: string;
  @Input() section = 'menuTop';
  @Output() hideSidenav = new EventEmitter();

  isOpenMenu: boolean;
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.getMenu();
  }

  /**
   * Metodo para obtener los menus
   */

  public getMenu() {
    this.subscription = this.auth.getMenu$.subscribe((val) => {
      console.log(val);
      this.options = val;
    });
  }

  public hide() {
    this.hideSidenav.emit();
  }

  @HostListener('over')
  hideMenu() {
    this.utils.hideMenu();
  }

  /**
   * metodo para cerrar sesion
   */

  public logout() {
    this.utils.logout();
  }

  public goTerms() {
    this.router.navigate(['/terminos-y-condiciones']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
