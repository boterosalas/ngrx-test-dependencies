import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reward-card',
  templateUrl: './reward-card.component.html',
  styleUrls: ['./reward-card.component.scss']
})
export class RewardCardComponent implements OnInit {

  constructor() { }

  @Input() title: string;
  @Input() money: string;
  @Input() textToolTip: string;
  @Input() gtm: string;
  @Output() open = new EventEmitter();

  ngOnInit(): void {
  }

  public openModal() {
    this.open.emit();
  }

}
