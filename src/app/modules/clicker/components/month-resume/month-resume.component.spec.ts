import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthResumeComponent } from './month-resume.component';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { LinksService } from 'src/app/services/links.service';
import { of } from 'rxjs/internal/observable/of';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Observable } from 'rxjs';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';

localStorage.setItem(
  'ACCESS_TOKEN',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU'
);

describe('MonthResumeComponent', () => {
  let component: MonthResumeComponent;
  let fixture: ComponentFixture<MonthResumeComponent>;

  let mockLinksService = jasmine.createSpyObj('LinksService', ['getReports']);
  let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);

  let resume = {
    monthResume: {
      totalCommissions: 14806530,
      totalLink: 189,
      daysResume: [
        ['10/12/2019', 0, 490320],
        ['10/23/2019', 13, 12265210],
        ['10/25/2019', 11, 1299000],
        ['10/28/2019', 26, 288000],
        ['10/29/2019', 1, 176000],
        ['10/30/2019', 3, 240000],
        ['11/06/2019', 0, 48000],
      ],
    },
    generalResume: {
      totalCommissions: 14806530,
      totalLinks: 197,
      totalProducts: 56,
      conversionRate: 0.09137055837563451,
    },
  };

  localStorage.setItem(
    'ACCESS_TOKEN',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU'
  );

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MonthResumeComponent],
      imports: [
        TranslateModule.forRoot({}),
        GoogleChartsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
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
        { provide: LinksService, useValue: mockLinksService }
      ],
    }).compileComponents();
    mockLinksService.getReports.and.returnValue(of(resume));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
