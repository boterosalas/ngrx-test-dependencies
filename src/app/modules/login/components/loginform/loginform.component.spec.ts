import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginformComponent } from "./loginform.component";
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader, TranslateCompiler, TranslateParser, MissingTranslationHandler, USE_DEFAULT_LANG } from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, RouterOutlet, Router } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("LoginformComponent", () => {
  let component: LoginformComponent;
  let fixture: ComponentFixture<LoginformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginformComponent],
      imports: [
        TranslateModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule,
        TranslateModule.forRoot({})
      ],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          }
        },
        TranslateService,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('login valid', () => {
    component.isSubmitted = true;
    component.loginForm.controls.Username.setValue('test@test.com');
    component.loginForm.controls.Password.setValue('123456789');
    component.login();
    expect(component.loginForm.invalid).toBeFalsy();
  });

  it('Login invalid', () => {
    component.isSubmitted = false;
    component.loginForm.controls.Username.setValue('');
    component.loginForm.controls.Password.setValue('');
    component.login();
    expect(component.loginForm.invalid).toBeTruthy();
  });
  
  

});
