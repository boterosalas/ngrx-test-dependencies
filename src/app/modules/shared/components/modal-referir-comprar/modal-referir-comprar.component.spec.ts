import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { LinksService } from 'src/app/services/links.service';
import { TokenService } from 'src/app/services/token.service';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ModalReferirComprarComponent } from './modal-referir-comprar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateFormat } from '../../helpers/date-format';

describe('ModalReferirComprarComponent', () => {
  let component: ModalReferirComprarComponent;
  let fixture: ComponentFixture<ModalReferirComprarComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['saveMission']);
  const mockTokenService = jasmine.createSpyObj('TokenService', ['userInfo']);
  const mockLinkService = jasmine.createSpyObj('LinkService', ['saveLink']);
  const mockNavigator = jasmine.createSpyObj('navigator', [''], { userAgent: 'iPod' });

  const saveLinkResponse = {
    objectResponse: {
      link: 'https://www.clickam.com.co'
    },
    state: 'Error'
  };

  const userInfoResponse = { identification: '123' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalReferirComprarComponent],
      imports: [
        ReactiveFormsModule,
        AppMaterialModule,
        TranslateModule.forRoot({}),
        BrowserAnimationsModule
      ],
      providers: [
        TranslateService,
        { provide: ContentService, useValue: mockContentService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: LinksService, useValue: mockLinkService },
        { provide: navigator, useValue: mockNavigator }
      ]
    })
      .compileComponents();

    mockContentService.saveMission.and.callFake(() => of(true));
    mockTokenService.userInfo.and.callFake(() => userInfoResponse);
    mockLinkService.saveLink.and.callFake(() => of(saveLinkResponse));

    fixture = TestBed.createComponent(ModalReferirComprarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should init component', () => {
    const initGtmClassesSpy = spyOn(component, 'initGtmClasses').and.callFake(() => true);
    component.identification = '';
    component.ngOnInit();
    expect(mockTokenService.userInfo).toHaveBeenCalled();
    expect(component.identification).toBe(userInfoResponse.identification);
    expect(component.idCustomerForm).toBeTruthy();
    expect(component.formLink).toBeTruthy();
    expect(initGtmClassesSpy).not.toHaveBeenCalled();
  });

  it('Should call initGtmClassesSpy in ngOnInit', () => {
    const initGtmClassesSpy = spyOn(component, 'initGtmClasses').and.callFake(() => true);
    component.banner = 'banner';
    component.ngOnInit();
    expect(initGtmClassesSpy).toHaveBeenCalled();
  });

  it('Should set right params in initGtmClasses', () => {
    const saveLinkSpy = spyOn(component, 'saveLink').and.callFake(() => true);
    const category = {
      business: 'business',
      description: 'description',
      link: 'link',
      idbusiness: 'idbusiness'
    }
    component.initGtmClasses(category);
    expect(component.classButtonCopy).toBe(`gtmClicLightboxCopiarLink${category.business}${category.description}`)
    expect(component.classButtonRefer).toBe(`gtmClicLightboxReferir${category.business}${category.description}`)
    expect(component.classButtonBuy).toBe(`gtmClicLightboxComprar${category.business}${category.description}`)
    expect(component.classButtonShare).toBe(`gtmClicLightboxCompartir${category.business}${category.description}`)
    expect(component.classButtonFacebook).toBe(`gtmClicLightboxIconoFacebook${category.business}${category.description}`)
    expect(component.classButtonTwitter).toBe(`gtmClicLightboxIconoTwitter${category.business}${category.description}`)
    expect(component.classButtonWhatsapp).toBe(`gtmClicLightboxIconoWhatsApp${category.business}${category.description}`)
    expect(component.url).toBe(category.link)
    expect(component.plu).toBe(category.description)
    expect(component.bussiness).toBe(category.idbusiness)
    expect(saveLinkSpy).toHaveBeenCalled();
  });

  it('Should copyInputMessage run right', () => {
    const input = {
      select: () => true,
      setSelectionRange: () => true
    }
    const selectSpy = spyOn(input, 'select').and.callFake(() => true);
    const setSelectionRangeSpy = spyOn(input, 'setSelectionRange').and.callFake(() => true);
    const openSnackBarSpy = spyOn((<any>component), 'openSnackBar').and.callFake(() => true);
    component.copyInputMessage(input);
    expect(selectSpy).toHaveBeenCalled();
    expect(setSelectionRangeSpy).toHaveBeenCalled();
    expect(openSnackBarSpy).toHaveBeenCalled();
  });

  it('Should call _snackBar.open in component.openSnackBar', () => {
    const message = 'message';
    const action = 'action';
    const openSpy = spyOn((<any>component)._snackBar, 'open').and.callFake(() => true);
    (<any>component).openSnackBar(message, action);
    expect(openSpy).toHaveBeenCalledWith(message, action, { duration: 5000 });
  });

  it('Should call ngNavigatorShareService and resolve promise', (done) => {
    const urlShorten = 'urlShorten';
    component.urlshorten = urlShorten;
    const shareSpy = spyOn((<any>component).ngNavigatorShareService, 'share').and.returnValue(Promise.resolve(true));
    const consoleLogspy = spyOn(console, 'log').and.callFake(() => true);
    component.share();
    shareSpy.calls.mostRecent().returnValue.then(() => {
      expect(consoleLogspy).toHaveBeenCalled();
      done();
    });
    expect(shareSpy).toHaveBeenCalledWith({ title: '', text: '', url: urlShorten });
  });

  it('Should call ngNavigatorShareService and reject promise', <any>fakeAsync(() => {
    const urlShorten = 'urlShorten';
    component.urlshorten = urlShorten;
    const shareSpy = spyOn((<any>component).ngNavigatorShareService, 'share').and.returnValue(Promise.reject(true));
    const consoleLogspy = spyOn(console, 'log').and.callFake(() => true);
    component.share();
    tick(10);
    expect(consoleLogspy).toHaveBeenCalled();
    expect(shareSpy).toHaveBeenCalledWith({ title: '', text: '', url: urlShorten });
  }));

  it('Should saveLink', <any>fakeAsync(() => {
    const url = 'url';
    const identification = 'identification';
    const plu = 'plu';
    const bussiness = 'bussiness';
    const identificacionValue = 'identificacionValue';
    component.urlshorten = null;
    component.url = url;
    component.identification = identification;
    component.plu = plu;
    component.bussiness = bussiness;
    component.idCustomerForm = new FormGroup({
      identification: new FormControl(identificacionValue)
    })
    const data = {
      link: url,
      identification: identification,
      plu: plu,
      business: bussiness,
      creationDate: DateFormat.format(new Date(), 'YYYY-MM-DD HH:MM'),
      identificationcustomer: identificacionValue,
    };
    component.saveLink();
    tick(10);
    expect(mockLinkService.saveLink).toHaveBeenCalledWith(data);
    expect(component.urlshorten).toBeTruthy();
    expect(component.enableCopy).toBe(false);
  }));

  it('Should saveLink "assured" param', <any>fakeAsync(() => {
    const identificacionValue = 'identificacionValue';
    component.urlshorten = null;
    component.url = 'url';
    component.identification = 'identification';
    component.plu = 'plu';
    component.bussiness = 'bussiness';
    component.idCustomerForm = new FormGroup({
      identification: new FormControl(identificacionValue)
    });
    const openSnackBarSpy = spyOn((<any>component),'openSnackBar').and.callFake(()=>true);
    component.saveLink('assured');
    tick(10);
    expect(mockLinkService.saveLink).toHaveBeenCalled();
    expect(component.urlshorten).toBeTruthy();
    expect(component.enableCopy).toBe(false);
    expect(openSnackBarSpy).toHaveBeenCalled();
    expect(component.showForm).toBe(false);
    expect(component.showFormCustomer).toBe(true);
  }));

  it('Should toggle reference and showForm', () => {
    component.reference = true;
    component.showForm = true;
    component.backStep();
    expect(component.reference).toBe(false);
    expect(component.showForm).toBe(false);
  });

  it('Should unsubscribe Subscription objects', () => {
    const saveMission$Spy = spyOn(component.saveMission$, 'unsubscribe').and.callFake(() => true);
    const saveLink$Spy = spyOn(component.saveLink$, 'unsubscribe').and.callFake(() => true);
    const saveLinkReference$Spy = spyOn(component.saveLinkReference$, 'unsubscribe').and.callFake(() => true);
    component.ngOnDestroy();
    expect(saveMission$Spy).toHaveBeenCalled();
    expect(saveLink$Spy).toHaveBeenCalled();
    expect(saveLinkReference$Spy).toHaveBeenCalled();
  })


});
