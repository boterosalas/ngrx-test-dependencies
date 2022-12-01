import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickAcademyComponent } from './click-academy.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';
import { Observable, of } from 'rxjs';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HomeComponent } from '../home/home.component';

describe('ClickAcademyComponent', () => {
  let component: ClickAcademyComponent;
  let fixture: ComponentFixture<ClickAcademyComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['saveOnboarding']);

  let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);

  const saveOnboardingOk = {
    state: 'Success',
    userMessage: 'se ha guardado correctamente',
    objectResponse: [],
  };

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClickAcademyComponent],
      imports: [
        TranslateModule.forRoot({}),
        AppMaterialModule,
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            allowedDomains: [],
            disallowedRoutes: [],
          },
        }),
      ],
      providers: [
        // { provide: SocialAuthService, useValue: { ...socialAuthServiceMock, authState: new Observable() } },
        { provide: UserService, useValue: mockUserService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save on boarding', () => {
    mockUserService.saveOnboarding.and.returnValue(of(saveOnboardingOk));
    component.resetOnboarding();
    expect(mockUserService.saveOnboarding).toHaveBeenCalled();
  });
});
