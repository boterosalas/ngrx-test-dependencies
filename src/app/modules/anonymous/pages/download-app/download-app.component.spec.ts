import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationHref } from 'src/app/helpers/window-location';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HomeComponent } from '../home/home.component';

import { DownloadAppComponent } from './download-app.component';

// mock the window object
let mockWindow = { location: { assign: '' } };

xdescribe('DownloadAppComponent', () => {
  let component: DownloadAppComponent;
  let fixture: ComponentFixture<DownloadAppComponent>;
  let locationSpy: jasmine.Spy;

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
    locationSpy = spyOn(LocationHref, 'redirect').and.callFake(() => true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should redirect', () => {
    component.userAgent = 'iphone ipad';
    component.ngOnInit();
    expect(locationSpy).toHaveBeenCalled();
  });
});
