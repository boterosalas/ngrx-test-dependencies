import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { RemoveTagsPipe } from 'src/app/pipes/remove-tags.pipe';
import { DialogDeleteNotificationComponent } from '../dialog-delete-notification/dialog-delete-notification.component';

import { CardNotificationComponent } from './card-notification.component';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}

describe('CardNotificationComponent', () => {
  let component: CardNotificationComponent;
  let fixture: ComponentFixture<CardNotificationComponent>;

  const router = {
    navigate: jasmine.createSpy('navigate'),
  };

  const data = {
    id: 7,
    datepublish: '2021-07-27T09:55:00',
    datestart: null,
    dateend: null,
    filter: 'PERSONALIZADO',
    idnotification: 8,
    content: 'Holaa prueba excel',
    date: '2021-07-27T09:55:41',
    publish: true,
    title: '¡NO OLVIDES ACTUALIZAR TU INFORMACIÓN BANCARIA!',
    userid: 0,
    viewed: false,
    dateviewed: null,
    url: 'https://webclickamqa.blob.core.windows.net/files-excel/filter-notifications/20210727095539_ImportarNotificaciones.xlsx',
    adminuser: 'Super  Admin'
  };

  const matDialog = new MatDialogMock();

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardNotificationComponent, DialogDeleteNotificationComponent, RemoveTagsPipe],
      imports: [RouterTestingModule, AppMaterialModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [
        {
          provide: Router,
          useValue: router,
        },
        { provide: MatDialogRef, useValue: MatDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialog, useValue: matDialog },
      ],
      schemas: [],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogDeleteNotificationComponent],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNotificationComponent);
    component = fixture.componentInstance;
    component.notification = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Delete notification', () => {
    component.deleteNotification(data.idnotification);
    expect(data.idnotification).not.toBeUndefined();
  });

  it('edit notification', () => {
    const notification = {
      idnotification: '1',
    };
    component.editNotification(notification);
    expect(router.navigate).toHaveBeenCalledWith(['/notificacion', notification.idnotification]);
  });

  it('Download file', () => {
    component.downloadFile(data.url);
    expect(window.open).toBeDefined();
  });
});

