import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIconsClickamComponent } from './report-icons-clickam.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReportIconsClickamComponent', () => {
  let component: ReportIconsClickamComponent;
  let fixture: ComponentFixture<ReportIconsClickamComponent>;

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
    fixture = TestBed.createComponent(ReportIconsClickamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
