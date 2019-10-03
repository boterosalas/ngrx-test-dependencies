import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordComponent } from './forgotpassword.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('ForgotpasswordComponent', () => {
  let component: ForgotpasswordComponent;
  let fixture: ComponentFixture<ForgotpasswordComponent>;

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ForgotpasswordComponent
       ],
       imports: [
        TranslateModule,
        AppMaterialModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        TranslateModule.forRoot({})
       ],
       providers: [ 
        { provide: Router, useValue: mockRouter},
       ],
       schemas: [
         NO_ERRORS_SCHEMA
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('go to login', () => {
    component.backLogin();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });
  
});
