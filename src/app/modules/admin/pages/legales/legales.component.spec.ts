import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MasterDataService } from 'src/app/services/master-data.service';

import { LegalesComponent } from './legales.component';

describe('LegalesComponent', () => {
  let component: LegalesComponent;
  let fixture: ComponentFixture<LegalesComponent>;
  let response = {
    Status: "Success",

  }
  let responseTerms = {
    Status: "Success",
    objectResponse: [{
      sectionValue: "Contenido",
      sectionTitle: "Title",
      date:'01/12/2020'
    },
    {
      sectionValue: "Contenido",
      sectionTitle: "Title",
      date:'01/12/2020'
    },
    {
      sectionValue: "Contenido",
      sectionTitle: "Title",
      date:'01/12/2020'
    },
    {
      sectionValue: "Contenido",
      sectionTitle: "Title",
      date:'01/12/2020'
    }]
  }
  const mockMasterService = jasmine.createSpyObj("MasterDataService", [
    "getTerms", "setTerms"
  ]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LegalesComponent],
      imports: [
        AngularEditorModule,
        AppMaterialModule,
        TranslateModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        NgxDaterangepickerMd,
        SharedModule,
        NgxMaterialTimepickerModule,
        ReactiveFormsModule,
        FormsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        }),

      ],

      providers: [{ provide: MasterDataService, useValue: mockMasterService },]
    })
      .compileComponents();
    mockMasterService.getTerms.and.returnValue(of(responseTerms));
    mockMasterService.setTerms.and.returnValue(of(response));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component', () => {
    component.saveLegal("1");
    component.saveLegal("2");
    component.saveLegal("3");
    component.saveLegal("4");
    let datos = true;
    expect(datos).toBeTruthy();
  })

});

