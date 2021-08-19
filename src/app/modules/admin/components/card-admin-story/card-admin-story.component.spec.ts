import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';
import { StoriesComponent } from '../../pages/stories/stories.component';
import { DialogStoryComponent } from '../dialog-story/dialog-story.component';

import { CardAdminStoryComponent } from './card-admin-story.component';

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

describe('CardAdminStoryComponent', () => {
  let component: CardAdminStoryComponent;
  let fixture: ComponentFixture<CardAdminStoryComponent>;

  const dialogMock = {
    close: () => {},
  };

  const matDialog = new MatDialogMock();

  const mockContentService = jasmine.createSpyObj('ContentService', ['deleteStories', 'getBusiness','getStoriesadmin']);

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
      infoaditional: 'Ahora 10% de comisión',
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
    userMessage: '',
    objectResponse: [],
  };

  const data = {
    description: 'e1',
    id: 43,
    imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/stories/20210806082635.jpg',
    link: null,
    idbusiness: 1,
    infoaditional: null,
    active: true,
    orderby: null,
    date: '2021-08-06T08:26:35.433',
    new: false,
    datepublish: null,
    extension: 'jpg',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardAdminStoryComponent, DialogStoryComponent],
      imports: [
        AppMaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot({}),
        NgxMaterialTimepickerModule,
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
        StoriesComponent,
        { provide: ContentService, useValue: mockContentService },
        { provide: MatDialog, useValue: matDialog },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogStoryComponent],
        },
      })
      .compileComponents();
    mockContentService.deleteStories.and.returnValue(of(resp));
    mockContentService.getStoriesadmin.and.returnValue(of(resp));
    mockContentService.getBusiness.and.returnValue(of(allBusiness));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAdminStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check change', () => {
    const event = {
      checked: false,
      source: {
        value: 1,
      },
    };
    fixture.detectChanges();
    component.onCheckChange(event);
  });

  it('edit story', () => {
    component.editStory(data);
    expect(data).not.toBeUndefined();
  });

  it('preview', () => {
    component.previewItem(0);
    expect(data).not.toBeUndefined();
  });

  it('delete story', () => {
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve<any>({
        html: "<h3 class='delete-title-comision'>Eliminar contenido</h3> <p class='w-container'>¿Estás seguro de eliminar el contenido seleccionado?</p>",
        confirmButtonText: 'Eliminar contenido',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonClass: 'updateokdelete order-last',
        cancelButtonClass: 'updatecancel',
        allowOutsideClick: false,
        type: 'success',
      })
    );
    component.deleteStory(data);
    expect(data).not.toBeUndefined();
  });

  it('get business', () => {
    component.getBusiness();
    expect(mockContentService.getBusiness).toHaveBeenCalled();
  });


});
