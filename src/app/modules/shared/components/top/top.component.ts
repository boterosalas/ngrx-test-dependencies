import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() title: string;

  constructor() {}

  ngOnInit() {}

  public closeComponent() {
    this.close.emit();
  }
}
