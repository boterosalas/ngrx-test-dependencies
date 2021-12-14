import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';

import { FormBusinessComponent } from './form-business.component';

describe('FormBusinessComponent', () => {
  let component: FormBusinessComponent;
  let fixture: ComponentFixture<FormBusinessComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['saveBussiness']);

  const response = {
    state: 'Success',
    userMessage: 'se guardo',
    objectResponse: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBusinessComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AppMaterialModule,
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        BrowserAnimationsModule,
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
      providers: [
        UtilsService,
        { provide: ContentService, useValue: mockContentService },
      ]
    })
    .compileComponents();
    mockContentService.saveBussiness.and.returnValue(of(response));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBusinessComponent);
    component = fixture.componentInstance;
    component.dataBusiness = {
      id: '1',
      description: 'test',
      infoAditional: 'test',
      tabTableCommission: 'test',
      placeHolder: 'test',
      active: true,
      urlQueryString: 'test',
      excelCommission: true,
      image: 'test.svg',
      image2: 'test.svg',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('upload image', () => {
    component.extension = 'svg';
    component.size = 300;
    let event = {
      target: {
        files: [
          {
            name: "comision.svg",
            size: 2559,
            type: "image/svg+xml"
          }
        ]
      }
    }
    component.uploadFileImage(event);
    expect(event).toBeDefined();
  });

  it('upload image 2', () => {
    component.extension = 'svg';
    component.size = 300;
    let event = {
      target: {
        files: [
          {
            name: "comision.svg",
            size: 2559,
            type: "image/svg+xml"
          }
        ]
      }
    }
    component.uploadFileImage2(event);
    expect(event).toBeDefined();
  });

  it('save Business', () => {
    component.saveBussiness();
    expect(mockContentService.saveBussiness).toHaveBeenCalled();
  });
  
  

});
