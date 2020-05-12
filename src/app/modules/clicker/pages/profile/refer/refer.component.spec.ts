import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferComponent } from './refer.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ClickerModule } from '../../../clicker.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReferComponent', () => {
  let component: ReferComponent;
  let fixture: ComponentFixture<ReferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        SharedModule,
        ClickerModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
