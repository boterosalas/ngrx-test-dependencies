import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { LinksService } from 'src/app/services/links.service';

import { CardOrderNumberComponent } from './card-order-number.component';

describe('CardOrderNumberComponent', () => {
  let component: CardOrderNumberComponent;
  let fixture: ComponentFixture<CardOrderNumberComponent>;

  let mockLinksService = jasmine.createSpyObj('LinksService', ['getOrderNumber']);

  let orderNumber = {
    state: 'Success',
    userMessage: 'El número de la orden no existe',
    objectResponse: 'Este número de orden esta erróneo o no existe un registro en las bases del aliado con este número.',
  };

beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [CardOrderNumberComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: LinksService, useValue: mockLinksService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOrderNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('consult number', () => {
    mockLinksService.getOrderNumber.and.returnValue(of(orderNumber));
    component.consultOrder();
    expect(mockLinksService.getOrderNumber).toHaveBeenCalled();
  });
});
