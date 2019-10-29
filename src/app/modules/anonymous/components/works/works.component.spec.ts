import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { WorksComponent } from "./works.component";
import { TranslateModule } from "@ngx-translate/core";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { UtilsService } from "src/app/services/utils.service";

describe("WorksComponent", () => {
  let component: WorksComponent;
  let fixture: ComponentFixture<WorksComponent>;

  const mockUtilsService = jasmine.createSpyObj("UtilsService", [
    "showRegisterForm"
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorksComponent],
      imports: [TranslateModule.forRoot({}), SlickCarouselModule],
      providers: [{ provide: UtilsService, useValue: mockUtilsService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    mockUtilsService.showRegisterForm.and.returnValue(true);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("open register", () => {
    component.openRegister();
    expect(mockUtilsService.showRegisterForm).toHaveBeenCalled();
  });
});
