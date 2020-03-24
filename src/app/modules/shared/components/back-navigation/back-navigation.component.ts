import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-back-navigation',
  templateUrl: './back-navigation.component.html',
  styleUrls: ['./back-navigation.component.scss']
})
export class BackNavigationComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Input() title: string;
  @Input() aditional: string;
  @Input() imageurl: string;
  

  constructor() { }

  ngOnInit() {
  }

  public closeComponent() {
    this.close.emit();
  }

}
