import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateAccountFormComponent } from './activate-account-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';

describe('ActivateAccountFormComponent', () => {
  let component: ActivateAccountFormComponent;
  let fixture: ComponentFixture<ActivateAccountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateAccountFormComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        RouterTestingModule.withRoutes([]),
        SharedModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem("ACCESS_TOKEN");
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
