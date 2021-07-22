import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { ContentService } from "src/app/services/content.service";

import { DialogDeleteNotificationComponent } from "./dialog-delete-notification.component";

describe("DialogDeleteNotificationComponent", () => {
  let component: DialogDeleteNotificationComponent;
  let fixture: ComponentFixture<DialogDeleteNotificationComponent>;

  const dialogMock = {
    close: () => {},
  };

  let respDelete = {
    state: "Success",
    userMessage: "Se ha eliminado satisfactoriamente",
    objectResponse: null,
  };

  const mockContentService = jasmine.createSpyObj("ContentService", [
    "deleteNotificationAdmin",
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDeleteNotificationComponent],
      imports: [
        AppMaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: ContentService, useValue: mockContentService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("close dialog", () => {
    component.cancelDelete();
    expect(component).toBeTruthy();
  });

  it("Delete notification", () => {
    mockContentService.deleteNotificationAdmin.and.returnValue(of(respDelete));
    component.deleteNotification();
    expect(mockContentService.deleteNotificationAdmin).toHaveBeenCalled();
  });
});
