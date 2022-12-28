import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

const formatThousand = function (value: any) {
  if (parseInt(value) >= 1000) {
    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return '$' + value;
  }
}

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
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
        ],
        datasets: [
          {
            data: [
              '4670',
              '576',
              '572',
              '79097',
              '92',
              '574000',
              '573',
              '576'
            ],
            backgroundColor: 'transparent',
            pointBackgroundColor: '#FFFFFF',
            pointBorderColor: '#230040',
            pointHoverBorderColor: '#FFFFFF',
            pointHoverBackgroundColor: '#230040',
            pointRadius: 5,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 5,
            pointBorderWidth: 2,
            borderColor: '#8C80B4',
            borderWidth: 4,
            fill: false
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'nearest'
        },
        line: {
          datasets: {
            tension: 0,
            borderWidth: 10
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: (items) => {
                const item = items[0];
                return formatThousand(item.formattedValue);
              },
              label: () => null,
              labelTextColor: function () {
                return '#FFFFFF';
              }
            },
            titleFont: {
              family: "galano-medium, sans-serif",
              size: 14,
              weight: '100'
            },
            bodyFont: {
              family: "galano-medium, sans-serif"
            },
            backgroundColor: '#8C80B4',
            padding: {
              top: 12,
              right: 14,
              bottom: 6,
              left: 14
            },
            yAlign: 'bottom',
            xAlign: 'center',
            titleAlign: 'center',
          },
          legend: {
            display: false
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#230040',
              font: {
                family: "galano-medium, sans-serif",
                size: 14
              },
              padding: 20,
            },
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              color: '#230040',
              font: {
                family: "galano-medium, sans-serif",
                size: 14,
              },
              padding: 24,
              callback: function nFormatter(num: number, digits) {
                const lookup = [
                  { value: 1, symbol: "" },
                  { value: 1e3, symbol: "k" },
                  { value: 1e6, symbol: "M" },
                  { value: 1e9, symbol: "G" },
                  { value: 1e12, symbol: "T" },
                  { value: 1e15, symbol: "P" },
                  { value: 1e18, symbol: "E" }
                ];
                const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
                var item = lookup.slice().reverse().find(function (item) {
                  return num >= item.value;
                });
                return item ? `$ ${(num / item.value).toFixed(digits).replace(rx, "$1")}${item.symbol}` : "0";
              }
            },
            beginAtZero: true,
            border: {
              display: false
            },
            grid: {
              display: true
            }
          }
        },
      },

    });
  }

}
