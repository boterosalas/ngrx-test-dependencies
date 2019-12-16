import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.scss']
})
export class CardDataComponent implements OnInit {

  constructor() { }

  @Input() number:string;
  @Input() text:string;

  ngOnInit() {
  }

}
