import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDashboardComponent } from './card-dashboard.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CardDashboardComponent', () => {
  let component: CardDashboardComponent;
  let fixture: ComponentFixture<CardDashboardComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardDashboardComponent],
      imports: [AppMaterialModule, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
