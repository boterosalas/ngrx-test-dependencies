import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinComissionComponent } from './win-comission.component';

describe('WinComissionComponent', () => {
  let component: WinComissionComponent;
  let fixture: ComponentFixture<WinComissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinComissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinComissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
