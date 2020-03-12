import {
  Component,
  OnInit,
  HostListener,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { distinctUntilChanged } from "rxjs/operators";
import { Subscription } from "rxjs";
import { NavigationStart, Router } from "@angular/router";
import { TokenService } from "src/app/services/token.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() isHome: boolean;
  @Input() internal: boolean;
  @Output() sidenav = new EventEmitter();
  
  isLoggedIn: any;

  firstNames: string;
  lastNames: string;
  initials: string;
  private subscription: Subscription = new Subscription();

  constructor(
    private utils: UtilsService,
    public auth: AuthService,
    private user: UserService,
    private router: Router,
    private token: TokenService,
  ) {}

  ngOnInit() {
  }

  public open() {
    this.sidenav.emit();
  }

  @HostListener("over")
  showLogin() {
    this.utils.showloginForm();
  }

  @HostListener("over")
  showMenu() {
    this.utils.showMenu();
  }

  @HostListener("over")
  openRegister() {
    this.utils.showRegisterForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
