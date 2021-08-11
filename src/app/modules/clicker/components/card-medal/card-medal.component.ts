import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-medal',
  templateUrl: './card-medal.component.html',
  styleUrls: ['./card-medal.component.scss'],
})
export class CardMedalComponent implements OnInit {
  @Input() medals: object;
  @Output() medal = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  infoMedal(event) {
    this.medal.emit(event);
  }
}
