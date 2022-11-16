import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PreviousRouteService } from 'src/app/services/previous-route.service';

import { BackButtonComponent } from './back-button.component';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;
  const mockPreviousRouteService = jasmine.createSpyObj('PreviousRouteService',['getPreviousUrl']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackButtonComponent ],
      imports:[
        TranslateModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        {provide: PreviousRouteService, useValue: mockPreviousRouteService},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set /inicio to component.route', () => {
    mockPreviousRouteService.getPreviousUrl.and.callFake(()=>null);
    component.ngOnInit();
    expect(component.route).toBe('/inicio');
  });

  it('Should set route to component.route', () => {
    mockPreviousRouteService.getPreviousUrl.and.callFake(()=>'/negocios');
    component.ngOnInit();
    expect(component.route).toBe('/negocios');
  });
});
