import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor() {}

  @Input() title: string;
  @Input() img: string;
  @Input() template: TemplateRef<any>;

  ngOnInit() {}
}
