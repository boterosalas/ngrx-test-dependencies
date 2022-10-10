import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { empty, Observable } from 'rxjs';
import { LoginformComponent } from 'src/app/modules/anonymous/components/loginform/loginform.component';
// import 'rxjs/add/observable/empty';

import { QrComponent } from './qr.component';

describe('QrComponent', () => {
  let component: QrComponent;
  let fixture: ComponentFixture<QrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrComponent],
      imports: [RouterTestingModule.withRoutes([{ path: 'inicio', component: LoginformComponent }])],
    }).compileComponents();

    fixture = TestBed.createComponent(QrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Open to close with close cross', () => {
    const qrCloseButton = fixture.debugElement.query(By.css('div.qr__cross'));
    qrCloseButton.nativeElement.click();
    expect(component.isQrOpen).toBeFalse();
  });
  it('Close to open with button', () => {
    const qrToggleButton = fixture.debugElement.query(By.css('div.qr__toggle-button'));
    qrToggleButton.nativeElement.click();
    qrToggleButton.nativeElement.click();
    expect(component.isQrOpen).toBeTrue();
  });
  it('Click on open store with hidden element', () => {
    component.isQrOpen = false;
    component.detectStore();
    expect(component.isQrOpen).toBeTrue();
  });
  it('Call open store method', () => {
    spyOn(component, 'detectStore');
    const downloadAppTitle = fixture.debugElement.query(By.css('span.download-app__title'));
    downloadAppTitle.nativeElement.click();
    expect(component.detectStore).toHaveBeenCalled();
  });
  it('Redirect to play store', () => {
    const window = { location: { href: '' } };
    component.redirectToStore(window, 'https://www.example.com');
    expect(window.location.href).toBe('https://www.example.com');
  });
  it('RedirectTo called', () => {
    spyOn(component, 'redirectToStore');
    const downloadAppTitle = fixture.debugElement.query(By.css('span.download-app__title'));
    downloadAppTitle.nativeElement.click();
    expect(component.redirectToStore).toHaveBeenCalled();
  });
});
