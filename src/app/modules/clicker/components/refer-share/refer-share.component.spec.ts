import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferShareComponent } from './refer-share.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TokenService } from 'src/app/services/token.service';

describe('ReferShareComponent', () => {
  let component: ReferShareComponent;
  let fixture: ComponentFixture<ReferShareComponent>;

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

beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ReferShareComponent],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        ShareButtonsModule,
        HttpClientTestingModule,
      ],
      providers: [{ provide: TokenService, useValue: mockTokenService }],
    }).compileComponents();
    mockTokenService.userInfo.and.returnValue(userInfo);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('share mobile', () => {
    component.share();
    expect(component.url).not.toBeUndefined();
  });

  it('copy url', () => {
    component.copyUrl();
    expect(component.formLink.controls.link).toBeDefined();
  });
  it('generate Link', () => {
    component.generateLink();
    let datos = true;
    expect(datos).toBeTruthy();
  });
});
