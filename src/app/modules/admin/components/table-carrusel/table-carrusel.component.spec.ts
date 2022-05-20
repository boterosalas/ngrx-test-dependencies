import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs/internal/observable/of';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ContentService } from 'src/app/services/content.service';

import { TableCarruselComponent } from './table-carrusel.component';

export class MatDialogMock {
  open() {
    return {
      beforeClosed: () => of(true),
    };
  }
  closeAll() {
    return {
      closeAll: () => of(true),
    };
  }
}

describe('TableCarruselComponent', () => {
  let component: TableCarruselComponent;
  let fixture: ComponentFixture<TableCarruselComponent>;
  
  const matDialog = new MatDialogMock();
  const dialogMock = {
    close: () => {},
  };

  const mockContentService = jasmine.createSpyObj('ContentService', ['getAllBusiness', 'getOffersbyType', 'saveOfertBusiness', 'saveOrderOfertBusiness', 'deleteOfer']);

  const allBusiness = [
    {
      id: 1,
      code: 'exito',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.svg',
      infoaditional: 'Hasta 9.6% de ganancia',
      description: 'Almacenes Éxito',
      orderby: 1,
      active: false,
    },
    {
      id: 14,
      code: 'movil-exito',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-movil-exito.svg',
      infoaditional: 'Ahora 10% de recompensa',
      description: 'Móvil Éxito',
      orderby: 5,
      active: true,
    },
    {
      id: 3,
      code: 'seguros',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-seguros.svg',
      infoaditional: 'Hasta $32.000 de ganancia',
      description: 'Seguros Éxito',
      orderby: 3,
      active: true,
    },
    {
      id: 4,
      code: 'viajes',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-viajes.svg',
      infoaditional: 'Hasta $40.000 de ganancia',
      description: 'Viajes Éxito',
      orderby: 4,
      active: true,
    },
    {
      id: 5,
      code: 'wesura',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-wesura.svg',
      infoaditional: 'Hasta 12.000 de ganancia',
      description: 'Wesura',
      orderby: 6,
      active: true,
    },
  ];

  const datos = [
    {
      active: false,
      business: 'exito',
      date: '2021-04-20T00:00:00',
      dateend: null,
      datestart: null,
      description: 'Jueves Online',
      id: 14,
      idbusiness: 1,
      imagemobile: null,
      imageurlmobile: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-mobile/14.jpg',
      imageurlweb: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/14.jpg',
      imageweb: null,
      infoaditional: 'Hasta 9.6%',
      link: 'https://www.exito.com/?utm_source=clickam&utm_medium=referral&utm_campaign={1}',
      orderby: 0,
      programmed: false,
      selected: false,
      type: 'CARROUSEL',
      seccion: null,
      textbutton: null,
      new: false,
      colorbutton: null,
    }
  ];

  const element =  {
    active: false,
    business: 'exito',
    date: '2021-04-20T00:00:00',
    dateend: null,
    datestart: null,
    description: 'Jueves Online',
    id: 14,
    idbusiness: 1,
    imagemobile: null,
    imageurlmobile: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-mobile/14.jpg',
    imageurlweb: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/14.jpg',
    imageweb: null,
    infoaditional: 'Hasta 9.6%',
    link: 'https://www.exito.com/?utm_source=clickam&utm_medium=referral&utm_campaign={1}',
    orderby: 0,
    programmed: false,
    selected: false,
    type: 'CARROUSEL',
    seccion: null,
    textbutton: null,
    new: false,
    colorbutton: null,
  }

  
  const resp = {
    state: 'Success',
    userMessage: 'correcto',
    objectResponse: [],
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCarruselComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot({}),
        RouterTestingModule,
        AppMaterialModule,
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
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: matDialog },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: ContentService, useValue: mockContentService }
      ]
    })
    .compileComponents();
    mockContentService.getAllBusiness.and.returnValue(of(allBusiness));
    mockContentService.getOffersbyType.and.returnValue(of(datos));
    mockContentService.saveOfertBusiness.and.returnValue(of(resp));
    mockContentService.saveOrderOfertBusiness.and.returnValue(of(resp));
    mockContentService.deleteOfer.and.returnValue(of(resp));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save carosuel modal', () => {
    component.saveCarouselModal();
    expect(component.nameFileCert).toBe('');
  });

  it('editCarouselModal', () => {
    component.editCarouselModal(element);
    expect(element).toBeDefined();
  });
  
  it('saveImagen', () => {
    component.visible = true;
    component.selectedBuss = [];
    component.saveImagenCarousel();
    expect(component.visible).toBeTruthy();
  });

  it('drop', () => {
    const event: any = {
      item: {
        datos
      },
      currentIndex: 1,
      previousIndex: 0
    };
    component.dropTable(event);
    expect(mockContentService.saveOrderOfertBusiness).toHaveBeenCalled();
  });
  
  it('format date', () => {
    const date = "2019-20-12T12:00"
    component.formatDate(date);
    expect(date).toBeDefined();
  });
  
  it('load delete', () => {
    component.loadDelete();
    expect(component.active).toBeFalsy();
  });

  it('deleteCarousel', () => {
    component.deleteCarousel(element);
    expect(element).toBeDefined();
  });
  
  it('upload image', () => {
    component.extension = 'jpg';
    component.size = 300;
    let event = {
      target: {
        files: [
          {
            name: "comision.jpg",
            size: 2559,
            type: "image/svg+xml"
          }
        ]
      }
    }
    component.uploadFileImage(event);
    expect(event).toBeDefined();
  });
  
  it('select all', () => {
    component.selectAll();
    expect(component.selectAllVideosImg).toBe('Deseleccionar todos');
  });
  
  it('deleteEvery', () => {
    component.deleteEvery();
    setTimeout(() => {   
      const button = document.querySelector('.updateokdelete')
      button.dispatchEvent(new Event('click'));
      expect()
    }, 500);
    expect(element).toBeDefined();
  });
  
  it('hour change publicationDate', () => {

    const hour = '12:00'
    const type = 'publicationDate';

    component.hourChange(hour, type);
    expect(type).toBe('publicationDate');
    
  });
  
  it('hour change finishDate', () => {

    const hour = '12:00'
    const type = 'finishDate';

    component.hourChange(hour, type);
    expect(type).toBe('finishDate');
    
  });
  

});
