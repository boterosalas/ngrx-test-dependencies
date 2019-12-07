import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditComponent } from './audit.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { LinksService } from 'src/app/services/links.service';
import { of } from 'rxjs/internal/observable/of';
import * as moment from 'moment';

describe('AuditComponent', () => {
  let component: AuditComponent;
  let fixture: ComponentFixture<AuditComponent>;

  const mockLinksService = jasmine.createSpyObj("LinksService", [
    "getAudit"
  ]);

  const audit = {
    state: "Success",
    userMessage: 'se ha enviado un correo',
    objectResponse: [
    ]
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditComponent ],
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        AppMaterialModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
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
      ],
      providers: [{ provide: LinksService, useValue: mockLinksService }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));
  
  beforeEach(() => {
    mockLinksService.getAudit.and.returnValue(of(audit));
    fixture = TestBed.createComponent(AuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.dateParams = {
      email: 'david@test.com',
      start: '2019-12-04',
      end: '2019-12-04'
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('change', () => {
  //   component.change();
  //   expect(component).toBeFalsy();
  // });

  it('export audit', () => {
    component.dateForm.controls.dateRange.setValue({starDate: '2019-12-04', endDate: '2019-12-04'})
    component.exportAudit();
    expect(mockLinksService.getAudit).toHaveBeenCalled();
  });



});
