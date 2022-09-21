import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMissionComponent } from './card-mission.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

describe('CardMissionComponent', () => {
  let component: CardMissionComponent;
  let fixture: ComponentFixture<CardMissionComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardMissionComponent],
      imports: [AppMaterialModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
