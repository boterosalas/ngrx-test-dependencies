import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { FreeModeOptions } from "swiper/types/modules/free-mode";

// import Swiper core and required modules
import SwiperCore, { FreeMode } from "swiper";
import { swiperBreakpoints } from './breakpoints';
// install Swiper modules
SwiperCore.use([FreeMode]);

@Component({
  selector: 'app-resume-cards-container',
  templateUrl: './resume-cards-container.component.html',
  styleUrls: ['./resume-cards-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResumeCardsContainerComponent implements OnInit, OnDestroy, OnChanges {


  @Input() isLoading: boolean = true;
  @Input() enValidacion: number = 0;
  @Input() recompensas: number = 0;
  @Input() pendientePorPago: number = 0;
  @Input() rechazados: number = 0;
  @Input() recompensasPercent: number = 0;

  breakpoint$: Subscription = new Subscription();
  device: string = '';
  swiperBreakpoints = swiperBreakpoints;
  freeModeOptions: FreeModeOptions = {
    enabled: true,
    momentumBounce: false,
    sticky: true
  };

  resumeCards = []
  cardValidacion: any = {};

  constructor(
    private breakPointService: BreakpointService
  ) { }

  ngOnInit(): void {
    this.breakpoint();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { enValidacion, recompensas, pendientePorPago, rechazados, recompensasPercent } = changes;
    if (enValidacion) {
      this.cardValidacion = {
        title: 'Saldo en validación',
        amount: enValidacion.currentValue,
        tooltip: 'Son las recompensas que la marca aliada está revisando si efectivamente se cerró la venta, una vez aprobado verás este saldo en “saldo pendiente por pagar” o “recompensas de este mes” si la venta es rechazada la verás en “recompensas rechazadas”.'
      };
    }
    if (recompensas) {
      this.resumeCards[0] = {
        class: 'rewards-card',
        title: 'Recompensas del mes',
        amount: recompensas.currentValue,
        tooltip: 'Este es el saldo que has generado durante el mes actual y está aprobado por el negocio aliado, se pagará a tu cuenta entre el 12 y 15 de este mes.',
      };
    }
    if (recompensasPercent) {
      this.resumeCards[0] = { ...this.resumeCards[0], percent: recompensasPercent.currentValue }
    }
    if (pendientePorPago) {
      this.resumeCards[1] = {
        class: 'outstanding-card',
        title: 'Recompensa pendiente por pagar',
        amount: pendientePorPago.currentValue,
        tooltip: 'Estas son las recompensas que serán consignadas en tu cuenta entre el 15 y el 20 de este mes.'
      }
    }
    if (rechazados) {
      this.resumeCards[2] = {
        class: 'rejected-card',
        title: 'Recompensas rechazadas',
        amount: rechazados.currentValue,
        tooltip: 'Las recompensas que no se hicieron efectivas ya que la compra no fue efectuada de forma exitosa.'
      }
    }
  }

  breakpoint() {
    this.breakpoint$ = this.breakPointService
      .isWidthLessThanBreakpoint('840')
      .subscribe((res: boolean) => {
        this.device = res ? 'mobile' : 'desktop';
      });
  }

  ngOnDestroy(): void {
    this.breakpoint$.unsubscribe();
  }

}
