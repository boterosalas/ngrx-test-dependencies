import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalComponent } from './medal.component';
import { ClickerModule } from '../../clicker.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('MedalComponent', () => {
  let component: MedalComponent;
  let fixture: ComponentFixture<MedalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ClickerModule, 
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
