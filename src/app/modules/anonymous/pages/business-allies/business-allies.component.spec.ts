import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAlliesComponent } from './business-allies.component';

describe('BusinessAlliesComponent', () => {
  let component: BusinessAlliesComponent;
  let fixture: ComponentFixture<BusinessAlliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessAlliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAlliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
