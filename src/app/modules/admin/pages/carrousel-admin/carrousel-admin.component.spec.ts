import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselAdminComponent } from './carrousel-admin.component';

describe('CarrouselAdminComponent', () => {
  let component: CarrouselAdminComponent;
  let fixture: ComponentFixture<CarrouselAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrouselAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrouselAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
