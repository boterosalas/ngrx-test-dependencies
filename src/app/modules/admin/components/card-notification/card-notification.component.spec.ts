import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { RemoveTagsPipe } from 'src/app/pipes/remove-tags.pipe';
import { ContentService } from 'src/app/services/content.service';
import { DialogDeleteNotificationComponent } from '../dialog-delete-notification/dialog-delete-notification.component';

import { CardNotificationComponent } from './card-notification.component';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}

xdescribe('CardNotificationComponent', () => {
  let component: CardNotificationComponent;
  let fixture: ComponentFixture<CardNotificationComponent>;

  let router = {
    navigate: jasmine.createSpy('navigate'),
  };

  let data = {
    url: 'https://www.google.com',
  };

  const matDialog = new MatDialogMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardNotificationComponent, DialogDeleteNotificationComponent, RemoveTagsPipe],
      imports: [RouterTestingModule, AppMaterialModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [
        {
          provide: Router,
          useValue: router,
        },
        { provide: MatDialogRef, useValue: data },
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: matDialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
    component.url = '';
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Delete notification', () => {
    let notification = {
      idnotification: '1',
    };
    component.deleteNotification(notification);
    expect(notification.idnotification).not.toBeUndefined();
  });

  it('edit notification', () => {
    let notification = {
      idnotification: '1',
    };
    component.editNotification(notification);
    expect(router.navigate).toHaveBeenCalledWith(['/notificacion', notification.idnotification]);
  });

  it('Download file', () => {
    let notification = {
      url: 'https://www.google.com',
    };
    component.downloadFile(notification);
    expect(window.open).toBeDefined();
  });
});
function of(arg0: boolean) {
  throw new Error('Function not implemented.');
}
