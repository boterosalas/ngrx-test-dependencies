import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseService } from 'src/app/interfaces/response';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private auth:AuthService) { }

  options:[] = [];

  ngOnInit() {
    this.auth.getMenu().subscribe((resp:any) => {
      this.options = resp;
    })
  }

}
