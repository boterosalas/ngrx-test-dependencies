import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-phygital-report',
  templateUrl: './phygital-report.component.html',
  styleUrls: ['./phygital-report.component.scss']
})
export class PhygitalReportComponent {

  @Input() dataSource = [];
  displayedColumns: string[] = ['description', 'customers', 'sales'];

}
