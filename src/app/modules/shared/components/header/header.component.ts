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
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input() isHome: boolean;
  @Input() internal: boolean;
  @Input() name: string;
  @Output() sidenav = new EventEmitter();
  
  isLoggedIn: any;
  firstNames: string;
  lastNames: string;
  amount: any;

  constructor(
    private utils: UtilsService,
    public auth: AuthService  ) {}

  ngOnInit() {
    this.getAmount();
  }

  public open() {
    this.sidenav.emit();
  }

  public logout() {
    this.utils.logout();
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

  public getAmount() {
    let count = 0;
    let interval = setInterval(() => {
      this.amount =  localStorage.getItem('Amount');
      count ++;
    }, 500);

    if(count === 3) {
      clearInterval(interval);
    }
    
  }


}
