import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
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

import { EditBlogAdminComponent } from './edit-blog-admin.component';

describe('EditBlogAdminComponent', () => {
  let component: EditBlogAdminComponent;
  let fixture: ComponentFixture<EditBlogAdminComponent>;
  let response = {
    Status: 'Success',
    objectResponse: {
      title: 'Any',
      content: 'Anyd',
      author: 'Any3',
      tags: 'Anss',
      visible: 'true',
      date: '2020/20/02',
      imageurl: '',
    },
  };
  const mockContentService = jasmine.createSpyObj('ContentService', ['saveBlog', 'deleteBlog', 'getIndividualBlogId']);
beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditBlogAdminComponent],
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
            allowedDomains: [],
            disallowedRoutes: [],
          },
        }),
      ],

      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ContentService, useValue: mockContentService }],
    }).compileComponents();
    mockContentService.saveBlog.and.returnValue(of(response));
    mockContentService.deleteBlog.and.returnValue(of(response));
    mockContentService.getIndividualBlogId.and.returnValue(of(response));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBlogAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('changes image', () => {
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve<any>({
        text: 'Extensión erronea',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'accept-activation-alert-error',
      })
    );
    const mockFile = new File([''], 'name.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.readURL(mockEvt);
    let datos = true;
    component.saveeraser();
    component.comprobarText('texto');
    component.activate();
    component.deleteArticle();
    expect(datos).toBeTruthy();
  });
});
