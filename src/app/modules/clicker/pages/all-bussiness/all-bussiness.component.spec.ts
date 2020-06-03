import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBussinessComponent } from './all-bussiness.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { ContentService } from 'src/app/services/content.service';
import { of } from 'rxjs';

describe('AllBussinessComponent', () => {
  let component: AllBussinessComponent;
  let fixture: ComponentFixture<AllBussinessComponent>;

  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getBusiness",
  ]);

  let bussiness = [
    {
      id: 25,
      orderby: 26,
      link:
        "https://www.exito.com/ferreteria?utm_source=clickam&utm_medium=referral&utm_campaign=",
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-content/ferreteria-vehiculos.png",
      description: "Ferreteria y vehiculos",
      commission: 0,
      idbusiness: 1,
      infoaditional: "",
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBussinessComponent ],
      imports: [
        SharedModule,
        TranslateModule.forRoot(),
        AppMaterialModule,
        AnonymousModule,
        RouterTestingModule,
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem("ACCESS_TOKEN");
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: [],
          },
        })
      ],
      providers: [
        { provide: ContentService, useValue: mockContentService },
      ]
    })
    .compileComponents();
    mockContentService.getBusiness.and.returnValue(of(bussiness));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('bussiness navigation', () => {
    component.bussinessNavigation(bussiness);
    expect(bussiness).toBeDefined();
  });
  

});
