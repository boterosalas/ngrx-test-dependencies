import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SocialNetworksLoginButtonsComponent } from './social-networks-login-buttons.component';

describe('SocialNetworksLoginButtonsComponent', () => {
  let component: SocialNetworksLoginButtonsComponent;
  let fixture: ComponentFixture<SocialNetworksLoginButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialNetworksLoginButtonsComponent],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SocialNetworksLoginButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call fbInit when ngAfterViewInit', () => {
    const fbInitSpy = spyOn(component, 'fbInit').and.callFake(() => true);
    component.ngAfterViewInit();
    expect(fbInitSpy).toHaveBeenCalled();
  });

  it('Should facebookEmit', () => {
    const emitSpy = spyOn(component.user, 'emit').and.callFake(() => true);
    component.facebookEmit('');
    expect(emitSpy).toHaveBeenCalled();
  });

  it('Should googleLoginCallback', () => {
    const emitSpy = spyOn(component.user, 'emit').and.callFake(() => true);
    component.isLogin = true;
    const response = { access_token: '123' };
    const tokenResponse = {
      email: 'email',
      given_name: 'given_name',
      family_name: 'family_name'
    }
    const checkAccessTokenSpy = spyOn((<any>component).httpClient, 'get').and.callFake(() => of(tokenResponse))
    component.googleLoginCallback(response);
    expect(emitSpy).toHaveBeenCalledWith({
      token: response.access_token,
      username: tokenResponse.email,
    });
    expect(checkAccessTokenSpy).toHaveBeenCalled();
  });

  it('Should googleLoginCallback', () => {
    const emitSpy = spyOn(component.user, 'emit').and.callFake(() => true);
    component.isLogin = false;
    const response = { access_token: '123' };
    const tokenResponse = {
      email: 'email',
      given_name: 'given_name',
      family_name: 'family_name'
    }
    const checkAccessTokenSpy = spyOn((<any>component).httpClient, 'get').and.callFake(() => of(tokenResponse))
    component.googleLoginCallback(response);
    expect(emitSpy).toHaveBeenCalledWith({
      email: tokenResponse.email,
      firstName: tokenResponse.given_name,
      lastName: tokenResponse.family_name,
      origin: 'GOOGLE',
      token: response.access_token,
    });
    expect(checkAccessTokenSpy).toHaveBeenCalled();
  });
});
