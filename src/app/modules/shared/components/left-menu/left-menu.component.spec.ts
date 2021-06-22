import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { LeftMenuComponent } from './left-menu.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilsService } from 'src/app/services/utils.service';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SidenavService } from "src/app/services/sidenav.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LeftMenuComponent', () => {
  let component: LeftMenuComponent;
  let fixture: ComponentFixture<LeftMenuComponent>;

  const mockSidenavService = jasmine.createSpyObj("SidenavService", ["sideNavState"]);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftMenuComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        BrowserAnimationsModule,

        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem("ACCESS_TOKEN");
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        }),
        HttpClientTestingModule
      ],
      providers: [
        { provide: SidenavService, useValue: mockSidenavService }

      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
