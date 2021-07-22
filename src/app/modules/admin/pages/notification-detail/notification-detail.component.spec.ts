import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { BannerComponent } from 'src/app/modules/shared/components/banner/banner.component';
import { LoadFormFileComponent } from '../../components/load-form-file/load-form-file.component';

import { NotificationDetailComponent } from './notification-detail.component';

describe('NotificationDetailComponent', () => {
  let component: NotificationDetailComponent;
  let fixture: ComponentFixture<NotificationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationDetailComponent, BannerComponent, LoadFormFileComponent ],
      imports:[
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        AppMaterialModule,
        AngularEditorModule,
        NgxDaterangepickerMd,
        NgxMaterialTimepickerModule,
        BrowserAnimationsModule,
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
    fixture = TestBed.createComponent(NotificationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
