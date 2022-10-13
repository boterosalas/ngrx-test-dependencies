import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-report',
  templateUrl: './card-report.component.html',
  styleUrls: ['./card-report.component.scss']
})
export class CardReportComponent{

  @Input() items: object;

}
