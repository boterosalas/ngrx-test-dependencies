import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-data-total',
  templateUrl: './card-data-total.component.html',
  styleUrls: ['./card-data-total.component.scss']
})
export class CardDataTotalComponent implements OnInit {

  constructor() { }

  @Input() radicado: string;
  @Input() description: string;



  @Input() classTotal: string;
  @Input() imgTotal: string;
  @Input() linksTotal: number;
  @Input() productosTotales: number;
  @Input() conversionRate: number;


  @Output() openDetail = new EventEmitter;

  ngOnInit() {

  }


  public detail() {
    this.openDetail.emit();
  }

}
