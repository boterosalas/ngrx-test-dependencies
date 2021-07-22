import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

import { CardNotificationComponent } from './card-notification.component';

describe('CardNotificationComponent', () => {
  let component: CardNotificationComponent;
  let fixture: ComponentFixture<CardNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardNotificationComponent ],
      imports:[
        RouterTestingModule,
        AppMaterialModule,
      ],
      providers:[],
      schemas:[
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
