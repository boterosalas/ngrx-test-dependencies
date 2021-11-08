import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-card-medal',
  templateUrl: './card-medal.component.html',
  styleUrls: ['./card-medal.component.scss']
})
export class CardMedalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logrosRoute() {
    this.router.navigate(['/logros']);
  }

}
