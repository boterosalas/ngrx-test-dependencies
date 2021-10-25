import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { of } from 'rxjs/internal/observable/of';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

import { VerificationComponent } from './verification.component';


export class MatDialogMock {
  close: () => {};
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}

describe('VerificationComponent', () => {
  let component: VerificationComponent;
  let fixture: ComponentFixture<VerificationComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['getStatusVerification', 'verifiedUser', 'postUpdateResponseAccountBank']);
  const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed', 'componentInstance', 'event ', 'beforeClosed']);

  const data = {
    verified: true,
    responseaccountbank: ''
  }

  const response = {
    objectResponse: [
      { id: 4264, code: 'NOTVERIFIED', value: 'No verificada' },
    ],
    state: 'Success',
    userMessage: null,
  };

  const response2 = {
    objectResponse: [
      { id: 4264, code: 'REJECTED', value: 'No verificada' },
    ],
    state: 'Success',
    userMessage: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificationComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        AppMaterialModule,
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
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        UtilsService,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: UserService, useValue: mockUserService },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationComponent);
    component = fixture.componentInstance;
    component.accountStatements = response.objectResponse;
    mockUserService.getStatusVerification.and.returnValue(of(response.objectResponse));
    component.data = data;
    spyOn(component, 'ngOnChanges').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('change verified', () => {
    mockUserService.verifiedUser.and.returnValue(of(response));
    component.changeVerified();
    expect(mockUserService.verifiedUser).toHaveBeenCalled();
  });

  it('editRejectionMessage', () => {
    component.editRejectionMessage();
    expect(component.templateRejectionMessage).toBeDefined();
  });

  it('saveRejectionMessage', () => {
    mockUserService.postUpdateResponseAccountBank.and.returnValue(of(response));
    component.saveRejectionMessage();
    expect(mockUserService.postUpdateResponseAccountBank).toHaveBeenCalled();
  });

  it('select change otro', () => {
    const val = {
      value: 'Otro'
    }
    component.selectMessage(val);
    expect(component.showOther).toBeTruthy();
  });

  it('select change', () => {
    const val = {
      value: 'prueba'
    }
    component.selectMessage(val);
    expect(component.showOther).toBeFalsy();
  });

});
