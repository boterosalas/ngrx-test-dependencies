import { LoginComponent } from "./login.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  TranslateModule,
  TranslateService,
  TranslateStore,
  TranslateLoader,
  TranslateCompiler,
  TranslateParser,
  MissingTranslationHandler,
  USE_DEFAULT_LANG
} from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, RouterOutlet, Router } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        TranslateModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule,
        TranslateModule.forRoot({})
      ],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("show register", () => {
    component.showRegister();
    expect(component.showRegisterForm).toBeTruthy();
    expect(component.showLoginForm).toBeFalsy();
  });

  it("show login", () => {
    component.showLogin();
    expect(component.showRegisterForm).toBeFalsy();
    expect(component.showLoginForm).toBeTruthy();
  });
  
});
