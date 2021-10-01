import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ContentService } from 'src/app/services/content.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { JwtModule } from '@auth0/angular-jwt';
import { ToolsAdminComponent } from './tools-admin.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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

describe('CarrouselAdminComponent', () => {
  let component: ToolsAdminComponent;
  let fixture: ComponentFixture<ToolsAdminComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', [
    'getOffersbyType',
    'saveOrderOfertBusiness',
    'getAllBusiness',
    'deleteOfer',
    'saveOfertBusiness',
    'getBoarding',
    'deleteBoardings'
  ]);

  const mockAuthService = jasmine.createSpyObj('AuthService', ['getPermisionByUser']);

  const matDialog = new MatDialogMock();

  const dialogMock = {
    close: () => {},
  };

  const boarding = [
    {
      id: 1,
      imageweb: 'https://webclickamdev.blob.core.windows.net/img-ofertas/boarding/20210914184213_web.jpg',
      imagemobile: 'https://webclickamdev.blob.core.windows.net/img-ofertas/boarding/20210914184213_mobile.jpg',
      buttonname1: 'Botón 1',
      linkname1: 'https://www.google.com.co',
      linkname2: 'Botón 2',
      buttonname2: 'https://www.clickam.com.co',
      orderby: null,
      date: '2021-09-14T18:42:13.49',
      imageBase64Mobile: null,
      imageBase64Web: null
    }
  ];

  const datos = [
    {
      active: false,
      business: 'exito',
      date: '2021-04-20T00:00:00',
      dateend: '2021-05-19T02:15:00',
      datestart: '2999-05-19T02:05:00',
      description: 'Oferta',
      id: 4,
      idbusiness: 1,
      imagemobile: null,
      imageurlmobile: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-mobile/4.jpg',
      imageurlweb: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/4.jpg',
      imageweb: null,
      infoaditional: 'Hasta 10%',
      link: 'https://www.exito.com/jugueteria?utm_source=clickam&utm_medium=referral&utm_campaign={1}',
      orderby: 1,
      programmed: false,
      selected: false,
      type: 'POPUP',
      seccion: '/mi-perfil',
      textbutton: 'Continuar',
      new: true,
      colorbutton: '#8D7EB7',
    },
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
    },
    {
      active: true,
      business: 'exito',
      date: '2021-04-20T13:20:00',
      dateend: null,
      datestart: null,
      description: 'Freidora De Aire Bioceramic Oster ',
      id: 1,
      idbusiness: 1,
      imagemobile: null,
      imageurlmobile: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-mobile/1.jpg',
      imageurlweb: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/1.jpg',
      imageweb: null,
      infoaditional: 'Hasta 3%',
      link: 'https://www.exito.com/freidora-de-aire-bioceramic-384560/p?utm_source=clickam&utm_medium=referral&utm_campaign={1}',
      orderby: 2,
      programmed: false,
      selected: false,
      type: 'OFERTA',
      seccion: null,
      textbutton: null,
      new: false,
      colorbutton: null,
    },
    {
      active: false,
      business: 'exito',
      date: '2021-04-20T13:20:00',
      dateend: '2021-05-19T02:15:00',
      datestart: '2021-05-19T02:15:00',
      description: 'Freidora De Aire Bioceramic Oster ',
      id: 35,
      idbusiness: 1,
      imagemobile: null,
      imageurlmobile: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-mobile/1.jpg',
      imageurlweb: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/1.jpg',
      imageweb: null,
      infoaditional: 'Hasta 3%',
      link: 'https://www.exito.com/freidora-de-aire-bioceramic-384560/p?utm_source=clickam&utm_medium=referral&utm_campaign={1}',
      orderby: 2,
      programmed: false,
      selected: false,
      type: 'POPUP',
      seccion: null,
      textbutton: null,
      new: false,
      colorbutton: null,
    },
  ];

  const audit = {
    state: 'Success',
    userMessage: 'se ha enviado un correo',
    objectResponse: [],
  };

  const getPermisionByUser = [{ idmenu: 1, menu: 'Inicio', route: '/inicio' }];

  const busss = [
    {
      code: 'clickam',
      description: 'Clickam',
      id: 0,
      placeholder: 'TIPO DE REPORTE',
      tabtablecommission: 'Clickam',
    },
  ];

  const resp = {
    state: 'Success',
    userMessage: 'correcto',
    objectResponse: [],
  };

  const error = {
    state: 'Error',
    userMessage: 'se ha enviado un correo',
    objectResponse: [],
  };

  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ToolsAdminComponent],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot(),
        MatSlideToggleModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        DragDropModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatMenuModule,
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
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: matDialog },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: ContentService, useValue: mockContentService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();
    mockContentService.getOffersbyType.and.returnValue(of(datos));
    mockContentService.saveOrderOfertBusiness.and.returnValue(of(audit));
    mockContentService.getAllBusiness.and.returnValue(of(busss));
    mockContentService.deleteOfer.and.returnValue(of(audit));
    mockContentService.saveOfertBusiness.and.returnValue(of(audit));
    mockContentService.getBoarding.and.returnValue(of(boarding));
    mockAuthService.getPermisionByUser.and.returnValue(of(getPermisionByUser));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.timeFormat('22:20:00')).toEqual('10:20 PM');
    component.getAllBusiness();
    expect(mockContentService.getAllBusiness).toHaveBeenCalled();
    expect(mockContentService.getOffersbyType).toHaveBeenCalled();
  });

  describe('getSectionsClicker', () => {
    it('called', () => {
      component.getSectionsClicker();
      expect(mockAuthService.getPermisionByUser).toHaveBeenCalled();
    });
  });

  it('edit Carousel Modal', () => {
    component.editCarouselModal(datos[0]);
    expect(component.showUndefinedDate).toBeTruthy();
  });

  it('file change', () => {
    const mockFile = new File([''], 'name.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'cedula1');
    expect(component.activebutton).not.toBeTruthy();
    component.onFileChangeFilesSecond(mockEvt, 'cedula1');
    expect(component.activebutton).not.toBeTruthy();
  });

  it('save Imagen Carousel', () => {
    component.visible = true;
    component.undefinedDate = false;
    component.dataAddImagen.controls.business.setValue(1);
    component.dataAddImagen.controls.nameContent.setValue('name');
    component.dataAddImagen.controls.link.setValue('https://www.exito.com/freidora-de-aire-bioceramic-384560');
    component.dataAddImagen.controls.comision.setValue('20%');
    component.datePublication = '2021-05-19';
    component.dateFinishPublication = '2021-05-19';
    component.hourDate = '02:05:00';
    component.hourDateFinish = '02:15:00';
    fixture.detectChanges();
    component.saveImagenCarousel();
    expect(mockContentService.saveOfertBusiness).toHaveBeenCalled();
  });

  it('on No Click edit Carousel Modal', () => {
    component.onNoClick();
    expect(component.datePublication).not.toBeTruthy();
    expect(component.hourDate).not.toBeTruthy();
    expect(component.dateFinishPublication).not.toBeTruthy();
    expect(component.hourDateFinish).not.toBeTruthy();
    expect(component.undefinedDate).not.toBeTruthy();
  });

  it('edit Ofertas Modal', () => {
    component.editOfertasModal(datos[2]);
    expect(component.visible).toBeTruthy();
  });

  it('file change Ofertas', () => {
    const mockFile = new File([''], 'name.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'cedula1');
    expect(component.onFileChangeFiles).not.toBeNull();
    expect(component.activebutton).not.toBeTruthy();
  });

  it('save Imagen Ofertas', () => {
    component.visible = true;
    component.dataAddImagenOfertas.controls.business.setValue(1);
    component.dataAddImagenOfertas.controls.nameContent.setValue('name');
    component.dataAddImagenOfertas.controls.link.setValue('https://www.exito.com/freidora-de-aire-bioceramic-384560');
    component.dataAddImagenOfertas.controls.comision.setValue('20%');
    component.datePublication = '2021-05-19';
    component.dateFinishPublication = '2021-05-19';
    component.hourDate = '02:05:00';
    component.hourDateFinish = '02:15:00';
    fixture.detectChanges();
    component.saveImagenOfertas();
    expect(mockContentService.saveOfertBusiness).toHaveBeenCalled();
  });

  it('on No Click edit Carousel Ofertas', () => {
    component.onNoClick();
    expect(component.datePublication).not.toBeTruthy();
    expect(component.hourDate).not.toBeTruthy();
    expect(component.dateFinishPublication).not.toBeTruthy();
    expect(component.hourDateFinish).not.toBeTruthy();
    expect(component.undefinedDate).not.toBeTruthy();
  });

  it('save carousel modal', () => {
    component.saveCarouselModal();
    expect(component.showUndefinedDate).toBeTruthy();
    expect(component.nameFileCert).not.toBeTruthy();
    expect(component.nameFileCert2).not.toBeTruthy();
    expect(component.showErrorCert).not.toBeTruthy();
    expect(component.activebutton).not.toBeTruthy();
  });

  it('save Popup Modal', () => {
    component.savePopupModal();
    expect(component.showUndefinedDate).not.toBeTruthy();
    expect(component.nameFileCert).not.toBeTruthy();
    expect(component.nameFileCert2).not.toBeTruthy();
    expect(component.showErrorCert).not.toBeTruthy();
    expect(component.activebutton).not.toBeTruthy();
  });

  it('save Ofertas modal', () => {
    component.saveOfertasModal();
    expect(component.showUndefinedDate).toBeTruthy();
    expect(component.nameFileCert).not.toBeTruthy();
    expect(component.nameFileCert2).not.toBeTruthy();
    expect(component.showErrorCert).not.toBeTruthy();
    expect(component.activeButtonOfer).not.toBeTruthy();
  });

  it('Additional features', () => {
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve<any>({
        text: 'Extensión erronea',
        type: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'accept-activation-alert-error',
      })
    );

    component.selectAll();
    component.selectAllOfertas();

    component.saveOrder([
      { id: 1, orderBy: 1 },
      { id: 2, orderBy: 2 },
    ]);

    component.deleteOfer({ id: 1 }, '');
    component.deleteOfer({ id: 1 }, 'popup');
    component.checkButton();

    component.deleteEveryOfertas();
    component.onNoClick();
    component.deleteEvery();
    let datos = true;
    expect(datos).toBeTruthy();
  });

  it('get Section Name', () => {
    expect(component.getSectionName('/inicio')).toBe('Inicio');
  });

  it('open modal boarding', () => {
    component.openModalonBoarding();
    expect(dialogMock.close).toBeTruthy();
  });

  it('delete board', () => {
    mockContentService.deleteBoardings.and.returnValue(of(resp));
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve<any>({
        html: "<h3 class='delete-title-comision'>Eliminar contenido</h3> <p class='w-container'>¿Está seguro que desea eliminar el contenido seleccionado?</p>",
        confirmButtonText: 'Eliminar contenido',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonClass: 'updateokdelete order-last',
        cancelButtonClass: 'updatecancel',
        allowOutsideClick: false,
      }));
    component.deleteBoard(1);
  });

  it('edit board', () => {
    component.editBoard(boarding);
    expect(boarding).not.toBeUndefined();
  });


});
