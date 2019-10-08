import { Component, OnInit, HostListener, Input } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input() isHome: boolean;
  @Input() internal: boolean;
  isLoggedIn: any;

  firstNames: string = "David";
  lastNames: string = "Betancur";
  initials: string;

  constructor(
    private utils: UtilsService,
    private auth: AuthService,
    private user: UserService
  ) {}

  ngOnInit() {
    this.initialNameLastName();
  }

  public logout() {
    this.auth.logout();
  }

  initialNameLastName() {
    this.user.userInfo$.pipe(distinctUntilChanged()).subscribe(val => {
      if (!!val) {
        const initialName = val.firstNames.charAt(0);
        const initialLastName = val.lastNames.charAt(0);
        this.initials = initialName + initialLastName;
      }
    });
  }

  @HostListener("over")
  showLogin() {
    this.utils.showloginForm();
  }

  @HostListener("over")
  showMenu() {
    this.utils.showMenu();
  }
}
