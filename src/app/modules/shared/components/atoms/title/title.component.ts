import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() classWeb: string;
  @Input() classMobile: string;
  @Input() commonClass: string;
  @Input() text: string;
  @Input() showTitleh1: boolean;
  @Input() showTitleh2: boolean;
  @Input() showTitleh3: boolean;
  @Input() showTitleh4: boolean;
  @Input() showTitleh5: boolean;
  @Input() showTitleh6: boolean;

  constructor() { }

  ngOnInit(): void {

  }
}
