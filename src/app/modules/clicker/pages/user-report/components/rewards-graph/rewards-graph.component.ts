import { Component, Input, OnInit } from '@angular/core';
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
  isLoading: boolean = true;
  showLastNMonths = 12;
  @Input() dataIn: any = [];
  @Input() recompensasPercent: any;
  graphData: any[];

  monthsTraductor = {
    'enero': 'January',
    'febrero': 'February',
    'marzo': 'March',
    'abril': 'April',
    'mayo': 'May',
    'junio': 'June',
    'julio': 'July',
    'agosto': 'August',
    'septiembre': 'September',
    'octubre': 'October',
    'noviembre': 'November',
    'diciembre': 'December',
  };

  constructor() { }

  ngOnInit(): void {
    this.createGraphData();
    this.createChart();
  }

  createGraphData() {
    const months = [];
    for (let i = 1; i <= this.showLastNMonths; i++) {
      months.push(new Date(new Date().setMonth(new Date().getMonth() - i)).toLocaleString('es-CO', { month: 'long' }))
    }
    this.graphData = months.map(month => {
      const reward = this.dataIn.find((x: any) => x.Month === this.monthsTraductor[month]);
      const total = reward ? reward.commissionValue : 0;
      return { month: this.capitalize(month), total };
    }).reverse();
  }

  capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase();
  }

  createChart() {
    const validateTotal = this.graphData.filter(x => x.total > 0);
    this.chart = new Chart("RewardsChart", {
      type: 'line',
      data: {// values on X-Axis
        labels: this.graphData.map(x => x.month.substr(0, 3)),
        datasets: [
          {
            data: validateTotal.length > 0 ? this.graphData.map(x => x.total) : [],
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
        layout: {
          padding: 0
        },
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
                return `${item.label} - ${formatThousand(item.formattedValue)}`;
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
              color: validateTotal.length > 0 ? '#230040' : '#E8E8ED',
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
            max: validateTotal.length > 0 ? null : 100000,
            ticks: {
              count: validateTotal.length > 0 ? 10 : 6,
              source: 'auto',
              color: validateTotal.length > 0 ? '#230040' : '#E8E8ED',
              font: {
                family: "galano-medium, sans-serif",
                size: 14,
              },
              padding: 8,
              callback: function nFormatter(num: number) {
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
                return item ? `$ ${(num / item.value).toFixed(0).replace(rx, "$1")}${item.symbol}` : "$ 0";
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
