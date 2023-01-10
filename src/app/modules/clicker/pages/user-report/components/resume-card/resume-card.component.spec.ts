import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeCardComponent } from './resume-card.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

describe('ResumeCardComponent', () => {
  let component: ResumeCardComponent;
  let fixture: ComponentFixture<ResumeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeCardComponent ],
      imports: [
        AppMaterialModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
