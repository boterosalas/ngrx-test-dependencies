import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AditionalInfoFormComponent } from './aditional-info-form.component';

describe('AditionalInfoFormComponent', () => {
  let component: AditionalInfoFormComponent;
  let fixture: ComponentFixture<AditionalInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AditionalInfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AditionalInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
