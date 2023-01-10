import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDetailComponent } from './purchase-detail.component';
import { LinksService } from 'src/app/services/links.service';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { of } from 'rxjs';

describe('PurchaseDetailComponent', () => {
  let component: PurchaseDetailComponent;
  let fixture: ComponentFixture<PurchaseDetailComponent>;
  const mockLinksService = jasmine.createSpyObj('LinksService', ['getRewardsReportById']);
  const mockBreakpointService = jasmine.createSpyObj('BreakpointService', ['isWidthLessThanBreakpoint']);
  const mockGetRewardsReportById = {
    objectResponse: {
      generalResumeRewards: {
        cutOffValueRewards: [],
        total: 2
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseDetailComponent],
      providers: [
        { provide: LinksService, useValue: mockLinksService },
        { provide: BreakpointService, useValue: mockBreakpointService }
      ],
      imports: [
        AppMaterialModule,
        BrowserAnimationsModule,
        NgxPaginationModule
      ]
    })
      .compileComponents();

    mockLinksService.getRewardsReportById.and.returnValue(of(mockGetRewardsReportById));
    mockBreakpointService.isWidthLessThanBreakpoint.and.returnValue(of(true));
    fixture = TestBed.createComponent(PurchaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call detectDevice onInit', () => {
    const spyDetectDevice = spyOn(component, 'detectDevice').and.callFake(() => true);
    component.ngOnInit();
    expect(spyDetectDevice).toHaveBeenCalled();
  });

  it('searchIsValid should return false when no initDate value', () => {
    component.initDate.setValue(null);
    component.endDate.setValue(new Date());
    const isValid = component.searchIsValid();
    expect(isValid).toBe(false);
  });

  it('searchIsValid should return false when no endDate value', () => {
    component.initDate.setValue(new Date());
    component.endDate.setValue(null);
    const isValid = component.searchIsValid();
    expect(isValid).toBe(false);
  });

  it('searchIsValid should return false when initDate value is not finite', () => {
    component.initDate.setValue('null');
    component.endDate.setValue(new Date());
    const isValid = component.searchIsValid();
    expect(isValid).toBe(false);
  });

  it('searchIsValid should return false when endDate value is not finite', () => {
    component.initDate.setValue(new Date());
    component.endDate.setValue('null');
    const isValid = component.searchIsValid();
    expect(isValid).toBe(false);
  });

  it('searchIsValid should return true', () => {
    component.initDate.setValue(new Date());
    component.endDate.setValue('null');
    const isValid = component.searchIsValid();
    expect(isValid).toBe(false);
  });

  it('Should not apply filter and open datepicker', () => {
    const datepicker = {
      open: () => true
    };
    const openSpy = spyOn(datepicker, 'open').and.callFake(() => true);
    component.initDate.setValue(null);
    component.endDate.setValue(null);
    component.applyFilter(datepicker);
    expect(openSpy).toHaveBeenCalled();
  });

  it('Should not apply filter', () => {
    const datepicker = {
      open: () => true
    };
    const openGetPayments = spyOn(component, 'getPayments').and.callFake(() => true);
    component.initDate.setValue('new Date()');
    component.endDate.setValue('new Date()');
    component.search = true;
    component.applyFilter(datepicker);
    expect(openGetPayments).not.toHaveBeenCalled();
    expect(component.search).toBe(true);
  });

  it('Should apply filter', () => {
    const datepicker = {
      open: () => true
    };
    const openGetPayments = spyOn(component, 'getPayments').and.callFake(() => true);
    component.initDate.setValue(new Date());
    component.endDate.setValue(new Date());
    component.search = true;
    component.applyFilter(datepicker);
    expect(openGetPayments).toHaveBeenCalled();
    expect(component.search).toBe(false);
  });

  it('Should open datePicker', () => {
    const datepicker = {
      open: () => true
    };
    const openSpy = spyOn(datepicker, 'open').and.callFake(() => true);
    component.openDatePicker(datepicker);
    expect(openSpy).toHaveBeenCalled();
    expect(component.search).toBe(true);
  });

  it('Should return rewardsReportById', () => {
    component.userId = '123';
    component.getPayments();
    expect(component.totalItems).toEqual(mockGetRewardsReportById.objectResponse.generalResumeRewards.total);
  });

  it('Should clean filters', () => {
    const spyInitDateReset = spyOn(component.initDate, 'reset').and.callFake(() => true);
    const spyEndDateReset = spyOn(component.endDate, 'reset').and.callFake(() => true);
    const spyGetPayments = spyOn(component, 'getPayments').and.callFake(() => true);
    component.cleanFilter();
    expect(spyInitDateReset).toHaveBeenCalled();
    expect(spyEndDateReset).toHaveBeenCalled();
    expect(component.search).toBe(true);
    expect(spyGetPayments).toHaveBeenCalled();
  });

  it('Should detectDevice', () => {
    component.detectDevice();
    expect(component.showInfoCard).toBe(true);
  });

  it('Should convert string', () => {
    const text = 'Convert String';
    const formatted = component.convertString(text);
    expect(formatted).toEqual('convertstring');
  });

  it('Should pagination', () => {
    const paginate = 2;
    const spyGetPayments = spyOn(component, 'getPayments').and.callFake(() => true);
    component.pagination(paginate);
    expect(component.pageIndex).toEqual(paginate);
    expect(component.from).toEqual(component.pageSize * component.pageIndex + 1 - 20);
    expect(component.pageTo).toEqual(component.pageSize * (component.pageIndex + 1) - 20);
    expect(spyGetPayments).toHaveBeenCalled();
  });

  it('Should ngOnDestroy', () => {
    const spyBreakpointServiceUnsubscribe = spyOn(component.breakpointService$, 'unsubscribe').and.callFake(() => true);
    component.ngOnDestroy();
    expect(spyBreakpointServiceUnsubscribe).toHaveBeenCalled();
  });

});
