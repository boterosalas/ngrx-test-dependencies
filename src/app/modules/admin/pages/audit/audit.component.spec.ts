import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AuditComponent } from "./audit.component";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { JwtModule } from "@auth0/angular-jwt";
import { LinksService } from "src/app/services/links.service";
import { of } from "rxjs/internal/observable/of";
import * as moment from "moment";
import {
  NgxDaterangepickerMd,
  LOCALE_CONFIG,
  LocaleService
} from "ngx-daterangepicker-material";
import { config } from "process";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe("AuditComponent", () => {
  let component: AuditComponent;
  let fixture: ComponentFixture<AuditComponent>;

  const mockLinksService = jasmine.createSpyObj("LinksService", ["getAudit"]);

  const audit = {
    state: "Success",
    userMessage: "se ha enviado un correo",
    objectResponse: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuditComponent],
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
        })
      ],
      providers: [
        { provide: LinksService, useValue: mockLinksService },
        { provide: LOCALE_CONFIG, useValue: config },
        {
          provide: LocaleService,
          useClass: LocaleService,
          deps: [LOCALE_CONFIG]
        }
      ]
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockLinksService.getAudit.and.returnValue(of(audit));
    fixture = TestBed.createComponent(AuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.dateParams = {
      email: "david@test.com",
      start: "Sat 20Dec 2007 202019 2000:00:00 20GMT-0500",
      end: "Sat 20Dec 2007 202019 2000:00:00 20GMT-0500"
    };
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("exportAudit", () => {
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
    component.exportAudit();
    expect(mockLinksService.getAudit).toHaveBeenCalled();
  });

  it('token exist', () => {
    localStorage.setItem('ACCESS_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU');
    let token = localStorage.getItem(('ACCESS_TOKEN'));
    expect(token).not.toBeUndefined()
  });
  

});
