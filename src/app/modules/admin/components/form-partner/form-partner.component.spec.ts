import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UserService } from 'src/app/services/user.service';

import { FormPartnerComponent } from './form-partner.component';

export class MatDialogMock {
  close() {}
  closeAll() {
    return {
      closeAll: () => of(true),
    };
  }
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}

describe('FormPartnerComponent', () => {
  let component: FormPartnerComponent;
  let fixture: ComponentFixture<FormPartnerComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['addUserAdmin']);

  const partner = {
    userId: 220,
    adminUserId: 711,
    email: 'eisner271190a@gmail.com',
    firstNames: 'Eisner',
    lastNames: 'Puerta',
    password: 'RXBjMTUyNygpOw==',
    rol: 'PARTNER',
    idBusiness: 53,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPartnerComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        SharedModule,
        RouterTestingModule,
        TranslateModule.forRoot({}),
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
        { provide: MatDialogRef, useValue: MatDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();
    mockUserService.addUserAdmin.and.returnValue(of(partner));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save partner', () => {
    component.savePartner();
    expect(mockUserService.addUserAdmin).toHaveBeenCalled();
  });
});
