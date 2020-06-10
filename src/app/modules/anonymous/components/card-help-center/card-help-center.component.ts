import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-help-center',
  templateUrl: './card-help-center.component.html',
  styleUrls: ['./card-help-center.component.scss']
})
export class CardHelpCenterComponent implements OnInit {

  @Input() route:string;
  @Input() name:string;
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
