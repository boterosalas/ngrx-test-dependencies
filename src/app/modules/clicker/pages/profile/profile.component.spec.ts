import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { ClickerModule } from '../../clicker.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

class MockUserService extends UserService {
  userInfo$ = new BehaviorSubject<any>({
    userId: '220',
    identification: '1223345',
    verified: true,
  });
}

let dataUserC = {
  managedPayments: true,
  isEmployeeUser: true,
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['uploadFiles']);

  let sendvalues = {
    userid: '260',
    value: true,
    identification: '123456789',
    identificationCard1: '84994889',
    identificationCard2: '84994889',
    bankCertificate: '84994889',
    // rut: '84994889',
  };

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ClickerModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        NoopAnimationsModule,
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
        // { provide: UserService, useValue: mockUserService },
        { provide: UserService, useClass: MockUserService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem(
      'ACCESS_TOKEN',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU'
    );
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockUserService.uploadFiles.and.returnValue(of(sendvalues));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.userId = '260';
    component.id = '131516';
    component.sendFiles({
      fileIdentificationCard1: 'data:application/octet-stream;base64, 84dq8d9qdqd',
      fileIdentificationCard2: 'data:application/octet-stream;base64, dqdqdqsqsq',
      fileBankCertificate: 'data:application/octet-stream;base64, ddp0d9aida0d',
    });
    expect(component.userId).not.toBeUndefined();
    component.reset({});
    let file = '';
    expect(file).toBe('');
    let service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'getuserdata').and.returnValue(of(dataUserC));
    component.getUserData();
    expect(service.getuserdata).toHaveBeenCalled();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
