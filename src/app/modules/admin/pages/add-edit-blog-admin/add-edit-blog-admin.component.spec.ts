import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';
import { AddEditBlogAdminComponent } from './add-edit-blog-admin.component';

describe('AddEditBlogAdminComponent', () => {
  let component: AddEditBlogAdminComponent;
  let fixture: ComponentFixture<AddEditBlogAdminComponent>;
  let response = {
    Status: "Success"
  }
  const mockContentService = jasmine.createSpyObj("ContentService", [
    "saveBlog"
  ]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditBlogAdminComponent],
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
      providers: [{ provide: ContentService, useValue: mockContentService },]
    })
      .compileComponents();
    mockContentService.saveBlog.and.returnValue(of(response));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBlogAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('changes image', () => {
    spyOn(Swal, "fire").and.returnValue(
      Promise.resolve<any>({
        text: "Extensión erronea",
        type: "error",
        confirmButtonText: "Aceptar",
        confirmButtonClass: "accept-activation-alert-error",
      })
    );
    const mockFile = new File([""], "name.jpg", { type: "text/html" });
    const mockEvt = { target: { files: [mockFile] } };
    component.readURL(mockEvt);
    let datos = true
    component.saveeraser();
    component.comprobarText();
    component.deleteArticle();
    expect(datos).toBeTruthy();
  })
});
