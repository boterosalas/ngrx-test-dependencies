import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ContentService } from 'src/app/services/content.service';
import { LinksService } from 'src/app/services/links.service';

import { SellReportFormComponent } from './sell-report-form.component';

describe('SellReportFormComponent', () => {
  let component: SellReportFormComponent;
  let fixture: ComponentFixture<SellReportFormComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['getAllBusiness']);

  let mockLinksService = jasmine.createSpyObj('LinksService', ['getReportClickam']);

  const allBusiness = [
    {
      id: 1,
      code: 'exito',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.svg',
      infoaditional: 'Hasta 9.6% de ganancia',
      description: 'Almacenes Éxito',
      orderby: 1,
      active: false,
    },
  ];

  const getReport = {
    state: 'Success',
    userMessage: 'se ha enviado un correo a test@h.com',
    objectResponse: [],
  };

  const dialogMock = {
    close: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellReportFormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
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
      providers: [
        { provide: LinksService, useValue: mockLinksService },
        { provide: ContentService, useValue: mockContentService },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
    mockContentService.getAllBusiness.and.returnValue(of(allBusiness));
    mockLinksService.getReportClickam.and.returnValue(of(getReport));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filter date', () => {
    const e = {
      startDate: '2021-04-05',
      endDate: '2021-04-05',
    };
    component.filterDate(e);
    expect(e).toBeDefined();
  });

  it('export filter', () => {
    component.exportFilter();
    expect(mockLinksService.getReportClickam).toHaveBeenCalled();
  });

  it('filter comision', () => {
    const e = {
      startDate: '2021-04-05',
      endDate: '2021-04-05',
    };
    component.filterComision(e);
    expect(component.activeButton).toBeFalsy();
  });
});
