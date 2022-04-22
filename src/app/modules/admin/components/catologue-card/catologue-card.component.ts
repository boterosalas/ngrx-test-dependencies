import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-catologue-card',
  templateUrl: './catologue-card.component.html',
  styleUrls: ['./catologue-card.component.scss']
})
export class CatologueCardComponent implements OnInit {

  constructor() {}

  @Input() idCatalogue: string;
  @Input() title: string;
  @Input() img: string;
  @Input() links: string;
  @Input() template: number;
  @Input() download: number;
  @Input() dateStart: string;
  @Input() dateEnd: string;
  @Input() showHidden: boolean;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() setShowHidden = new EventEmitter();

  ngOnInit() {}

  openEdit() {
    this.edit.emit();
  }

  deleteCatalogue() {
    this.delete.emit({ id: this.idCatalogue });
  }

  showHiddenCatalogue() {
    this.setShowHidden.emit({ id: this.idCatalogue, active: this.showHidden });
  }

  public formatDate(date) {
    const fDate = moment(date).format('YYYY/MM/DD');
    return `${fDate}`;
  }

}
