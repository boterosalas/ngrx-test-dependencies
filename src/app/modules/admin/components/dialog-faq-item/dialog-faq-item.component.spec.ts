import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFaqItemComponent } from './dialog-faq-item.component';

describe('DialogFaqItemComponent', () => {
  let component: DialogFaqItemComponent;
  let fixture: ComponentFixture<DialogFaqItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFaqItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFaqItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
