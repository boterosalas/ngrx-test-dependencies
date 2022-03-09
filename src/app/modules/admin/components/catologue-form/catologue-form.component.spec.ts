import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ContentService } from 'src/app/services/content.service';

import { CatologueFormComponent } from './catologue-form.component';

describe('CatologueFormComponent', () => {
  let component: CatologueFormComponent;
  let fixture: ComponentFixture<CatologueFormComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['getAllBusiness']);

  const allBusiness = [
    {
      id: 1,
      code: 'exito',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.svg',
      infoaditional: 'Hasta 9.6% de ganancia',
      description: 'Almacenes Éxito',
      orderby: 1,
      active: false,
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatologueFormComponent ],
      imports:[
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        AppMaterialModule,
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
        { provide: ContentService, useValue: mockContentService }
      ]
    })
    .compileComponents();
    mockContentService.getAllBusiness.and.returnValue(of(allBusiness));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatologueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('upload image', () => {
    component.extension = 'jpg';
    component.size = 300;
    let event = {
      target: {
        files: [
          {
            name: 'comision.jpg',
            size: 2559,
            type: 'image/jpg',
          },
        ],
      },
    };
    component.uploadFileImage(event);
    expect(event).toBeDefined();
  });

  it('upload image 2', () => {
    component.extension = 'pdf';
    component.size = 300;
    let event = {
      target: {
        files: [
          {
            name: 'comision.pdf',
            size: 2559,
            type: 'pdf',
          },
        ],
      },
    };
    component.uploadFileImage2(event);
    expect(event).toBeDefined();
  });

  it('add item', () => {
    component.catalogueForm.controls.business.setValue(1);
    component.catalogueForm.controls.url.setValue('https://www.google.com');

    component.addItem();
    expect(component.listCatalogue.length).toBeGreaterThan(0);
  });

  it('delete item', () => {
    const item = {
      id: 1,
      url: 'https://www.google.com'
    }

    component.deleteItem(item);
    expect(item).toBeDefined();

  });
  
  

});
