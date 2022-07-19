import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardStoryComponent } from './card-story.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'ngx-sharebuttons';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { of } from 'rxjs/internal/observable/of';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LinksService } from 'src/app/services/links.service';
import { TokenService } from 'src/app/services/token.service';
import { ContentService } from 'src/app/services/content.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CardStoryComponent', () => {
  let component: CardStoryComponent;
  let fixture: ComponentFixture<CardStoryComponent>;

  const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

  const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed', 'componentInstance']);

  const mockLinksService = jasmine.createSpyObj('LinksService', ['saveLink']);

  const mockContentService = jasmine.createSpyObj('ContentService', ['saveVisitStories']);

  const mockTokenService = jasmine.createSpyObj('TokenService', ['userInfo']);

  let userInfo = {
    userName: 'davidbet2@hotmail.com',
    role: 'CLICKER',
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'CLICKER',
    identification: '1124587893',
    firstnames: 'ñañito',
    lastnames: 'betancur',
    documentType: 'CC',
    userid: '77',
    idclicker: 'ñañito andres77',
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': 'davidbet2@hotmail.com',
    exp: 1593636234,
    iss: 'practincanetcore.com',
    aud: 'Estudiantes',
  };

  let story = [
    {
      id: 0,
      idbusiness: 25,
      name: 'Exito',
      businessName: 'Exito',
      infoAditional: '30%',
      image: 'https://www.exito.com/story.jpg',
      businessImage: 'https://www.exito.com/businessimagestory.jpg',
      businessCode: 'exito',
      link: 'https://www.exito.com/story',
      date: new Date(2021, 4, 12),
      stateView: false,
      pause: true,
    },
  ];

  const dialogMock = {
    close: () => {},
  };

  let saveVisitStories = {
    state: 'Success',
    userMessage: 'guardado',
    objectResponse: null,
  };

  const saveLink = {
    state: 'Success',
    userMessage: 'guardado',
    objectResponse: { link: 'https://www.exito.com/story' },
  };

beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [CardStoryComponent, DialogComponent],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
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
      schemas:[NO_ERRORS_SCHEMA],
      providers: [
        { provide: LinksService, useValue: mockLinksService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ContentService, useValue: mockContentService },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockDialog },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogComponent],
        },
      })
      .compileComponents();
    mockLinksService.saveLink.and.returnValue(of(saveLink));
    mockTokenService.userInfo.and.returnValue(userInfo);
    mockContentService.saveVisitStories.and.returnValue(of(saveVisitStories));
  });

  beforeEach(() => {
    localStorage.setItem(
      'ACCESS_TOKEN',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU'
    );
    fixture = TestBed.createComponent(CardStoryComponent);
    component = fixture.componentInstance;
    component.stories = story;
    component.cardOpen = true;
    component.reference = false;
    component.currentSlick = 0;
    component.userId = 20;
    component.id = 'story-0';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('events clicks', () => {
    const button = document.getElementById('story-0');
    button.dispatchEvent(new Event('pointerdown'));
    expect(component.pause).not.toBeTruthy();
    button.dispatchEvent(new Event('onpointerup'));
    expect(component.pause).not.toBeTruthy();
  });

  it('save visit stories', () => {
    component.stories[0].stateView = true;
    component.saveVisitStories(0);
    expect(mockContentService.saveVisitStories).toHaveBeenCalled();
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
    component.urlshorten = 'http://tynyurl.com/xsxsx';
    component.dataSliderCategory();
    expect(mockDialog.open).toBeTruthy();
  });

  it('share mobile', () => {
    component.share();
    expect(component.urlshorten).not.toBeUndefined();
  });

  it('share mobile', () => {
    component.share();
    expect(component.urlshorten).not.toBeUndefined();
  });

  it('Change', () => {
    let datos = true;
    expect(datos).toBeTruthy();
  });

  it('check delete story', () => {
    spyOn(component.checkStory, 'emit');
    component.checkDeleteStory();
    expect(component.checkStory.emit).toHaveBeenCalled();
  });

  it('view story', () => {
    spyOn(component.openStoryCard, 'emit');
    component.viewStory();
    expect(component.openStoryCard.emit).toHaveBeenCalled();
  });

  it('add Event Pause And Play Card', () => {
    component.cardOpen = false;
    component.showCarousel = true;

    component.addEventPauseAndPlayCard();
    expect(component.showCarousel).toEqual(true);
  });
});
