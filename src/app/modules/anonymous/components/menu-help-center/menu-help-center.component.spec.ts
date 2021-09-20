import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHelpCenterComponent } from './menu-help-center.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { AnonymousModule } from '../../anonymous.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('MenuHelpCenterComponent', () => {
  let component: MenuHelpCenterComponent;
  let fixture: ComponentFixture<MenuHelpCenterComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        TranslateModule.forRoot({}),
        SharedModule,
        AppMaterialModule,
        AnonymousModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuHelpCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.questions.length).toBeGreaterThan(1);
  });
});
