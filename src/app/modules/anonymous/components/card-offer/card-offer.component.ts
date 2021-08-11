import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  TemplateRef,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-card-offer',
  templateUrl: './card-offer.component.html',
  styleUrls: ['./card-offer.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [style({ opacity: 0 }), animate(600)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class CardOfferComponent implements OnInit {
  @Output() infoProduct = new EventEmitter();
  @Output() showExito = new EventEmitter();

  @Input() productName: string;
  @Input() productDescription: string;
  @Input() price: number;
  @Input() discount: string;
  @Input() aliance: string;
  @Input() image: string;
  @Input() plu: string;
  @Input() alt: string;
  @Input() textbutton: string;
  @Input() id: string;
  @Input() btnid: string;
  @Input() exito: boolean;
  @Input() other: boolean;
  @Input() container: boolean;
  @Input() classButton: string;
  @Input() business: string;
  @Input() offers: string;

  constructor(public auth: AuthService) {}

  ngOnInit() {}

  public product() {
    this.infoProduct.emit();
  }
}
