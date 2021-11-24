import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { UserService } from 'src/app/services/user.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['comunitcations', 'statusUser', 'changeOrigin']);

  const data = {
    userId: 1,
    state:'EXTERNO',
    isemployeegrupoexito: false,
    receiveCommunications: 'Si',
    score: '2',
    stateuser: 'Activo'
  }

  const response = {
    state: 'Success',
    userMessage: 'se guardo',
    objectResponse: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        AppMaterialModule,
        BrowserAnimationsModule,
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
        { provide: UserService, useValue: mockUserService },
      ]
    })
    .compileComponents();
    mockUserService.comunitcations.and.returnValue(of(response));
    mockUserService.statusUser.and.returnValue(of(response));
    mockUserService.changeOrigin.and.returnValue(of(response));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changeValueService comunications false', () => {
    const checked  = {
      checked: false
    }
    component.changeValueService(checked, 'comunications');
    expect(mockUserService.comunitcations).toHaveBeenCalled();
  });

  it('changeValueService comunications true', () => {
    const checked  = {
      checked: true
    }
    component.changeValueService(checked, 'comunications');
    expect(mockUserService.comunitcations).toHaveBeenCalled();
  });

  it('changeValueService comunications status', () => {
    const checked  = {
      checked: false
    }
    component.changeValueService(checked, 'status');
    expect(mockUserService.comunitcations).toHaveBeenCalled();
  });

  it('changeValueService status true', () => {
    const checked  = {
      checked: true
    }
    component.changeValueService(checked, 'status');
    expect(mockUserService.comunitcations).toHaveBeenCalled();
  });

  it('changeValueService comunications internal', () => {
    const checked  = {
      checked: false
    }
    component.changeValueService(checked, 'internal');
    expect(mockUserService.comunitcations).toHaveBeenCalled();
  });

  it('changeValueService internal true', () => {
    const checked  = {
      checked: true
    }
    component.changeValueService(checked, 'internal');
    expect(mockUserService.comunitcations).toHaveBeenCalled();
  });

});
