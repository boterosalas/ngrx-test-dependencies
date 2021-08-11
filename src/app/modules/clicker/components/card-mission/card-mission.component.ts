import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-mission',
  templateUrl: './card-mission.component.html',
  styleUrls: ['./card-mission.component.scss'],
})
export class CardMissionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() items: object;
}
