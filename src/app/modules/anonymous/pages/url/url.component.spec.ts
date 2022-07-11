import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlComponent } from './url.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { ContentService } from 'src/app/services/content.service';
import { Observable, of } from 'rxjs';
import { SocialAuthService } from 'angularx-social-login';
localStorage.setItem(
  'ACCESS_TOKEN',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU'
);
describe('UrlComponent', () => {

  let component: UrlComponent;
  let fixture: ComponentFixture<UrlComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['getBusiness']);
  let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);

  let bussiness = [
    {
      id: 0,
      description: 'Almacenes Carulla',
    },
    {
      id: 1,
      description: 'Almacenes Exito',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UrlComponent],
      imports: [
        RouterTestingModule,
        AppMaterialModule,
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
      providers: [{ provide: SocialAuthService, useValue: { ...socialAuthServiceMock, authState: new Observable() } },{ provide: ContentService, useValue: mockContentService }]
    }).compileComponents();
    mockContentService.getBusiness.and.returnValue(of(bussiness));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
