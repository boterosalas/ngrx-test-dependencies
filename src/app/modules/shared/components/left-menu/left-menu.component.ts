import { Component, Input, OnInit } from "@angular/core";
import { animateText, onSideNavChange } from "src/app/animations/animations";
import { SidenavService } from "src/app/services/sidenav.service";
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";

interface children {
  name: string;
  route: string;
  orderby: number;
}
interface Page {
  id: number;
  description: string;
  menus: children[];
}

@Component({
  selector: "app-left-menu",
  templateUrl: "./left-menu.component.html",
  styleUrls: ["./left-menu.component.scss"],
  animations: [onSideNavChange, animateText],
})
export class LeftMenuComponent implements OnInit {
  public sideNavState: boolean = false;
  public linkText: boolean = false;
  public itemSelected: string = "";
  @Input() name: string;
  public description:string;

  public currentPages = [
    {description: '', menus: [{
      Id: '', active: true, icon: "", idgrupo: null , menusystem: true, name: '' ,orderby: 1 ,route: ''
    }]}
  ];

  public pagesNoLogin: Page[] = [];

  public pages: Page[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private _sidenavService: SidenavService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    this.currentPages = [];
    this.subscription = this.auth.getMenu$.subscribe((val) => {
      if(val !== null ){
        val.forEach(element => {
          let {description, menus} = element;
          // this.currentPages = menus;
          // this.description = description;
          this.currentPages.push({description,menus});
        });
      }
      console.log(this.currentPages);
    });
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }

  setItemSelected(page) {
    this.itemSelected = page;
  }
}
