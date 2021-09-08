import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from './slider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContentService } from 'src/app/services/content.service';
import { of } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from '@ngx-share/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LinksService } from 'src/app/services/links.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialogRef } from '@angular/material/dialog';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['getNews']);

  // const mockUserService = jasmine.createSpyObj("UserService", ["getShortUrl"]);

  const mockLinksService = jasmine.createSpyObj('LinksService', ['saveLink']);

  const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

  const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed', 'componentInstance']);

  const resp = {
    state: 'Success',
    userMessage: 'se ha guardado el link',
    objectResponse: {
      id: 2656,
      link: 'http://tinyurl.com/t7c5ouj',
      creationDate: '2020-04-03T12:07:15.3146043-05:00',
      userId: 220,
      plu: 'C-HOME',
      business: '1',
      identification: null,
    },
  };

  let news = [
    {
      id: 1,
      code: 'exito',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.png',
      infoaditional: 'Hasta 9.6% de ganancia',
      description: 'Almacenes Éxito',
      orderby: 1,
    },
    {
      id: 2,
      code: 'carulla',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-carulla.png',
      infoaditional: 'Hasta 9.6% de ganancia',
      description: 'Almacenes Carulla',
      orderby: 2,
    },
    {
      id: 3,
      code: 'seguros',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-seguros.png',
      infoaditional: 'Hasta $32.000 de ganancia',
      description: 'Seguros Éxito',
      orderby: 3,
    },
    {
      id: 4,
      code: 'viajes',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-viajes.png',
      infoaditional: 'Hasta $40.000 de ganancia',
      description: 'Viajes Éxito',
      orderby: 4,
    },
    {
      id: 5,
      code: 'wesura',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-wesura.png',
      infoaditional: 'Hasta 12.000 de ganancia',
      description: 'Tu seguro',
      orderby: 5,
    },
  ];

  let categorys = {
    id: 1,
    ordercategory: 1,
    link: 'https://www.exito.com/home-mercado?utm_source=clickam&utm_medium=referral&utm_campaign=hoteles&utm_term=',
    imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-categories/mercado.png',
    description: 'Mercado',
    oncreatedate: '2019-11-18T00:00:00',
    title: 'Mercado',
  };

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SliderComponent],
      imports: [
        SlickCarouselModule,
        HttpClientTestingModule,
        FlexLayoutModule,
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        ShareModule,
        SharedModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: [],
          },
        }),
      ],
      providers: [
        { provide: ContentService, useValue: mockContentService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockDialog },
        { provide: LinksService, useValue: mockLinksService },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogComponent],
        },
      })
      .compileComponents();
    mockContentService.getNews.and.returnValue(of(news));
    mockLinksService.saveLink.and.returnValue(of(resp));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save link', () => {
    component.urlshorten = 'https://tyny.url/xaxa';
    component.identification = '123456789';
    component.plu = '123456';
    component.business = 'exito';
    component.date = '2019/09/09';
    component.saveLink();
    expect(mockLinksService.saveLink).toHaveBeenCalled();
  });

  it('save link with param', () => {
    component.urlshorten = 'https://tyny.url/xaxa';
    component.identification = '123456789';
    component.plu = '123456';
    component.business = 'exito';
    component.date = '2019/09/09';
    component.saveLink('assured');
    expect(mockLinksService.saveLink).toHaveBeenCalled();
  });

  it('save reference', () => {
    component.urlshorten = 'https://tyny.url/xaxa';
    component.identification = '123456789';
    component.plu = '123456';
    component.business = 'exito';
    component.date = '2019/09/09';
    component.saveLinkReference();
    expect(mockLinksService.saveLink).toHaveBeenCalled();
  });

  it('showReference', () => {
    component.reference = false;
    component.showReference();
    expect(component.reference).toBeTruthy();
  });

  it('data category', () => {
    component.dataCategory(categorys);
    expect(mockDialog.open).toBeTruthy();
  });

  it('copyInputMessage', () => {
    const button = document.querySelector('#btnCopy');
    button.dispatchEvent(new Event('click'));
    const nativeElementInput = fixture.nativeElement;
    const input = nativeElementInput.querySelector('input');
    expect(input).not.toBeUndefined();
  });

  it('share mobile', () => {
    component.share();
    expect(component.urlshorten).not.toBeUndefined();
  });

  // it('buy', () => {
  //   component.buy();
  // });

  it('next step', () => {
    component.urlshorten = 'http://tynyurl.com/xsxsx';
    component.nextStep();
    expect(component.showForm).toBeTruthy();
  });

  it('back step', () => {
    component.urlshorten = 'http://tynyurl.com/xsxsx';
    component.showForm = true;
    component.reference = false;
    component.backStep();
    expect(component.showForm).toBeFalsy();
    expect(component.reference).toBeTruthy();
  });

  it('openshare', () => {
    component.openShare();
    expect(component.urlshorten).not.toBeUndefined();
  });
  it('Change', () => {
    let datos = true;
    expect(datos).toBeTruthy();
  });
});
