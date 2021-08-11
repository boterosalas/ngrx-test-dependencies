import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationMenuClickerComponent } from './navigation-menu-clicker.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import 'zone.js/dist/zone-testing';
import { AdminModule } from '../../admin.module';
import { AuthService } from 'src/app/services/auth.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

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

describe('NavigationMenuClickerComponent', () => {
  let component: NavigationMenuClickerComponent;
  let fixture: ComponentFixture<NavigationMenuClickerComponent>;

  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' }; // attach componentInstance to the spy object...

  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'beforeClosed']);

  const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed', 'componentInstance', 'event ', 'beforeClosed']);

  let response = {
    Status: 'Success',
  };

  const dialogMock = {
    close: () => {},
    beforeClosed: () => {},
  };

  const matDialog = new MatDialogMock();

  const mockAuthService = jasmine.createSpyObj('AuthService', [
    'saveOrderMenus',
    'saveOrderGrupoMenus',
    'getMenuClicker',
    'deleteGroup',
    'deleteMenu',
    'saveMenu',
  ]);

  const sectionsLinks = [
    {
      id: 0,
      description: 'Sin Grupo',
      icon: '',
      orderby: null,
      menus: [
        {
          Id: 1,
          name: 'Inicio',
          route: '/inicio',
          orderby: 1,
          idgrupo: null,
          icon: 'tio-link',
          rol: null,
          active: true,
          menusystem: true,
        },
        {
          Id: 2,
          name: 'Mi perfil',
          route: '/mi-perfil',
          orderby: 2,
          idgrupo: null,
          icon: 'tio-link',
          rol: null,
          active: true,
          menusystem: true,
        },
        {
          Id: 13,
          name: 'Tabla de Comisiones ',
          route: '/tabla-comisiones',
          orderby: 3,
          idgrupo: null,
          icon: 'tio-link',
          rol: null,
          active: true,
          menusystem: true,
        },
        {
          Id: 66,
          name: 'Negocios',
          route: '/negocios',
          orderby: 3,
          idgrupo: null,
          icon: 'tio-link',
          rol: null,
          active: true,
          menusystem: false,
        },
        {
          Id: 7,
          name: 'Centro de Ayuda',
          route: '/centro-de-ayuda',
          orderby: 5,
          idgrupo: null,
          icon: 'tio-fingerprint',
          rol: null,
          active: false,
          menusystem: true,
        },
      ],
    },
    {
      id: 24,
      description: 'Clickam',
      icon: 'tio-dollar',
      orderby: null,
      menus: [
        {
          Id: 4,
          name: 'Blog',
          route: '/blog',
          orderby: 2,
          idgrupo: 24,
          icon: 'tio-link',
          rol: null,
          active: true,
          menusystem: true,
        },
        {
          Id: 3,
          name: 'Click Academy',
          route: '/click-academy',
          orderby: 6,
          idgrupo: 24,
          icon: 'tio-link',
          rol: null,
          active: false,
          menusystem: true,
        },
      ],
    },
    {
      id: 23,
      description: 'Herramientas',
      icon: null,
      orderby: null,
      menus: [
        {
          Id: 52,
          name: 'Refiere y gana',
          route: '/referidos',
          orderby: null,
          idgrupo: 23,
          icon: 'tio-link',
          rol: null,
          active: false,
          menusystem: false,
        },
        {
          Id: 79,
          name: 'Navegación',
          route: '/navegacion',
          orderby: null,
          idgrupo: 23,
          icon: 'tio-link',
          rol: null,
          active: false,
          menusystem: false,
        },
        {
          Id: 5,
          name: 'Biblioteca de Contenido',
          route: '/biblioteca',
          orderby: 5,
          idgrupo: 23,
          icon: 'tio-link',
          rol: null,
          active: false,
          menusystem: true,
        },
        {
          Id: 8,
          name: 'Reportes',
          route: '/reportes',
          orderby: 7,
          idgrupo: 23,
          icon: 'tio-link',
          rol: null,
          active: true,
          menusystem: true,
        },
        {
          Id: 12,
          name: 'Historial de Links',
          route: '/historial-links',
          orderby: 8,
          idgrupo: 23,
          icon: 'tio-link',
          rol: null,
          active: false,
          menusystem: true,
        },
      ],
    },
  ];

  beforeEach(async(() => {
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
            whitelistedDomains: [],
            blacklistedRoutes: [],
          },
        }),
      ],
      providers: [
        { provide: MatDialog, useValue: matDialog },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();
    mockAuthService.getMenuClicker.and.returnValue(of(sectionsLinks));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationMenuClickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save order items', () => {
    let data = [
      { id: 1, orderBy: 1 },
      { id: 2, orderBy: 2 },
      { id: 13, orderBy: 3 },
    ];
    mockAuthService.saveOrderMenus.and.returnValue(of(response));
    component.saveOrderItems(data);
    expect(mockAuthService.saveOrderMenus).toHaveBeenCalled();
  });

  it('save order sections', () => {
    let data = [
      { id: 1, orderBy: 1 },
      { id: 2, orderBy: 2 },
      { id: 13, orderBy: 3 },
    ];
    mockAuthService.saveOrderGrupoMenus.and.returnValue(of(response));
    component.saveOrderSections(data);
    expect(mockAuthService.saveOrderGrupoMenus).toHaveBeenCalled();
  });

  it('add section', () => {
    component.addSection();
    expect(mockAuthService.getMenuClicker).toHaveBeenCalled();
  });

  it('edit Navigation Group', () => {
    component.editNavigationGroup({});
    expect(mockAuthService.getMenuClicker).toHaveBeenCalled();
  });

  it('add Navigation Item', () => {
    component.addNavigationItem({});
    expect(mockAuthService.getMenuClicker).toHaveBeenCalled();
  });

  it('edit Navigation Item', () => {
    component.editNavigationItem({});
    expect(mockAuthService.getMenuClicker).toHaveBeenCalled();
  });
});
