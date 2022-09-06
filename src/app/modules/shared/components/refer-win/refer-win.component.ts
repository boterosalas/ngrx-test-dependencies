import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-refer-win',
  templateUrl: './refer-win.component.html',
  styleUrls: ['./refer-win.component.scss']
})
export class ReferWinComponent implements OnInit {

  constructor(private utils:UtilsService, public auth: AuthService) { }

  ngOnInit(): void {
  }

  openRegister() {
    this.utils.showRegisterForm();
  }

}
