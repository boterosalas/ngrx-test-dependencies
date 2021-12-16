import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-report',
  templateUrl: './card-report.component.html',
  styleUrls: ['./card-report.component.scss']
})
export class CardReportComponent implements OnInit {

  @Input() items: object;

  constructor() { }

  ngOnInit(): void {
  }

}
