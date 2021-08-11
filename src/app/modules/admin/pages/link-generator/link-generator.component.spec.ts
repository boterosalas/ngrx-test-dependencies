import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkGeneratorComponent } from './link-generator.component';
import { TranslateModule } from '@ngx-translate/core';
import { BannerComponent } from 'src/app/modules/shared/components/banner/banner.component';
import { AdminModule } from '../../admin.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ContentService } from 'src/app/services/content.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';

describe('LinkGeneratorComponent', () => {
  let component: LinkGeneratorComponent;
  let fixture: ComponentFixture<LinkGeneratorComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['getBusiness', 'getLinkBusiness']);

  let bussiness = [
    {
      id: 0,
      description: 'Almacenes Carulla',
    },
    {
      id: 1,
      description: 'Almacenes Exito',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        TranslateModule.forRoot(),
        AdminModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
        AppMaterialModule,
        BrowserAnimationsModule,
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
      providers: [{ provide: ContentService, useValue: mockContentService }],
    }).compileComponents();
    mockContentService.getBusiness.and.returnValue(of(bussiness));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockContentService.getBusiness).toHaveBeenCalled();
  });

  it('generate link', () => {
    mockContentService.getLinkBusiness.and.returnValue(of('https://www.exito.com?utm_source=clickam&utm_medium=referral&utm_campaign='));
    let generate = {
      id: '0',
      link: 'https://www.exito.com',
    };
    component.generateLink(generate);
  });
});
