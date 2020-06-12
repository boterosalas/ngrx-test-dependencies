import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksReferComponent } from './works-refer.component';

describe('WorksReferComponent', () => {
  let component: WorksReferComponent;
  let fixture: ComponentFixture<WorksReferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksReferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksReferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
