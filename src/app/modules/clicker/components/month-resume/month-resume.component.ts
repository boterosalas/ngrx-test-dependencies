import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-month-resume',
  templateUrl: './month-resume.component.html',
  styleUrls: ['./month-resume.component.scss']
})
export class MonthResumeComponent implements OnInit {
  
  constructor() { }

  myoptions = {
    title : 'Monthly Coffee Production by Country',
    vAxis: {title: 'Cups'},
    hAxis: {title: 'Month'},
    seriesType: 'bars',
    series: {5: {type: 'BarChart'}}
  };

  myData =[
    ['clicks',  136, 6],
    ['Comisiones',  20000, 500],
  ];

  ngOnInit() {
  }

}
