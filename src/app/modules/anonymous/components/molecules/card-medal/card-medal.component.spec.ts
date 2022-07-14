import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from '../../../pages/home/home.component';

import { CardMedalComponent } from './card-medal.component';

describe('CardMedalComponent', () => {
  let component: CardMedalComponent;
  let fixture: ComponentFixture<CardMedalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMedalComponent ],
      imports:[
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
        TranslateModule.forRoot({})
      ],
      schemas:[NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMedalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
