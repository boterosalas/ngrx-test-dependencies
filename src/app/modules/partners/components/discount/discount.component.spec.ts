import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import decode from 'jwt-decode';
import { of } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';

import { DiscountComponent } from './discount.component';

describe('DiscountComponent', () => {
  let component: DiscountComponent;
  let fixture: ComponentFixture<DiscountComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['getUserPhygital']);
  const mockContentService = jasmine.createSpyObj('ContentService', ['getShopsWithDefault', 'calculateDiscount']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({})
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ContentService, useValue: mockContentService },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set validUser to false', <any>fakeAsync(() => {
    const response = {
      state: 'Error',
      userMessage: 'ErrorMessage'
    };
    mockUserService.getUserPhygital.and.callFake(() => of(response));
    component.validate();
    tick(10);
    expect(component.validUser).toBe(false);
  }));

  it('Should set validUser to true', <any>fakeAsync(() => {
    const response = {
      state: null,
      userMessage: 'ErrorMessage'
    };
    const getShopsSpy = spyOn(component, 'getShops').and.callFake(() => true);
    mockUserService.getUserPhygital.and.callFake(() => of(response));
    component.validate();
    tick(10);
    expect(getShopsSpy).toHaveBeenCalled();
    expect(component.validUser).toBe(true);
  }));

  it('Should get shops and set info', <any>fakeAsync(() => {
    const response = {
      'Medellín': [],
      'Bogotá': [],
      'Cali': [],
    }
    const shopControlChangeSpy = spyOn(component.valueForm.controls.shopControl, 'setValue').and.callFake(() => true);
    mockContentService.getShopsWithDefault.and.callFake(() => of(response));
    component.getShops(1, 1);
    tick(10);
    expect(component.cityNames).toEqual(Object.keys(response));
    expect(component.salesObjectGroupByCities).toEqual(response);
    expect(shopControlChangeSpy).not.toHaveBeenCalled();
  }));

  it('Should return the default shop', () => {
    const defaultShop = { name: 'Default', isdefault: true }
    const response = {
      'Medellín': [{ name: '1', isdefault: false }, { name: '2', isdefault: false }],
      'Bogotá': [{ name: '3', isdefault: false }, { name: '4', isdefault: false }],
      'Cali': [{ name: '5', isdefault: false }, { name: '6', isdefault: false }, defaultShop],
    };
    const shopReturned = component.getDefaultSale(response);
    expect(shopReturned).toEqual(defaultShop);
  });

  it('Should not return default shop', () => {
    const response = {
      'Medellín': [{ name: '1', isdefault: false }, { name: '2', isdefault: false }],
      'Bogotá': [{ name: '3', isdefault: false }, { name: '4', isdefault: false }],
      'Cali': [{ name: '5', isdefault: false }, { name: '6', isdefault: false }],
    };
    const shopReturned = component.getDefaultSale(response);
    expect(shopReturned).toBe(undefined);
  });

  it('Should not calculateDiscount', () => {
    const discount = '0';
    const total = '0';
    const showResults = false;
    const valoriva = '0';
    const valorAntesIva = '0';
    const ivaIncluido = false;
    component.discount = discount;
    component.total = total;
    component.showResults = showResults;
    component.valoriva = valoriva;
    component.valorAntesIva = valorAntesIva;
    component.ivaIncluido = ivaIncluido;
    component.calculateDiscount();
    expect(component.discount).toBe(discount);
    expect(component.total).toBe(total);
    expect(component.showResults).toBe(showResults);
    expect(component.valoriva).toBe(valoriva);
    expect(component.valorAntesIva).toBe(valorAntesIva);
    expect(component.ivaIncluido).toBe(ivaIncluido);
  });

  it('Should calculateDiscount', () => {
    component.valueForm.controls.value.setValue('123')
    const response = {
      percentage: '0',
      total: '0',
      valoriva: '0',
      valorAntesIva: '0',
      ivaIncluido: false,
    }
    mockContentService.calculateDiscount.and.callFake(() => of(response));
    component.calculateDiscount();
    expect(component.discount).toBe(response.percentage);
    expect(component.total).toBe(response.total);
    expect(component.showResults).toBe(true);
    expect(component.valoriva).toBe(response.valoriva);
    expect(component.valorAntesIva).toBe(response.valorAntesIva);
    expect(component.ivaIncluido).toBe(response.ivaIncluido);
  });


});
