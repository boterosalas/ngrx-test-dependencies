import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';

import { DialogStoryComponent } from './dialog-story.component';

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

describe('DialogStoryComponent', () => {
  let component: DialogStoryComponent;
  let fixture: ComponentFixture<DialogStoryComponent>;

  const dialogMock = {
    close: () => {},
  };

  const matDialog = new MatDialogMock();

  const mockContentService = jasmine.createSpyObj('ContentService', ['saveStories']);

  const saveActive = {
    state: 'Success',
    userMessage: 'se ha activado el negocio',
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

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogStoryComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AppMaterialModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        NgxMaterialTimepickerModule,
        RouterTestingModule,
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
        { provide: MatDialog, useValue: matDialog },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: ContentService, useValue: mockContentService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('chage date', () => {
    let date = new Date();
    component.storieForm.controls.date.setValue(date);
    component.changeDate();
    expect(component.titleButton).toBe('Programar');
  });

  it('chage date null', () => {
    component.storieForm.controls.date.setValue(null);
    component.changeDate();
    expect(component.titleButton).toBe('Publicar');
  });

  it('on file change', () => {
    const mockFile = new File([''], 'name.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt);
    expect(component.onFileChangeFiles).not.toBeNull();
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve<any>({
        text: 'Extensión erronea',
        type: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'accept-activation-alert-error',
      })
    );
  });

  it('save story', () => {
    mockContentService.saveStories.and.returnValue(of(saveActive));
    component.saveStory();
    expect(mockContentService.saveStories).toHaveBeenCalled();
  });
});
