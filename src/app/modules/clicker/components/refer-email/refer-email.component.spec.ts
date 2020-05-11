import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferEmailComponent } from './refer-email.component';

describe('ReferEmailComponent', () => {
  let component: ReferEmailComponent;
  let fixture: ComponentFixture<ReferEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
