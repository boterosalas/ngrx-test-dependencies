import { Component, Input, OnInit } from '@angular/core';
import { PersonalInfo } from 'src/app/interfaces/personal-info';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  @Input() data: PersonalInfo;

  constructor() {
  }

  ngOnInit(){}

}
