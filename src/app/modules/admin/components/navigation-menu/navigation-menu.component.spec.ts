import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import 'zone.js/dist/zone-testing';
import { NavigationMenuComponent } from './navigation-menu.component';
import { AuthService } from 'src/app/services/auth.service';
import { AdminModule } from '../../admin.module';

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

describe('NavigationMenuComponent', () => {
  let component: NavigationMenuComponent;
  let fixture: ComponentFixture<NavigationMenuComponent>;

  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' }; // attach componentInstance to the spy object...

  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'beforeClosed']);

  const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed', 'componentInstance', 'event ', 'beforeClosed']);

  const mockAuthService = jasmine.createSpyObj('AuthService', [
    'getmenusNoLogin',
    'saveMenu',
    'deleteMenu',
    'saveOrderMenus',
    'getMenuClicker',
  ]);

  let response = {
    Status: 'Success',
  };

  const dialogMock = {
    close: () => {},
    beforeClosed: () => {},
  };

  const sectionsLinks = [
    {
      id: 1,
      description: 'Clickam',
      orderby: 1,
      date: '2021-05-25T08:48:42.533',
      links: [
        {
          id: 4,
          idseccion: 1,
          link: 'https://www.google.com.co',
          description: '¿Tienes un sitio web? Regístralo Aqui!',
          orderby: 1,
          date: '2021-05-25T09:16:06.897',
        },
        {
          id: 3,
          idseccion: 1,
          link: 'https://www.google.com.co',
          description: 'Tabla de comisiones',
          orderby: 2,
          date: '2021-05-25T09:15:51.24',
        },
        {
          id: 2,
          idseccion: 1,
          link: 'https://www.google.com.co',
          description: 'Click Academy',
          orderby: 3,
          date: '2021-05-25T09:15:14.56',
        },
        {
          id: 1,
          idseccion: 1,
          link: 'https://www.google.com.co',
          description: 'Blog',
          orderby: 4,
          date: '2021-05-25T09:16:35.603',
        },
      ],
    },
    {
      id: 2,
      description: 'Soporte',
      orderby: 2,
      date: '2021-05-25T08:49:35.617',
      links: [
        {
          id: 7,
          idseccion: 2,
          link: 'https://www.google.com.co',
          description: 'Centro de Ayuda',
          orderby: 1,
          date: '2021-05-27T00:00:00',
        },
        {
          id: 8,
          idseccion: 2,
          link: 'https://www.google.com.co',
          description: 'Whatsapp',
          orderby: 2,
          date: '2021-05-27T00:00:00',
        },
        {
          id: 9,
          idseccion: 2,
          link: 'https://www.google.com.co',
          description: 'Correo',
          orderby: 3,
          date: '2021-05-27T00:00:00',
        },
      ],
    },
    {
      id: 3,
      description: 'Legales',
      orderby: 3,
      date: '2021-05-25T08:49:41.757',
      links: [
        {
          id: 10,
          idseccion: 3,
          link: 'https://www.google.com.co',
          description: 'Términos y condiciones',
          orderby: 1,
          date: '2021-05-27T00:00:00',
        },
        {
          id: 11,
          idseccion: 3,
          link: 'https://www.google.com.co',
          description: 'Términos legales del usuario',
          orderby: 2,
          date: '2021-05-27T00:00:00',
        },
        {
          id: 12,
          idseccion: 3,
          link: 'https://www.google.com.co',
          description: 'Protección de datos',
          orderby: 3,
          date: '2021-05-27T00:00:00',
        },
        {
          id: 13,
          idseccion: 3,
          link: 'https://www.google.com.co',
          description: 'Programa de referidos',
          orderby: 4,
          date: '2021-05-27T00:00:00',
        },
      ],
    },
  ];

  const matDialog = new MatDialogMock();

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        NoopAnimationsModule,
        AdminModule,
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
        { provide: AuthService, useValue: mockAuthService },
        { provide: MatDialog, useValue: matDialog },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();
    mockAuthService.getmenusNoLogin.and.returnValue(of(sectionsLinks));
    mockAuthService.saveMenu.and.returnValue(of(response));
    mockAuthService.deleteMenu.and.returnValue(of(response));
    mockAuthService.saveOrderMenus.and.returnValue(of(response));
    mockAuthService.getMenuClicker.and.returnValue(of(response));
    mockDialog.beforeClosed.and.returnValue(of(response));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deleteNavigationItemService', () => {
    component.currentLink = { id: 1, description: 'test' };
    component.deleteNavigationItemService();
    expect(mockAuthService.deleteMenu).toHaveBeenCalled();
    expect(mockDialog.open).toBeTruthy();
  });

  it('saveOrderItems', () => {
    component.saveOrderItems([{ id: 1, orderBy: 1 }]);
    expect(mockAuthService.saveOrderMenus).toHaveBeenCalled();
  });

  it('getSections', () => {
    component.getSections();
    expect(mockAuthService.getmenusNoLogin).toHaveBeenCalled();
  });

  it('add Navigation Item', () => {
    component.addNavigationItem({});
    expect(mockAuthService.getmenusNoLogin).toHaveBeenCalled();
  });

  it('edit Navigation Item', () => {
    component.editNavigationItem({});
    expect(mockAuthService.getmenusNoLogin).toHaveBeenCalled();
  });

  it('edit change state item', () => {
    component.changeStateOfItem({ active: true });
    expect(mockAuthService.saveMenu).toHaveBeenCalled();
  });
});
