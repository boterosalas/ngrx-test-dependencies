import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mission-level',
  templateUrl: './mission-level.component.html',
  styleUrls: ['./mission-level.component.scss']
})
export class MissionLevelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() titleMission:string;
  @Input() missionDescription:string;

}
