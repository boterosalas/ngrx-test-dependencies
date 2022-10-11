import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LocationHref } from 'src/app/helpers/window-location';
import { QrComponent } from './qr.component';

describe('QrComponent', () => {
  let component: QrComponent;
  let fixture: ComponentFixture<QrComponent>;
  let locationSpy: jasmine.Spy;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    locationSpy = spyOn(LocationHref, 'redirect').and.callFake(() => true);
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

  it('Test redirect', () => {
    component.detectStore();
    expect(locationSpy).toHaveBeenCalled();
  });
});
