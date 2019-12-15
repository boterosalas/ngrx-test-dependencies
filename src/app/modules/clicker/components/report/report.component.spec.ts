import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReportComponent } from "./report.component";
import { JwtModule } from "@auth0/angular-jwt";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LinksService } from "src/app/services/links.service";
import { of } from "rxjs/internal/observable/of";
import { RouterTestingModule } from "@angular/router/testing";

describe("ReportComponent", () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  let mockLinksService = jasmine.createSpyObj("LinksService", [
    "getPayment",
    "getInfomonth",
    "getReports"
  ]);

  const data = {users: [], total: 0}

  let infoMonth = {
    generalResume: {
      totalCommissions: 0,
      totalLinks: 0,
      totalProducts: 0,
      conversionRate: 0
    },
    money: { available: 0, account: 0 },
    monthResume: { totalCommissions: 0, totalLink: 0, daysResume: [] }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportComponent],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
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
      ],
      providers: [{ provide: LinksService, useValue: mockLinksService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    mockLinksService.getPayment.and.returnValue(of(data));
    mockLinksService.getReports.and.returnValue(of(infoMonth));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.identification= "123456789";
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("pagination", () => {
    component.pagination({
      previousPageIndex: 1,
      pageIndex: 0,
      pageSize: 20,
      length: 5
    });
    expect(mockLinksService.getPayment).toHaveBeenCalled();
  });
});
