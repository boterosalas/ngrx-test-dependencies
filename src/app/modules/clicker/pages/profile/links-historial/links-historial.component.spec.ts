import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksHistorialComponent } from './links-historial.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ClickerModule } from '../../../clicker.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LinksHistorialComponent', () => {
  let component: LinksHistorialComponent;
  let fixture: ComponentFixture<LinksHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports:[
        SharedModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        AppMaterialModule,
        ClickerModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
