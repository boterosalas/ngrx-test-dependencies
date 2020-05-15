import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefersComponent } from './refers.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDaterangepickerMd, LOCALE_CONFIG, LocaleService } from 'ngx-daterangepicker-material';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { config } from 'process';

describe('RefersComponent', () => {
  let component: RefersComponent;
  let fixture: ComponentFixture<RefersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefersComponent ],
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        AppMaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NgxDaterangepickerMd,
        RouterTestingModule.withRoutes([]),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem("ACCESS_TOKEN");
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })],
        providers: [
          { provide: LOCALE_CONFIG, useValue: config },
          {
            provide: LocaleService,
            useClass: LocaleService,
            deps: [LOCALE_CONFIG]
          }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
