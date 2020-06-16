import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDataProfileComponent } from './change-data-profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChangeDataProfileComponent', () => {
  let component: ChangeDataProfileComponent;
  let fixture: ComponentFixture<ChangeDataProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports:[
        TranslateModule.forRoot({}),
        SharedModule,
        AppMaterialModule,
        AnonymousModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDataProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
