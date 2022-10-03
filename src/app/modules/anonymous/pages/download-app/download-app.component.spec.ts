import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HomeComponent } from '../home/home.component';

import { DownloadAppComponent } from './download-app.component';

// mock the window object
let mockWindow = { location: { assign: '' } };

describe('DownloadAppComponent', () => {
  let component: DownloadAppComponent;
  let fixture: ComponentFixture<DownloadAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadAppComponent],
      imports: [
        AppMaterialModule,
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: 'inicio', component: HomeComponent }]),
      ],
      providers: [{ provide: 'Window', useValue: mockWindow }],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should test window open event', () => {
  //   component.userAgent = 'iPhone iPad';
  //   const appStore = 'https://apps.apple.com/co/app/clickam/id1495823258';
  //   const playStore = 'https://play.google.com/store/apps/details?id=com.clickam.appcompania';
  //   component.ngOnInit();
  //   // console.log('User agent: ', component.userAgent);
  //   // expect(window.location.href).toEqual(appStore);
  // });
});
