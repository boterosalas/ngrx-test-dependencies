import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxDaterangepickerMd, LocaleService, LOCALE_CONFIG } from 'ngx-daterangepicker-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReportNewsComponent } from './report-news.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs/internal/observable/of';
import Swal from 'sweetalert2';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HomeComponent } from '../../home/home.component';

describe('ReportNewsComponent', () => {
  let component: ReportNewsComponent;
  let fixture: ComponentFixture<ReportNewsComponent>;
  const mockContentService = jasmine.createSpyObj('UserService', ['saveNews']);
  const resp = {
    state: 'Success',
  };
beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ReportNewsComponent],
      imports: [
        AppMaterialModule,
        MatDatepickerModule,
        MatNativeDateModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        SharedModule,
        NgxDaterangepickerMd,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
        TranslateModule.forRoot({}),
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
      providers: [{ provide: UserService, useValue: mockContentService }],
    }).compileComponents();
    mockContentService.saveNews.and.returnValue(of(resp));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const mockFile = new File([''], 'name.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'cedula1');
    expect(component.onFileChangeFiles).not.toBeNull();
    component.onChangeSelected('Numero de orden');
    expect(component.visibleLeft).toBeTruthy();
    component.dateForm.controls.dateRange.setValue('22-02-2021');
    component.dateForm.controls.bussiness.setValue('1');
    component.dateForm.controls.reference.setValue('23323');
    component.dateForm.controls.description.setValue('No funciono');
    component.fileImgCat = 'data:base64';
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve<any>({
        title: 'Se ha enviado un email',
        text: 'texto enviado',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'accept-forgot-alert-success',
        type: 'success',
      })
    );
    component.sendMessage();
    expect(mockContentService.saveNews).toHaveBeenCalled();
  });
});
