import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { UserService } from 'src/app/services/user.service';

import { FormCampaignComponent } from './form-campaign.component';

export class MatDialogMock {
  open() {
    return {
      beforeClosed: () => of(true),
    };
  }
  closeAll() {
    return {
      closeAll: () => of(true),
    };
  }
}

describe('FormCampaignComponent', () => {
  let component: FormCampaignComponent;
  let fixture: ComponentFixture<FormCampaignComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['saveCampaign']);

  const matDialog = new MatDialogMock();
  const dialogMock = {
    close: () => {},
  };

  const resp = {
    state: 'Success',
    userMessage: 'guardado',
    objectResponse: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCampaignComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        AppMaterialModule,
        TranslateModule.forRoot(),
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
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: matDialog },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: UserService, useValue: mockUserService },
      ]
    })
    .compileComponents();
    mockUserService.saveCampaign.and.returnValue(of(resp));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save', () => {
    component.data = false;
    component.saveCampaign();
    expect(mockUserService.saveCampaign).toHaveBeenCalled();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    component.data = {
      edit: true,
      item: {
        cellphone: '',
        countactive: 0,
        countregistered: 0,
        createdondate: null,
        date: '2022-01-28T09:21:55.817',
        description: '',
        email: '',
        firstnames: '',
        id: 5,
        identification: '',
        lastnames: '',
        link: '',
        publishdate: '2022-01-26T00:00:00',
        register: false,
        url: '',
        visits: 0,
      }
    }
  });
  
  
  it('edit', () => {
    component.saveCampaign();
    expect(mockUserService.saveCampaign).toHaveBeenCalled();
  });

});
