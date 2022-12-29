import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume-card',
  templateUrl: './resume-card.component.html',
  styleUrls: ['./resume-card.component.scss']
})
export class ResumeCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() amount: number = 0;
  @Input() tooltipText: string = '';
  @Input() cardClass: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
