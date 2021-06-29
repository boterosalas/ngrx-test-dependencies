import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewsComponent } from './dialog-news.component';


import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

describe('DialogNewsComponent', () => {
  let component: DialogNewsComponent;
  let fixture: ComponentFixture<DialogNewsComponent>;
  const dialogMock = {
    close: () => { }
  };
  const mockUserService = jasmine.createSpyObj("UserService", [
    "setStatus"
  ]);
  const dataResp = {
    state: "Success"
  }
  const data = { element: { id: 1, documenturl: "http/archivo.jpg", statusnovelty: "Pendiente" }}

  const mockDialog = jasmine.createSpyObj("MatDialog", ["open", "closeAll"]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNewsComponent],
      imports: [
        AppMaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,

        RouterTestingModule.withRoutes([]),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MatDialog, useValue: mockDialog },
        { provide: UserService, useValue: mockUserService },
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
    mockUserService.setStatus.and.returnValue(of(dataResp));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.data = { element: { id: 1, documenturl: "http/archivo.jpg" } }
    expect(component).toBeTruthy();
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
    component.saveChanges();
    expect(mockUserService.setStatus).toHaveBeenCalled();
    component.onChangeSelected("Pendiente")
  })

  it('image not data', () => {
    component.image = '';
    component.viewerImage();
    expect(mockDialog.open).toBeTruthy();
  });
  

});
