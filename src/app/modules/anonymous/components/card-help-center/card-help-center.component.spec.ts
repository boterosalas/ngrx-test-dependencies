import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHelpCenterComponent } from './card-help-center.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AnonymousModule } from '../../anonymous.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../../pages/home/home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CardHelpCenterComponent', () => {
  let component: CardHelpCenterComponent;
  let fixture: ComponentFixture<CardHelpCenterComponent>;

beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        TranslateModule.forRoot({}),
        SharedModule,
        AppMaterialModule,
        AnonymousModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
      ],
      schemas:[NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHelpCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
