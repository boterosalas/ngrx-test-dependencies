import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferWinComponent } from './refer-win.component';

describe('ReferWinComponent', () => {
  let component: ReferWinComponent;
  let fixture: ComponentFixture<ReferWinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferWinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
