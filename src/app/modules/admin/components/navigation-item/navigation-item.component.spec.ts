import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ContentService } from 'src/app/services/content.service';
import { NavigationItemComponent } from './navigation-item.component';

describe('NavigationItemComponent', () => {
  let component: NavigationItemComponent;
  let fixture: ComponentFixture<NavigationItemComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['saveFooterSection']);
  const dialogMock = {
    close: () => {},
  };

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationItemComponent],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
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
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: ContentService, useValue: mockContentService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationItemComponent);
    component = fixture.componentInstance;
    component.link = {
      id: 4,
      idseccion: 1,
      link: 'https://www.google.com.co',
      description: '¿Tienes un sitio web? Regístralo Aqui!',
      orderby: 1,
      date: '2021-05-25T09:16:06.897',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
