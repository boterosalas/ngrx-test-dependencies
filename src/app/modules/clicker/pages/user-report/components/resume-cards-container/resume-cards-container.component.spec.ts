import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwiperModule } from 'swiper/angular';
import { BreakpointService } from 'src/app/services/breakpoint.service';

import { ResumeCardsContainerComponent } from './resume-cards-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('ResumeCardsContainerComponent', () => {
  let component: ResumeCardsContainerComponent;
  let fixture: ComponentFixture<ResumeCardsContainerComponent>;
  const mockBreakpointService = jasmine.createSpyObj('BreakpointService', ['isWidthLessThanBreakpoint']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeCardsContainerComponent],
      imports: [
        BrowserAnimationsModule,
        SwiperModule,
      ],
      providers: [
        { provide: BreakpointService, useValue: mockBreakpointService }
      ],
    })
      .compileComponents();

    mockBreakpointService.isWidthLessThanBreakpoint.and.returnValue(of(true));
    fixture = TestBed.createComponent(ResumeCardsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set device to desktop', () => {
    component.breakpoint();
    expect(component.device).toEqual('mobile');
  });

  it('Should set device to desktop', () => {
    mockBreakpointService.isWidthLessThanBreakpoint.and.returnValue(of(false));
    component.breakpoint();
    expect(component.device).toEqual('desktop');
  });

  xit('Should ngOnChanges', () => {
    const changes: any = {
      enValidacion: { currentValue: 123 },
      recompensas: { currentValue: 1234 },
      pendientePorPago: { currentValue: 1235 },
      rechazados: { currentValue: 1236 },
      recompensasPercent: { currentValue: 1237 }
    };
    component.ngOnChanges(changes);
    expect(component.cardValidacion.amount).toEqual(changes.enValidacion.currentValue);
    expect(component.resumeCards[0].amount).toEqual(changes.recompensas.currentValue);
    expect(component.resumeCards[0].percent).toEqual(changes.recompensasPercent.currentValue);
    expect(component.resumeCards[1].percent).toEqual(changes.pendientePorPago.currentValue);
    expect(component.resumeCards[2].percent).toEqual(changes.rechazados.currentValue);
  });

  it('Should ngOnDestroy', () => {
    const spyBreakpointUnsubscribe = spyOn(component.breakpoint$, 'unsubscribe').and.callFake(() => true);
    component.ngOnDestroy();
    expect(spyBreakpointUnsubscribe).toHaveBeenCalled();
  })
});
