import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFaqGroupComponent } from './dialog-faq-group.component';

describe('DialogFaqGroupComponent', () => {
  let component: DialogFaqGroupComponent;
  let fixture: ComponentFixture<DialogFaqGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFaqGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFaqGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
