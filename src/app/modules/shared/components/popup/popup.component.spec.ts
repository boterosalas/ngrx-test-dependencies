import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { PopupComponent } from './popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContentService } from 'src/app/services/content.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { of } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';

const dataFake = [
  { "imageurlweb": "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-offers-web/20221025123237_web.jpg", "business": "exito", "idbusiness": 1, "infoaditional": "", "type": "POPUP", "date": "2022-10-23T04:15:19.133", "orderby": 0, "active": true, "imagemobile": null, "imageweb": null, "datestart": null, "id": 158, "description": "Viajes", "link": "https://www.viajesexito.com/vuelos2?utm_source=clickam&utm_medium=referral&utm_campaign=vuelos&utm_term={1}&utm_source=clickam&utm_medium=referral&utm_campaign={1}", "imageurlmobile": "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-offers-mobile/20221025123237_mobile.jpg", "dateend": null, "textbutton": "11", "colorbutton": "#FFAF51", "seccion": "/negocios", "new": false, "clicks": 91, "uniqueclicks": 1, "filter": "TODOS" },
  { "imageurlweb": "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-offers-web/20221025123254_web.jpg", "business": "exito", "idbusiness": 1, "infoaditional": "", "type": "POPUP", "date": "2022-10-23T04:17:43.833", "orderby": 0, "active": true, "imagemobile": null, "imageweb": null, "datestart": null, "id": 159, "description": "Viajes", "link": "https://www.viajesexito.com/vuelos2?utm_source=clickam&utm_medium=referral&utm_campaign=vuelos&utm_term={1}&utm_source=clickam&utm_medium=referral&utm_campaign={1}", "imageurlmobile": "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-offers-mobile/20221025123254_mobile.jpg", "dateend": null, "textbutton": "12:00 AM", "colorbutton": "#FFAF51", "seccion": "/negocios", "new": false, "clicks": 47, "uniqueclicks": 1, "filter": "TODOS" },
  { "imageurlweb": "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-offers-web/20221025123102_web.jpg", "business": "exito", "idbusiness": 1, "infoaditional": "", "type": "POPUP", "date": "2022-10-23T04:18:09.303", "orderby": 0, "active": true, "imagemobile": null, "imageweb": null, "datestart": null, "id": 160, "description": "Viajes", "link": "https://www.viajesexito.com/vuelos2?utm_source=clickam&utm_medium=referral&utm_campaign=vuelos&utm_term={1}&utm_source=clickam&utm_medium=referral&utm_campaign={1}", "imageurlmobile": "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-offers-mobile/20221025123102_mobile.jpg", "dateend": null, "textbutton": "Panel", "colorbutton": "#37236A", "seccion": "/inicio", "new": false, "clicks": 33, "uniqueclicks": 2, "filter": "TODOS" },
  { "imageurlweb": "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-offers-web/20221025113502_web.jpg", "business": "exito", "idbusiness": 1, "infoaditional": "", "type": "POPUP", "date": "2022-10-25T11:35:02.163", "orderby": 0, "active": true, "imagemobile": null, "imageweb": null, "datestart": null, "id": 169, "description": "Pokemon", "link": "pokemon?utm_source=clickam&utm_medium=referral&utm_campaign={1}", "imageurlmobile": "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-offers-mobile/20221025113502_mobile.jpg", "dateend": null, "textbutton": "pokemon", "colorbutton": "#FF3F4C", "seccion": "/inicio", "new": false, "clicks": 16, "uniqueclicks": 2, "filter": "TODOS" },
  { "imageurlweb": "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-offers-web/20221025114404_web.jpg", "business": "exito", "idbusiness": 1, "infoaditional": "", "type": "POPUP", "date": "2022-10-25T11:44:04.573", "orderby": 0, "active": true, "imagemobile": null, "imageweb": null, "datestart": null, "id": 170, "description": "Eisner", "link": "eisner?utm_source=clickam&utm_medium=referral&utm_campaign={1}", "imageurlmobile": "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-offers-mobile/20221025114404_mobile.jpg", "dateend": null, "textbutton": "eisner", "colorbutton": "#FF3F4C", "seccion": "/inicio", "new": false, "clicks": 11, "uniqueclicks": 1, "filter": "TODOS" }, { "imageurlweb": "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-offers-web/20221026192041_web.jpg", "business": "exito", "idbusiness": 1, "infoaditional": "", "type": "POPUP", "date": "2022-10-26T19:20:41.163", "orderby": 0, "active": true, "imagemobile": null, "imageweb": null, "datestart": null, "id": 173, "description": "Devices", "link": "/inicio?utm_source=clickam&utm_medium=referral&utm_campaign={1}", "imageurlmobile": "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-offers-mobile/20221026192041_mobile.jpg", "dateend": null, "textbutton": "Devices", "colorbutton": "#8D7EB7", "seccion": "/inicio", "new": false, "clicks": 0, "uniqueclicks": 0, "filter": "TODOS" }
]

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  const mockContentService = jasmine.createSpyObj('ContentService', ['getPopup', 'saveVisitOffer']);
  const mockBreakPointService = jasmine.createSpyObj('BreakpointService', ['isWidthLessThanBreakpoint']);

  const dialogMock = {
    close: () => { },
    beforeClosed: () => of()
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PopupComponent],
      imports: [
        AppMaterialModule,
        HttpClientTestingModule,
        SlickCarouselModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dataFake },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: ContentService, useValue: mockContentService },
        { provide: BreakpointService, useValue: mockBreakPointService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    mockContentService.saveVisitOffer.and.returnValue(of(true));
    mockBreakPointService.isWidthLessThanBreakpoint.and.returnValue(of(false));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set element.new to true', () => {
    component.currentId = 158;
    component.saveVisitOffer();
    const element = component.data.find(elem=>elem.id === 158)
    expect(element.new).toBeTrue();
  });

  it('Should call slickNext', () => {
    const nextSpy = spyOn(component.slickModal,'slickNext').and.callFake(()=>true);
    component.next();
    expect(nextSpy).toHaveBeenCalled();
  });

  it('Should call slickPrev', () => {
    const prevSpy = spyOn(component.slickModal,'slickPrev').and.callFake(()=>true);
    component.prev();
    expect(prevSpy).toHaveBeenCalled();
  });

  it('Should call dialogRef.close', () => {
    const closeSpy = spyOn(dialogMock,'close').and.callFake(()=>true);
    component.closeMatDialog();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('Should set isMobile to false', () => {
    component.breakpoint();
    expect(component.isMobile).toBeFalse();
  });

});
