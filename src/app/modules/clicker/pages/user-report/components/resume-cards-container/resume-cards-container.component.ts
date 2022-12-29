import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { SwiperComponent } from "swiper/angular";
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

  isLoading: boolean = true;

  @Input() dataSet: any = {
    enValidacion: 0,
    recompensas: 0,
    pendientePorPago: 0,
    rechazados: 0
  };

  breakpoint$: Subscription = new Subscription();
  device: string = '';
  swiperBreakpoints = swiperBreakpoints;
  freeModeOptions: FreeModeOptions = {
    enabled: true,
    momentumBounce: false,
    sticky: true
  };

  resumeCards = []

  constructor(
    private breakPointService: BreakpointService,
  ) { }

  ngOnInit(): void {
    this.breakpoint();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { dataSet } = changes;
    if (dataSet.currentValue) {
      this.isLoading = false;
      this.dataSet = dataSet.currentValue;
      this.resumeCards = [
        {
          class: 'rewards-card',
          title: 'Recompensas del mes',
          amount: this.dataSet.recompensas,
          tooltip: 'Este es el saldo que has generado durante el mes actual y está aprobado por el negocio aliado, se pagará a tu cuenta entre el 12 y 15 de este mes.'
        },
        {
          class: 'outstanding-card',
          title: 'Recompensa pendiente por pagar',
          amount: this.dataSet.pendientePorPago,
          tooltip: 'Estas son las recompensas que serán consignadas en tu cuenta entre el 15 y el 20 de este mes.'
        },
        {
          class: 'rejected-card',
          title: 'Recompensas rechazadas',
          amount: this.dataSet.rechazados,
          tooltip: 'Las recompensas que no se hicieron efectivas ya que la compra no fue efectuada de forma exitosa.'
        },
      ]
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
