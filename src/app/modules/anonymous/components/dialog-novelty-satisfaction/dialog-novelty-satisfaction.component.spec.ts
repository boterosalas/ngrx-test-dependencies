/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ContentService } from 'src/app/services/content.service';

import { DialogNoveltySatisfactionComponent } from './dialog-novelty-satisfaction.component';

describe('DialogNoveltySatisfactionComponent', () => {
  let component: DialogNoveltySatisfactionComponent;
  let fixture: ComponentFixture<DialogNoveltySatisfactionComponent>;
  const dialogMock = {
    close: () => {},
    backdropClick: () => of(true)
  };
beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNoveltySatisfactionComponent],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: [],
          },
        }),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNoveltySatisfactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.statusForm).toBeTruthy();
    expect(component.$formSubscription).toBeTruthy();
  });

  it(' close dialog', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });

  it('send qualification', () => {
    let spy = spyOn(component.dialogRef, 'backdropClick').and.callThrough();
    component.sendQualification();
    expect(spy).toHaveBeenCalled();
  });
});
