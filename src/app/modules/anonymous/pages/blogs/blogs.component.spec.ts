import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ContentService } from 'src/app/services/content.service';

import { BlogsComponent } from './blogs.component';
import * as moment from 'moment';
describe('BlogsComponent', () => {
  let component: BlogsComponent;
  let fixture: ComponentFixture<BlogsComponent>;
  const mockContentService = jasmine.createSpyObj('ContentService', ['getBlogs']);
  let response = {
    Status: 'Success',
    objectResponse: {
      blogs: [
        {
          title: 'Any',
          content: 'Anyd',
          author: 'Any3',
          tags: 'Anss',
          visible: 'true',

          date: moment('12-01-2020'),
          imageurl: '',
        },
      ],
      total: 1,
    },
  };
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BlogsComponent],
        imports: [
          AppMaterialModule,
          TranslateModule.forRoot({}),
          BrowserAnimationsModule,
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([]),
          SharedModule,

          JwtModule.forRoot({
            config: {
              tokenGetter: () => {
                return localStorage.getItem('ACCESS_TOKEN');
              },
              throwNoTokenError: true,
              whitelistedDomains: [],
              blacklistedRoutes: [],
            },
          }),
        ],

        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: ContentService, useValue: mockContentService }],
      }).compileComponents();
      mockContentService.getBlogs.and.returnValue(of(response));
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.orderBy).toEqual('RELEVANT');
  });

  it('get blogs', () => {
    const data = {
      from: 1,
      to: 2,
      orderBy: 'RELEVANT',
    };
    expect(mockContentService.getBlogs).toHaveBeenCalled();
    expect(component.blogsData).toBeTruthy();
  });
  it('order by', () => {
    component.orderByFun({ value: 'RECENT' });
    let datos = true;
    expect(datos).toBeTruthy();
  });
});
