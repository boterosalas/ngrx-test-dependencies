import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-phygital-report',
  templateUrl: './phygital-report.component.html'
})
export class PhygitalReportComponent {

  @Input() dataSource = [];
  displayedColumns: string[] = ['description', 'customers', 'sales'];

}
