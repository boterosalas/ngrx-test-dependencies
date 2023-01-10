import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportComponent } from './user-report.component';
import { of } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';
import { ContentService } from 'src/app/services/content.service';
import { TokenService } from 'src/app/services/token.service';
import { TranslateModule } from '@ngx-translate/core';

describe('UserReportComponent', () => {
  let component: UserReportComponent;
  let fixture: ComponentFixture<UserReportComponent>;
  const mockLinksService = jasmine.createSpyObj('LinksService', ['getReportUser', 'getRewardsReportById']);
  const mockTokenService = jasmine.createSpyObj('TokenService', [''], { user: { userid: '123' } });
  const mockContentService = jasmine.createSpyObj('ContentService', ['getAllBusiness']);
  const mockGetReportUser = {
    objectResponse: {
      money: {
        cutOffValue: 0,
        validation: 0,
        accumulated: 0,
        rejected: 0,
        cutOffValuePercent: 0
      }
    }
  }
  const mockGetRewardsReportById = {
    objectResponse: {
      generalResumeRewards: {
        graph: [],
        totalBusiness: [],
        cutOffValueRewards: [],
        total: 0
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserReportComponent],
      providers: [
        { provide: LinksService, useValue: mockLinksService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: ContentService, useValue: mockContentService },
      ],
      imports: [
        TranslateModule.forRoot({})
      ]
    }).compileComponents();

    mockLinksService.getReportUser.and.callFake(() => of(mockGetReportUser));
    mockLinksService.getRewardsReportById.and.callFake(() => of(mockGetRewardsReportById));
    mockContentService.getAllBusiness.and.callFake(() => of([]));
    fixture = TestBed.createComponent(UserReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    const spyGetBussinessByCategory = spyOn(component, 'getBussinessByCategory').and.callFake(() => true);
    component.ngOnInit();
    expect(spyGetBussinessByCategory).toHaveBeenCalled();
  });

  it('Shold get all bussiness', () => {
    const spyGetRewardsReport = spyOn(component, 'getRewardsReport').and.callFake(() => true);
    const spyGetReportUser = spyOn(component, 'getReportUser').and.callFake(() => true);
    component.getBussinessByCategory();
    expect(component.bussinessList).toEqual([]);
    expect(spyGetRewardsReport).toHaveBeenCalled();
    expect(spyGetReportUser).toHaveBeenCalled();
  });

  it('Should getReportUser', () => {
    component.getReportUser();
    expect(component.cardRecompensas).toEqual(mockGetReportUser.objectResponse.money.cutOffValue);
    expect(component.cardEnValidacion).toEqual(mockGetReportUser.objectResponse.money.validation);
    expect(component.cardPendientePorPago).toEqual(mockGetReportUser.objectResponse.money.accumulated);
    expect(component.cardRechazados).toEqual(mockGetReportUser.objectResponse.money.rejected);
    expect(component.recompensasPercent).toEqual(mockGetReportUser.objectResponse.money.cutOffValuePercent);
    expect(component.cardsAreLoading).toEqual(false);
  });

  it('Should getRewardsReport', () => {
    component.getReportUser();
    expect(component.graphData).toEqual(mockGetRewardsReportById.objectResponse.generalResumeRewards.graph);
    expect(component.bussinessTopRewards).toEqual(mockGetRewardsReportById.objectResponse.generalResumeRewards.totalBusiness);
    expect(component.purchaseDetailData).toEqual(mockGetRewardsReportById.objectResponse.generalResumeRewards.cutOffValueRewards);
    expect(component.totalItems).toEqual(mockGetRewardsReportById.objectResponse.generalResumeRewards.total);
    expect(component.graphIsLoading).toEqual(false);
  });

  it('Should formatBussinessRewardsTop', () => {
    const bussiness = [];
    const array = component.formatBussinessRewardsTop(bussiness);
    expect(array).toEqual(bussiness);
  });

  it('Should ngOnDestroy', () => {
    const spyGetPayment = spyOn(component.getPayment$, 'unsubscribe').and.callFake(() => true);
    const spyGetReportUser = spyOn(component.getReportUser$, 'unsubscribe').and.callFake(() => true);
    const spyGetRewardsReport = spyOn(component.getRewardsReport$, 'unsubscribe').and.callFake(() => true);
    component.ngOnDestroy();
    expect(spyGetPayment).toHaveBeenCalled();
    expect(spyGetReportUser).toHaveBeenCalled();
    expect(spyGetRewardsReport).toHaveBeenCalled();
  });

});
