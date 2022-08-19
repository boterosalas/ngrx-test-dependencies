import { Component, HostListener, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-refer-win',
  templateUrl: './refer-win.component.html',
  styleUrls: ['./refer-win.component.scss']
})
export class ReferWinComponent implements OnInit {

  constructor(private utils:UtilsService) { }

  ngOnInit(): void {
  }

  @HostListener('over')
  openRegister() {
    this.utils.showRegisterForm();
  }

}
