import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoHomeCardComponent } from './video-home-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VideoHomeCardComponent', () => {
  let component: VideoHomeCardComponent;
  let fixture: ComponentFixture<VideoHomeCardComponent>;
  const mockContentService = jasmine.createSpyObj('ContentService', ['getOffersbyType']);
  const mockBreakpointService = jasmine.createSpyObj('BreakpointService', ['isWidthLessThanBreakpoint']);
  const mockVideoHome = { "imageurlweb": "https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/20230104135841_web.jpg", "business": "negocio72", "idbusiness": 72, "infoaditional": "", "type": "VIDEOHOME", "date": "2023-01-04T13:58:41.143", "orderby": 0, "active": true, "imagemobile": null, "imageweb": null, "datestart": "2023-01-11T00:00:00", "id": 267, "description": "Aless prueba", "link": "/aless?utm_source=clickam&utm_medium=referral&utm_campaign={1}", "imageurlmobile": "https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-mobile/20230104135841_mobile.jpg", "dateend": null, "textbutton": null, "colorbutton": null, "seccion": null, "new": false, "clicks": 0, "uniqueclicks": 0, "filter": "TODOS" };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VideoHomeCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ContentService, usevalue: mockContentService },
        { provide: BreakpointService, usevalue: mockBreakpointService }
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
    mockContentService.getOffersbyType.and.callFake(() => of([mockVideoHome]));
    mockBreakpointService.isWidthLessThanBreakpoint.and.callFake(() => of(true));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoHomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should ongInit', () => {
    const spyGetVideoHome = spyOn(component, 'getVideoHome').and.callFake(() => true);
    component.ngOnInit();
    expect(spyGetVideoHome).toHaveBeenCalled();
  });
});