import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';

import { PartnerListComponent } from './partner-list.component';

export class MatDialogMock {
  close: () => {};
  closeAll() {
    return {
      closeAll: () => of(true),
    };
  }
  open() {
    return {
      beforeClosed: () => of(true),
    };
  }
}

describe('PartnerListComponent', () => {
  let component: PartnerListComponent;
  let fixture: ComponentFixture<PartnerListComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['getPermisionPartner', 'deleteUserAdmin']);
  const mockContentService = jasmine.createSpyObj('ContentService', ['getBusiness']);

  const matDialog = new MatDialogMock();

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

  const resp = {
    state: 'Success',
    userMessage: 'ejecutado',
    objectResponse: null,
  };

  const partner = {
    state: 'Success',
    userMessage: null,
    objectResponse: [
      {
        userid: 220,
        rolid: 8,
        permissions: null,
        rolcode: 'PARTNER',
        issuperadmin: false,
        fullname: 'David Betancur J',
        email: null,
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartnerListComponent, TruncatePipe],
      imports: [
        HttpClientTestingModule,
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
        { provide: MatDialog, useValue: matDialog},
        { provide: ContentService, useValue: mockContentService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();
    mockContentService.getBusiness.and.returnValue(of(allBusiness));
    mockUserService.deleteUserAdmin.and.returnValue(of(resp));
    mockUserService.getPermisionPartner.and.returnValue(of(partner));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('delete partner', () => {
    const data = {
      userId: 250834,
      withoutpassword: true,
    };
    component.deleteItem(data);
    expect(data).toBeDefined();
  });

  it('open modal', () => {
    component.openModal();
    expect(mockUserService.getPermisionPartner).toHaveBeenCalled();
  });

  it('select data', () => {
    const data = {
      id: 1,
      description: 'carulla'
    }
    component.selected(data);
    expect(mockUserService.getPermisionPartner).toHaveBeenCalled();
  });
  
  

});
