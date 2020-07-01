import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardComponent } from "./dashboard.component";
import { SharedModule } from "src/app/modules/shared/shared.module";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LinksService } from "src/app/services/links.service";
import { of } from 'rxjs/internal/observable/of';

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let mockLinksService = jasmine.createSpyObj("LinksService", ["getKPI"]);

  let kpi = {
    historicalCommissionValue: 1809775.3,
    historicalSales: 17085243,
    historicalUsersQuantity: 233,
    historicalActiveUsersQuantity: 2,
    historicalGeneratedLinks: 773,
    business: 3,
    monthCommissionValue: 0,
    monthSales: 0,
    monthUsersQuantity: 2,
    monthActiveUsersQuantity: 0,
    monthGeneratedLinks: 110,
    yesterdayCommissionValue: 0,
    yesterdaySales: 0,
    todayUsersQuantity: 0,
    yesterdayActiveUsersQuantity: 0,
    todayGeneratedLinks: 0
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        SharedModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [{ provide: LinksService, useValue: mockLinksService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    mockLinksService.getKPI.and.returnValue(of(kpi));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(mockLinksService.getKPI).toHaveBeenCalled();
  });

  it('change date', () => {
    component.change();
    expect(mockLinksService.getKPI).toHaveBeenCalled();
  });
  

});
