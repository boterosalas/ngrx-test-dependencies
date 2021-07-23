import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { BannerComponent } from "src/app/modules/shared/components/banner/banner.component";
import { ContentService } from "src/app/services/content.service";
import { CardNotificationComponent } from "../../components/card-notification/card-notification.component";

import { NotificationsComponent } from "./notifications.component";

describe("NotificationsComponent", () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getNotificationAdmin",
  ]);

  let respGetNotification = {
    state: "Success",
    userMessage: null,
    objectResponse: {
      scheduled: [
        {
          id: 1,
          datepublish: "2021-07-23T16:00:00",
          datestart: null,
          dateend: null,
          filter: "PERSONALIZADO",
          idnotification: 1,
          content: "ppppp",
          date: "2021-07-22T16:45:02",
          publish: false,
          title: "programada editada 2",
          userid: 0,
          viewed: false,
          dateviewed: null,
          url: "https://webclickamdev.blob.core.windows.net/files-excel/filter-notifications/20210722164501_ImportarNotificaciones.xlsx",
        },
      ],
      published: [
        {
          id: 2,
          datepublish: null,
          datestart: null,
          dateend: null,
          filter: "PERSONALIZADO",
          idnotification: 5,
          content: "file",
          date: "2021-07-22T17:01:14",
          publish: true,
          title: "file",
          userid: 0,
          viewed: false,
          dateviewed: null,
          url: "https://webclickamdev.blob.core.windows.net/files-excel/filter-notifications/20210722170113_ImportarNotificaciones.xlsx",
        },
      ],
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotificationsComponent,
        BannerComponent,
        CardNotificationComponent,
      ],
      imports: [
        AppMaterialModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [{ provide: ContentService, useValue: mockContentService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    mockContentService.getNotificationAdmin.and.returnValue(of(respGetNotification));
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(mockContentService.getNotificationAdmin).toHaveBeenCalled();
  });
});
