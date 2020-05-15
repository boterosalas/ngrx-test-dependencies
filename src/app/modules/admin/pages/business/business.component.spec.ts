import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessComponent } from './business.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { ContentService } from 'src/app/services/content.service';
import { of } from 'rxjs';

describe('BusinessComponent', () => {
  let component: BusinessComponent;
  let fixture: ComponentFixture<BusinessComponent>;

  const mockContentService = jasmine.createSpyObj("ContentService", [
    "businessExcel"
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessComponent ],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem("ACCESS_TOKEN");
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })
      ],
      providers: [
        { provide: ContentService, useValue: mockContentService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('export bussiness Success', () => {
    let data = {state: "Success", userMessage: "Al terminar de procesar el archivo se enviará un correo"};
    mockContentService.businessExcel.and.returnValue(of(data));
    component.exportBusiness();
    expect(mockContentService.businessExcel).toHaveBeenCalled();
  });

  it('export bussiness error', () => {
    let data = {state: "Error", userMessage: "Ha ocurrido un error"};
    mockContentService.businessExcel.and.returnValue(of(data));
    component.exportBusiness();
    expect(mockContentService.businessExcel).toHaveBeenCalled();
  });
  

});
