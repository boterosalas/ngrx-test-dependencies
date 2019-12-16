import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportComponent } from './report.component';
import { JwtModule } from '@auth0/angular-jwt';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LinksService } from 'src/app/services/links.service';
import { of } from 'rxjs/internal/observable/of';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  let mockLinksService = jasmine.createSpyObj("LinksService", [
    "getPayment",
  ]);

  const data = {
    state: "Success",
    userMessage: null,
    objectResponse:
      "https://webclickamdev.blob.core.windows.net/files-excel/ReportePagoComisiones20191021195441.xlsx"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportComponent ],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot({}),
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
      ],
      providers: [{ provide: LinksService, useValue: mockLinksService }],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
    mockLinksService.getPayment.and.returnValue(of(data));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pagination', () => {
    component.pagination({previousPageIndex: 1, pageIndex: 0, pageSize: 20, length: 5});
    expect(mockLinksService.getPayment).toHaveBeenCalled();
  });

});
