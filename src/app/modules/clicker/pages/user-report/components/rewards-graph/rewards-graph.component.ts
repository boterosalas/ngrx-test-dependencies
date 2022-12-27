import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-rewards-graph',
  templateUrl: './rewards-graph.component.html',
  styleUrls: ['./rewards-graph.component.scss']
})
export class RewardsGraphComponent implements OnInit {
  chart: any;

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {

    this.chart = new Chart("RewardsChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
          '2022-05-17',
        ],
        datasets: [
          {
            data: [
              '467',
              '576',
              '572',
              '79',
              '92',
              '574',
              '573',
              '576'
            ],
            // backgroundColor: 'blue',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#FFFFFF',
            pointBorderColor: '#230040',
            pointHoverBorderColor: '#FFFFFF',
            pointHoverBackgroundColor: '#230040',
            pointRadius: 5,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 5,
            borderColor: '#8C80B4',
            borderWidth: 2,
            fill: true,
            cubicInterpolationMode: 'monotone',

          },
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          tooltip: {
            callbacks: {
              title: () => '$ 10.000',
              label: () => null
            }
          },
          legend: {
            display: false
          },
        },
        scales: {
          x: {
            border: {
              display: false
            },
            grid: {
              display: false,

            },
          },
          y: {
            border: {
              display: false
            },
            grid: {
              display: true
            }
          }
        },
      }

    });
  }

}
