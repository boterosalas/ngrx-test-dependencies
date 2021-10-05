import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHelpCenterComponent } from './menu-help-center.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { AnonymousModule } from '../../anonymous.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MenuHelpCenterComponent', () => {
  let component: MenuHelpCenterComponent;
  let fixture: ComponentFixture<MenuHelpCenterComponent>;
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
  const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed', 'componentInstance']);
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [],
        imports: [
          TranslateModule.forRoot({}),
          SharedModule,
          AppMaterialModule,
          AnonymousModule,
          BrowserAnimationsModule,
          HttpClientTestingModule,
          RouterTestingModule,
        ],
        providers: [
          { provide: MatDialogRef, useValue: mockDialogRef },
          { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockDialog },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuHelpCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    component.ngOnInit();
    expect(component.questions.length).toBeGreaterThan(1);
    expect(component.offers.length).toBeGreaterThan(1);
    expect(component.reportVisible).toEqual(true);
  });

  it('should create false', () => {
    expect(component).toBeTruthy();
    component.authorization = null;
    component.ngOnInit();
    expect(component.questions.length).toBeGreaterThan(1);
    expect(component.reportVisible).toEqual(false);
  });

  it('show onboarding', () => {
    component.showOnboarding();
    expect(mockDialog.open).toBeTruthy();
  });
});
