import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMedalComponent } from './card-medal.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

describe('CardMedalComponent', () => {
  let component: CardMedalComponent;
  let fixture: ComponentFixture<CardMedalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardMedalComponent ],
      imports: [
        AppMaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMedalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
