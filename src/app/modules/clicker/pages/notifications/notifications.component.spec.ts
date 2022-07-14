import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';
import { ContentService } from 'src/app/services/content.service';
import { ClickerModule } from '../../clicker.module';

import { NotificationsComponent } from './notifications.component';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['getNotificationAdmin', 'viewNotification', 'deleteNotificationUser']);

  let response = {
    state: 'Success',
    userMessage: 'Se han guardado los cambios satisfactoriamente',
    objectResponse: null,
  };

  let respGetNotification = {
    state: 'Success',
    userMessage: null,
    objectResponse: {
      scheduled: [
        {
          id: 1,
          datepublish: '2021-07-23T16:00:00',
          datestart: null,
          dateend: null,
          filter: 'PERSONALIZADO',
          idnotification: 1,
          content: 'ppppp',
          date: '2021-07-22T16:45:02',
          publish: false,
          title: 'programada editada 2',
          userid: 0,
          viewed: false,
          dateviewed: null,
          url: 'https://webclickamdev.blob.core.windows.net/files-excel/filter-notifications/20210722164501_ImportarNotificaciones.xlsx',
        },
      ],
      published: [
        {
          id: 2,
          datepublish: null,
          datestart: null,
          dateend: null,
          filter: 'PERSONALIZADO',
          idnotification: 5,
          content: 'file',
          date: '2021-07-22T17:01:14',
          publish: true,
          title: 'file',
          userid: 0,
          viewed: false,
          dateviewed: null,
          url: 'https://webclickamdev.blob.core.windows.net/files-excel/filter-notifications/20210722170113_ImportarNotificaciones.xlsx',
        },
      ],
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [],
        imports: [ClickerModule, RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]), HttpClientTestingModule, BrowserAnimationsModule],
        schemas:[NO_ERRORS_SCHEMA],
        providers: [{ provide: ContentService, useValue: mockContentService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    mockContentService.getNotificationAdmin.and.returnValue(of(respGetNotification));
    mockContentService.viewNotification.and.returnValue(of(response));
    mockContentService.deleteNotificationUser.and.returnValue(of(response));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockContentService.getNotificationAdmin).toHaveBeenCalled();
  });

  it('show notification', () => {
    let data = {
      title: 'test',
      date: '21/21/21',
      content: 'prueba',
      id: '1',
    };
    component.showNotification(data);
    component.innerWidth = 500;
    expect(mockContentService.viewNotification).toHaveBeenCalled();
  });

  it('delete notification', () => {
    component.deleteNotication();
    expect(mockContentService.deleteNotificationUser).toHaveBeenCalled();
  });

  it('on checked true', () => {
    component.onCheckChange({ checked: true, source: { value: 1 } });
    expect(component.formArray.length).toBeGreaterThan(0);
  });

  it('view notification', () => {
    component.viewNotification({ value: 'prueba' });
    expect(mockContentService.viewNotification).toHaveBeenCalled();
  });

  it('viewedall', () => {
    component.viewedAll();
    component.formArray.push(1);
    expect(component.formArray.length).toBeGreaterThan(0);
    component.formArray.forEach((element) => {
      expect(element).not.toBeUndefined();
    });
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
