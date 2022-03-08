import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickamerWayComponent } from './clickamer-way.component';

describe('ClickamerWayComponent', () => {
  let component: ClickamerWayComponent;
  let fixture: ComponentFixture<ClickamerWayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickamerWayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickamerWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
