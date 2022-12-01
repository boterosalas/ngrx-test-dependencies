// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AppMaterialModule } from '../../app-material/app-material.module';

import { ReferWinComponent } from './refer-win.component';

describe('ReferWinComponent', () => {
  let component: ReferWinComponent;
  let fixture: ComponentFixture<ReferWinComponent>;

  
  let socialAuthServiceMock: any;

  socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferWinComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AppMaterialModule,
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
      providers:[
        // { provide: SocialAuthService, useValue: { ...socialAuthServiceMock, authState: new Observable() } },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
