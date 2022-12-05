import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ContentService } from 'src/app/services/content.service';
import { TokenService } from 'src/app/services/token.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { DialogComponent } from '../dialog/dialog.component';

import { BannerPrincipalComponent } from './banner-principal.component';

describe('BannerPrincipalComponent', () => {
  let component: BannerPrincipalComponent;
  let fixture: ComponentFixture<BannerPrincipalComponent>;

  const mockAuthService = jasmine.createSpyObj('AuthService', ['isLoggedIn'], { isLogged$: of(true) });
  const mockUtilsService = jasmine.createSpyObj('UtilsService', ['showloginForm']);
  const mockContentService = jasmine.createSpyObj('ContentService', ['saveVisitOffer','getOffersbyType']);
  const mockTokenService = jasmine.createSpyObj('TokenService', ['userInfo']);

  const banner = {
    imageurlweb: '',
    imageurlmobile: '',
    link: '',
    idbusiness: '',
    business: '',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerPrincipalComponent],
      imports: [
        HttpClientTestingModule,
        AppMaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UtilsService, useValue: mockUtilsService },
        { provide: ContentService, useValue: mockContentService },
        { provide: TokenService, useValue: mockTokenService },
      ],
    }).compileComponents();
    
    
    mockAuthService.isLoggedIn.and.returnValue(true);
    mockUtilsService.showloginForm.and.callFake(() => true);
    mockContentService.saveVisitOffer.and.returnValue(of(true));
    mockContentService.getOffersbyType.and.returnValue(of([banner]));
    mockTokenService.userInfo.and.returnValue({ userid: 123 });
    mockAuthService.isLoggedIn.calls.reset();
    mockUtilsService.showloginForm.calls.reset();
    mockContentService.saveVisitOffer.calls.reset();
    mockTokenService.userInfo.calls.reset();
    
    fixture = TestBed.createComponent(BannerPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call methods in ngAfterViewInit', () => {
    const checkBannerInLocalStorageSpy = spyOn(component, 'checkBannerInLocalStorage').and.callFake(() => true);
    component.ngAfterViewInit();
    expect(checkBannerInLocalStorageSpy).toHaveBeenCalled();
  });

  it('Should set route', () => {
    const link = 'link';
    component.banner.link = link;
    component.route = '';
    component.evaluateBannerBehaviour();
    expect(component.route).toBe(link);
  });

  it('Should set isAnExternalRedirect to true', () => {
    const link = 'link';
    const business = 'clickam';
    component.banner = { link, business };
    component.evaluateBannerBehaviour();
    expect(component.isAnExternalRedirect).toBe(true);
  });

  it('Should not set route', () => {
    component.banner.link = null;
    component.route = null;
    component.evaluateBannerBehaviour();
    expect(component.route).toBe(null);
  });

  it('Should not set isAnExternalRedirect', () => {
    component.isAnExternalRedirect = false;
    const link = 'link';
    const business = 'exito';
    component.banner = { link, business };
    expect(component.isAnExternalRedirect).toBe(false);
  });

  it('Should set banner and call methods in checkBannerInLocalStorage', () => {
    const removeItemSpy = spyOn(localStorage, 'removeItem').and.callFake(() => true);
    const saveVisitSpy = spyOn(component, 'saveVisit').and.callFake(() => true);
    const openShareSpy = spyOn(component, 'openShare').and.callFake(() => true);
    const banner = { banner: 'banner' };
    component.banner = '';
    localStorage.setItem('banner', JSON.stringify(banner));
    component.checkBannerInLocalStorage();
    expect(saveVisitSpy).toHaveBeenCalled();
    expect(openShareSpy).toHaveBeenCalled();
    expect(removeItemSpy).toHaveBeenCalled();
    expect(component.banner).toEqual(banner);
  });

  it('Should not set banner and not call methods in checkBannerInLocalStorage', () => {
    const removeItemSpy = spyOn(localStorage, 'removeItem').and.callFake(() => true);
    const saveVisitSpy = spyOn(component, 'saveVisit').and.callFake(() => true);
    const openShareSpy = spyOn(component, 'openShare').and.callFake(() => true);
    mockAuthService.isLogged$ = of(false);
    component.banner = '';
    component.checkBannerInLocalStorage();
    expect(saveVisitSpy).not.toHaveBeenCalled();
    expect(openShareSpy).not.toHaveBeenCalled();
    expect(removeItemSpy).not.toHaveBeenCalled();
    expect(component.banner).toEqual('');
  });

  it('Should call right methods when is logged in and there is route and is not an external redirect', () => {
    const saveVisitSpy = spyOn(component, 'saveVisit').and.callFake(() => true);
    const openShareSpy = spyOn(component, 'openShare').and.callFake(() => true);
    component.route = 'route';
    component.isAnExternalRedirect = false;
    component.bannerClick();
    expect(saveVisitSpy).toHaveBeenCalled();
    expect(openShareSpy).toHaveBeenCalled();
  });

  it('Should call right methods when is logged in and there is no route and is an external redirect', () => {
    const saveVisitSpy = spyOn(component, 'saveVisit').and.callFake(() => true);
    const openShareSpy = spyOn(component, 'openShare').and.callFake(() => true);
    component.route = '';
    component.isAnExternalRedirect = false;
    component.bannerClick();
    expect(saveVisitSpy).toHaveBeenCalled();
    expect(openShareSpy).not.toHaveBeenCalled();
  });

  it('Should call right methods when is not logged in and there is route and is not an external redirect', () => {
    mockAuthService.isLoggedIn.and.callFake(()=>false);
    const setItemSpy = spyOn(localStorage, 'setItem').and.callFake(() => true);
    component.route = 'route';
    component.isAnExternalRedirect = false;
    component.bannerClick();
    expect(setItemSpy).toHaveBeenCalled();
    expect(mockUtilsService.showloginForm).toHaveBeenCalled();
  });
  
  it('Should not call methods when is not logged in and there is no route and is an external redirect', () => {
    mockAuthService.isLoggedIn.and.callFake(()=>false);
    const setItemSpy = spyOn(localStorage, 'setItem').and.callFake(() => true);
    component.route = '';
    component.isAnExternalRedirect = true;
    component.bannerClick();
    expect(setItemSpy).not.toHaveBeenCalled();
    expect(mockUtilsService.showloginForm).not.toHaveBeenCalled();
  });

  it('Should call saveVisit with right params', () => {
    component.banner.id = 123;
    component.saveVisit();
    expect(mockContentService.saveVisitOffer).toHaveBeenCalledWith({idoffer:123, userId: 123})
  });

  it('Should open dialog with right params', () => {
    const openSpy = spyOn((<any>component).dialog,'open').and.callFake(()=>true);
    const banner = {
      description: 'description',
      infoaditional: 'infoaditional',
      imageurlweb: 'imageurlweb',
      id: 123
    };
    const data = {
      title: banner.description,
      template: component.modalReferirComprarTemplate,
      showClose: false,
      showCloseIcon: true,
      infoaditional: banner.infoaditional,
      img: banner.imageurlweb,
      showProduct: true,
      showshowTitle: false,
      buttonClose: 'Cerrar',
      id: banner.id,
      home: true,
    };
    component.openShare(banner);
    expect(openSpy).toHaveBeenCalledWith(DialogComponent,{data})
  });

  it('Should call unsubscribe ngOnDestroy', () => {
    const isLoggedSpy = spyOn(component.isLogged$,'unsubscribe').and.callFake(()=>true);
    const saveVisitOfferSpy = spyOn(component.saveVisitOffer$,'unsubscribe').and.callFake(()=>true);
    component.ngOnDestroy();
    expect(isLoggedSpy).toHaveBeenCalled();
    expect(saveVisitOfferSpy).toHaveBeenCalled();
  });


});
