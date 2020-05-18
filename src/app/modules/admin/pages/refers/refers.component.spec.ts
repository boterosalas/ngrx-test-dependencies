import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefersComponent } from './refers.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDaterangepickerMd, LOCALE_CONFIG, LocaleService } from 'ngx-daterangepicker-material';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { config } from 'process';
import { LinksService } from 'src/app/services/links.service';
import { of } from 'rxjs';

describe('RefersComponent', () => {
  let component: RefersComponent;
  let fixture: ComponentFixture<RefersComponent>;

  const mockLinksService = jasmine.createSpyObj("LinksService", ["getReportReferral"]);

  const report = {
    state: "Success",
    userMessage: "se ha enviado un correo",
    objectResponse: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefersComponent ],
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        AppMaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NgxDaterangepickerMd,
        RouterTestingModule.withRoutes([]),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem("ACCESS_TOKEN");
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })],
        providers: [
          { provide: LinksService, useValue: mockLinksService },
          { provide: LOCALE_CONFIG, useValue: config },
          {
            provide: LocaleService,
            useClass: LocaleService,
            deps: [LOCALE_CONFIG]
          }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("export Report", () => {
    mockLinksService.getReportReferral.and.returnValue(of(report));

    component.dateRange = {
      email: "david@test.com",
      start: "Sat 20Dec 2007 202019 2000:00:00 20GMT-0500",
      end: "Sat 20Dec 2007 202019 2000:00:00 20GMT-0500"
    };

    const nativeElement = fixture.nativeElement;
    const input = nativeElement.querySelector("input");
    input.dispatchEvent(new Event("click"));
    const nativeElementDate = fixture.nativeElement;
    const dateStart = nativeElementDate.querySelector(".today");
    dateStart.dispatchEvent(new Event("click"));
    const nativeElementbtn = fixture.nativeElement;
    const btn = nativeElementbtn.querySelector(".btn");
    btn.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    component.exportRefers();
    expect(mockLinksService.getReportReferral).toHaveBeenCalled();
  });

});
