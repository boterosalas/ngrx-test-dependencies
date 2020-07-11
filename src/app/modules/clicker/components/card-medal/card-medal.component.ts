import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-medal',
  templateUrl: './card-medal.component.html',
  styleUrls: ['./card-medal.component.scss']
})
export class CardMedalComponent implements OnInit {

  @Input() medals:object;

  constructor() { }

  ngOnInit() {
  }

}
