import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AuthService } from 'src/app/services/auth.service';

import { ConfigurationsComponent } from './configurations.component';

describe('ConfigurationsComponent', () => {
  let component: ConfigurationsComponent;
  let fixture: ComponentFixture<ConfigurationsComponent>;
  const mockAuthService = jasmine.createSpyObj("AuthService", [
    "getUsersAdmin", "getPermisionByUser", "savePermision"
  ]);
  let response = {
    Status: "Success",
    objectResponse: [{
      menu: "Any",
      permission: "false"
    }]
  }
  let responseUser = [{
    menu: "Any",
    permission: "false"
  }]
  let respuestaArray = [{
    userId: 1,
    firstNames: "Any",
    lastNames: "asss",

  },
  {
    userId: 2,
    firstNames: "Any",
    lastNames: "asss",

  }]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationsComponent],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        NgxDaterangepickerMd,
        SharedModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        FormsModule,
        NgxMaterialTimepickerModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        }),

      ],
      providers: [{ provide: AuthService, useValue: mockAuthService },],
      schemas: [NO_ERRORS_SCHEMA],

    })
      .compileComponents();
    mockAuthService.getUsersAdmin.and.returnValue(of(respuestaArray));
    mockAuthService.getPermisionByUser.and.returnValue(of(responseUser));
    mockAuthService.savePermision.and.returnValue(of(response));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('changes ', () => {
    component.saveeraser();
    component.onChangeSelected({ userId: 1 });
    let datos = true;
    expect(datos).toBeTruthy()
  })
});
