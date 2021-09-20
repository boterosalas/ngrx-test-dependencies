import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxDaterangepickerMd, LocaleService, LOCALE_CONFIG } from 'ngx-daterangepicker-material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReportStatusComponent } from './report-status.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs/internal/observable/of';
import Swal from 'sweetalert2';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}

describe('ReportStatusComponent', () => {
  let component: ReportStatusComponent;
  let fixture: ComponentFixture<ReportStatusComponent>;
  const mockContentService = jasmine.createSpyObj('UserService', ['saveNews', 'getNovetlyUser', 'saveQualificationNovelty']);

  const resp = {
    state: 'Success',
  };
  const respNovelty = {
    state: 'Success',
    objectResponse: {
      novelties: [
        {
          id: 222,
          description: 'Hola mundo',
          statusnovelty: 'En revisión',
        },
        {
          id: 222,
          description: 'Hola mundo',
          statusnovelty: 'En revisión',
        },
      ],
    },
  };

  const matDialog = new MatDialogMock();
beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReportStatusComponent],
      imports: [
        AppMaterialModule,
        MatDatepickerModule,
        MatNativeDateModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        SharedModule,
        NgxDaterangepickerMd,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot({}),
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
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UserService, useValue: mockContentService },
        { provide: MatDialogRef, useValue: MatDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: { comment: '', qualification: 1 } },
        { provide: MatDialog, useValue: matDialog },
      ],
    }).compileComponents();
    mockContentService.saveNews.and.returnValue(of(resp));
    mockContentService.getNovetlyUser.and.returnValue(of(respNovelty));
    mockContentService.saveQualificationNovelty.and.returnValue(of(resp));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.getNovetlyUser();
    expect(mockContentService.getNovetlyUser).toHaveBeenCalled();
  });

  it('select option', () => {
    component.stepIni(1);
    expect(component.selectedInic).toEqual(1);
  });

  it('open modal status', () => {
    component.opeModalStatus('1', { comment: 'prueba' });
    expect(matDialog.open).toBeTruthy();
  });

  it('save qualification', () => {
    component.saveQualification({ comment: 'Prueba', qualification: 2 }, { id: 1 });
    expect(mockContentService.saveQualificationNovelty).toHaveBeenCalled();
  });
});
