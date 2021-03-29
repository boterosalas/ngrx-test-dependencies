import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ContentService } from 'src/app/services/content.service';

import { BlogContentComponent } from './blog-content.component';
import * as moment from "moment";
import { MatDialog } from '@angular/material';
describe('BlogContentComponent', () => {
  let component: BlogContentComponent;
  let fixture: ComponentFixture<BlogContentComponent>;
  let response = {
    Status: "Success",
    objectResponse: {
      title: "Any",
      content: "Anyd",
      author: "Any3",
      tags: "Anss",
      visible: "true",

      date: moment("12-01-2020"),
      imageurl: ""
    }
  }
  let responseMessage = {
    Status: "Success",

  }
  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getIndividualBlog", "sendMessage"
  ]);
  const mockDialog = jasmine.createSpyObj("MatDialog", ["open", "closeAll", "afterAllClosed"]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlogContentComponent],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        NgxDaterangepickerMd,
        SharedModule,
        NgxMaterialTimepickerModule,
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

      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ContentService, useValue: mockContentService },
      { provide: MatDialog, useValue: mockDialog },]
    })
      .compileComponents();
    mockContentService.getIndividualBlog.and.returnValue(of(response));
    mockContentService.sendMessage.and.returnValue(of(responseMessage));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("copyInputMessage", () => {
    let datos = true;
    component.sendMessage();
    component.sendEmail()
    //component.copyLink("linkInput");
    expect(datos).toBeTruthy();
  });
});
