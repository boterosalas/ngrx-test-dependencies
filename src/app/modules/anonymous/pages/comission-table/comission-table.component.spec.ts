import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissionTableComponent } from './comission-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ComissionTableComponent', () => {
  let component: ComissionTableComponent;
  let fixture: ComponentFixture<ComissionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule,
      ],
      declarations: [ ComissionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
