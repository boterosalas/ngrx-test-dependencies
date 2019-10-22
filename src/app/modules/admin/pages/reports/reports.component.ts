import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  @ViewChild("templateCardReport, templateCardCross", { static: false }) template: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
