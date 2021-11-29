import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { AuthService } from 'src/app/services/auth.service';

import { PreferencesComponent } from './preferences.component';

const mockAuthService = jasmine.createSpyObj('AuthService', ['changePassword']);

export class MatDialogMock {
  close: () => {};
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


describe('PreferencesComponent', () => {
  let component: PreferencesComponent;
  let fixture: ComponentFixture<PreferencesComponent>;

  const matDialog = new MatDialogMock();

  const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

  const resp = {
    state: 'Success',
    userMessage: 'se ha actualizado el usuario',
    objectResponse: [],
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferencesComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        AppMaterialModule,
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
        { provide: MatDialog, useValue: matDialog },
        { provide: AuthService, useValue: mockAuthService },
        { provide: MatDialogRef, useValue: mockDialog },
      ]
    })
    .compileComponents();
    mockAuthService.changePassword.and.returnValue(of(resp));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changePasswordUser', () => {
    component.changePasswordUser();
    expect(mockAuthService.changePassword).toHaveBeenCalled();
  });

  it('changePassword', () => {
    component.changePassword();
    expect(mockDialog.open).toBeTruthy();
  });

});
