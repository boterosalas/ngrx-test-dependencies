import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionLevelComponent } from './mission-level.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

describe('MissionLevelComponent', () => {
  let component: MissionLevelComponent;
  let fixture: ComponentFixture<MissionLevelComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MissionLevelComponent],
      imports: [AppMaterialModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
