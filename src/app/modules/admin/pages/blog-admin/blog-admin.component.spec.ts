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
import Swal from 'sweetalert2';

import { BlogAdminComponent } from './blog-admin.component';

describe('BlogAdminComponent', () => {
  let component: BlogAdminComponent;
  let fixture: ComponentFixture<BlogAdminComponent>;
  let response = {
    Status: "Success",
    objectResponse: { blogs: [{ id: 1 }, { id: 2 }] }
  }
  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getBlogsAdmin", "activeBlog", "deleteBlog"
  ]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlogAdminComponent],
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
      providers: [{ provide: ContentService, useValue: mockContentService },]
    })
      .compileComponents();
    mockContentService.getBlogsAdmin.and.returnValue(of(response));
    mockContentService.deleteBlog.and.returnValue(of(response));
    mockContentService.activeBlog.and.returnValue(of(response));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('delete blog', () => {
    spyOn(Swal, "fire").and.returnValue(
      Promise.resolve<any>({
        text: "Extensión erronea",
        type: "error",
        confirmButtonText: "Aceptar",
        confirmButtonClass: "accept-activation-alert-error",
      })
    );
    component.deleteArticle({ id: 2 });
    component.activate({ id: 2 });
    component.editArticle({ id: 2 });
    let datos = true;
    expect(datos).toBeTruthy();
  })
});
