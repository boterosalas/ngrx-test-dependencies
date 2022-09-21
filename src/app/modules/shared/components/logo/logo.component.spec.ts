import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LogoComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
