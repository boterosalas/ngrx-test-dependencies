import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessComponent } from './bussiness.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { ShareModule } from '@ngx-share/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';

describe('BussinessComponent', () => {
  let component: BussinessComponent;
  let fixture: ComponentFixture<BussinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        BussinessComponent
       ],
       imports: [
         SharedModule,
         TranslateModule.forRoot(),
         FormsModule,
         ReactiveFormsModule,
         MatFormFieldModule,
         ShareModule,
         RouterTestingModule,
         HttpClientTestingModule,
         JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
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
    fixture = TestBed.createComponent(BussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
