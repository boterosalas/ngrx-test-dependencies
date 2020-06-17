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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DialogHistoryComponent } from '../../components/dialog-history/dialog-history.component';

describe("ReportComponent", () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  let mockLinksService = jasmine.createSpyObj("LinksService", [
    "getPayment",
    "getInfomonth",
    "getReports",
    "getDetailPaymentClicker"
  ]);

  const mockDialog = jasmine.createSpyObj("MatDialog", ["open"]);
  const mockDialogRef = jasmine.createSpyObj("MatDialogRef", [
    "close",
    "afterClosed",
    "componentInstance",
    "event "
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
    monthResume: { totalCommissions: 0, totalLink: 0, daysResume: [] },
    accumulated: '9999',
    detailAccumulated: [{commissionGenerationDate: "2020-05-01T00:00:00", productName: "Garbanzo", commissionValue: 259, paymentDate: null, statusCommission: "Pendiente de pago"}]
  };

  const user = {
    paymentDate: '2019-12-12',
    bank: 'Bancolombia',
    amount: '10000000',
    title: 'Pago',
    detail: 'Detalle ventas'
  } 

  const getDetailPayment = {
    product: "vuelos", commissionValue: 16000, date: "2019-11-10T20:33:01.207"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportComponent, DialogHistoryComponent],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        BrowserAnimationsModule,
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
    })
    .overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [DialogHistoryComponent]
      }
    })
    .compileComponents();
    mockLinksService.getPayment.and.returnValue(of(data));
    mockLinksService.getReports.and.returnValue(of(infoMonth));
    mockLinksService.getDetailPaymentClicker.and.returnValue(of(getDetailPayment));
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

  
  it("get detail payment", () => {
    component.userData(user);
    expect(mockLinksService.getDetailPaymentClicker).toHaveBeenCalled();
  });

});
