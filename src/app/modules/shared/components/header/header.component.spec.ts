import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const mockUtilsService = jasmine.createSpyObj("UtilsService", ["showRegisterForm", "showloginForm", "showMenu"]);
  const mockAuthService = jasmine.createSpyObj("AuthService", ["logout", "userInfo$"]);

  let dataUser = {
    "Email":"daniel.salamanca@pragma.com.co",
    "FirstNames":"Daniel",
    "LastNames":"Salamanca",
    "Identification": "1053796817",
    "Cellphone": 3008526341,
    "Password":"123456",
    "IdType":1
}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HeaderComponent,
        HomeComponent
       ],
       imports: [
         AppMaterialModule,
         HttpClientTestingModule,
          RouterTestingModule.withRoutes([
            { path: 'inicio', component: HomeComponent},
         ]),
         TranslateModule.forRoot({}),
         MatMenuModule
       ],
       providers: [
        { provide: UtilsService, useValue: mockUtilsService },
        // { provide: AuthService, useValue: mockAuthService },
       ],
       schemas: [
         NO_ERRORS_SCHEMA
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // mockAuthService.logout.and.returnValue(true);
    mockAuthService.userInfo$.and.returnValue({});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('logout', () => {
    component.logout();
    // expect(mockAuthService.logout).toHaveBeenCalled();
  });
  

  describe('show Login', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      mockUtilsService.showloginForm.and.returnValue();
    });

    it('show Login', () => {
      component.showLogin();
      expect(mockUtilsService.showloginForm).toHaveBeenCalled();
    });

  });

  describe('show menu', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      mockUtilsService.showMenu.and.returnValue({});
    });

  
    it('show menu', () => {
      component.showMenu();
      expect(mockUtilsService.showMenu).toHaveBeenCalled();
    });
  
  });

  describe('open register', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      mockUtilsService.showRegisterForm.and.returnValue({});
    });

    it('open register', () => {
      component.openRegister();
      expect(mockUtilsService.showRegisterForm).toHaveBeenCalled();
    });

  });
  

});
