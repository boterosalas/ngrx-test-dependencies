import { Component, OnInit, Output, EventEmitter, HostListener, Input } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isHome: boolean;
  @Input() internal: boolean;

  constructor(
    private utils: UtilsService
  ) { }

  ngOnInit() { 
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
