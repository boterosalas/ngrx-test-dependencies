import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rewards-by-bussiness',
  templateUrl: './rewards-by-bussiness.component.html',
  styleUrls: ['./rewards-by-bussiness.component.scss'],
})
export class RewardsByBussinessComponent implements OnInit {
  isVisible: boolean = false;

  @Input() ojbRewards = [];

  constructor() { }

  ngOnInit(): void { }
}
