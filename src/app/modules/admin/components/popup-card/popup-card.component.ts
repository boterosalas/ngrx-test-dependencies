import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-popup-card',
  templateUrl: './popup-card.component.html',
  styleUrls: ['./popup-card.component.scss'],
})
export class PopupCardComponent implements OnInit {
  constructor() {}

  @Input() idPopup: string;
  @Input() title: string;
  @Input() imgDesktop: string;
  @Input() imgMobile: string;
  @Input() link: string;
  @Input() dateStart: string;
  @Input() dateEnd: string;
  @Input() textButton: string;
  @Input() section: string;
  @Input() showHidden: boolean;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() setShowHidden = new EventEmitter();

  ngOnInit() {}

  openEdit() {
    this.edit.emit();
  }

  deletePopup() {
    this.delete.emit({ id: this.idPopup });
  }

  showHiddenPopup() {
    this.setShowHidden.emit({ id: this.idPopup, active: this.showHidden });
  }

  public formatDate(date) {
    const fDate = moment(date).format('YYYY/MM/DD');
    return `${fDate}`;
  }
}
