import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksHistorialComponent } from './links-historial.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ClickerModule } from '../../clicker.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LinksService } from 'src/app/services/links.service';
import { of } from 'rxjs/internal/observable/of';
import { UtilsService } from 'src/app/services/utils.service';
import { JwtModule } from '@auth0/angular-jwt';

describe('LinksHistorialComponent', () => {
  let component: LinksHistorialComponent;
  let fixture: ComponentFixture<LinksHistorialComponent>;

  const mockLinksService = jasmine.createSpyObj('LinksService', ['getLinkHistory']);

  let dataHistory = {
    state: 'Success',
    userMessage: '',
    objectResponse: {
      total: 82,
      linkHistory: [
        {
          commission: 0,
          date: '2020-05-08T16:25:56.977',
          link: 'https://webclickamdev.z13.web.core.windows.net/#/url/pe6etseatL',
          productname: '100123688',
          products: 0,
          visits: 0,
        },
      ],
    },
  };

  let historyModal = {
    commission: 0,
    date: '2020-05-08T16:25:56.977',
    link: 'https://webclickamdev.z13.web.core.windows.net/#/url/pe6etseatL',
    productname: '100123688',
    products: 0,
    visits: 0,
  };

  let pagination = {
    pageIndex: 0,
    pageSize: 20,
    length: 80,
  };

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        SharedModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        AppMaterialModule,
        ClickerModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            allowedDomains: [],
            disallowedRoutes: [],
          },
        }),
      ],
      providers: [
        UtilsService,
        { provide: LinksService, useValue: mockLinksService }
      ],
    }).compileComponents();
    mockLinksService.getLinkHistory.and.returnValue(of(dataHistory));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('share mobile', () => {
    component.share();
    expect(component.urlshorten).not.toBeUndefined();
  });

  it('open modal history', () => {
    component.dataHistory(historyModal);
    expect(dataHistory).not.toBeUndefined();
  });

  it('copyInputMessage', () => {
    const button = document.querySelector('#btnCopy');
    button.dispatchEvent(new Event('click'));
    const nativeElementInput = fixture.nativeElement;
    const input = nativeElementInput.querySelector('input');
    expect(input).not.toBeUndefined();
  });
});
