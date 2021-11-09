import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CardMedalComponent } from './card-medal.component';

describe('CardMedalComponent', () => {
  let component: CardMedalComponent;
  let fixture: ComponentFixture<CardMedalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMedalComponent ],
      imports:[
        RouterTestingModule,
        TranslateModule.forRoot({})
      ]
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
