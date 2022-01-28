import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { UserService } from 'src/app/services/user.service';

import { CampaingsComponent } from './campaings.component';

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

describe('CampaingsComponent', () => {
  let component: CampaingsComponent;
  let fixture: ComponentFixture<CampaingsComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['getCampaigns']);

  const matDialog = new MatDialogMock();
  const dialogMock = {
    close: () => {},
  };

  const campaign = {
    total: 1,
    campaigns: [
      {
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
      },
    ],
  };

  const item = {
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaingsComponent],
      imports: [
        HttpClientTestingModule,
        AppMaterialModule,
        RouterTestingModule,
        NgxPaginationModule,
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
      ],
    }).compileComponents();
    mockUserService.getCampaigns.and.returnValue(of(campaign));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('export', () => {
    component.exportCampaign();
    expect(mockUserService.getCampaigns).toHaveBeenCalled();
  });

  it('add campaign', () => {
    component.addCampaign();
    expect(component.export).toBeFalsy();
  });
  
  it('edit campaign', () => {
    component.edit(item);
    expect(component.export).toBeFalsy();
  });
  
  it('sort data', () => {
    const event = {
      active: 'ASC',
      direction: 'DESC'
    }
    component.sortData(event);
    expect(mockUserService.getCampaigns).toHaveBeenCalled();

  });


});
