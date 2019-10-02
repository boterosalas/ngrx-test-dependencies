import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private utils: UtilsService
  ) { }

  ngOnInit() { 
  }

  @HostListener('click')
  showLoginForm() {
    this.utils.showloginForm();
  }

}
