import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationHref } from 'src/app/helpers/window-location';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HomeComponent } from '../home/home.component';

import { DownloadAppComponent } from './download-app.component';

describe('DownloadAppComponent', () => {
  let component: DownloadAppComponent;
  let fixture: ComponentFixture<DownloadAppComponent>;
  let locationSpy: jasmine.Spy;
  // beforeAll(() => {
  //   window.onbeforeunload = () => true;
  // });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadAppComponent],
      imports: [
        AppMaterialModule,
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: 'inicio', component: HomeComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadAppComponent);
    component = fixture.componentInstance;
    locationSpy = spyOn(LocationHref, 'redirect').and.callFake(
      () => true
    );
    fixture.detectChanges();
  });
  
  it('should create', () => {
    spyOn(component, 'redirectTo').and.stub();
    expect(component).toBeTruthy();
  });
  it('Should redirect', () => {
    component.userAgent = 'iphone ipad';
    component.ngOnInit();
    expect(locationSpy).toHaveBeenCalled();
  });
});
