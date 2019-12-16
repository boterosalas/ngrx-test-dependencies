import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDashboardInfoComponent } from './card-dashboard-info.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CardDashboardInfoComponent', () => {
  let component: CardDashboardInfoComponent;
  let fixture: ComponentFixture<CardDashboardInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDashboardInfoComponent ],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDashboardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
