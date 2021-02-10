import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { BussinessAdminComponent } from './bussiness-admin.component';

describe('BussinessAdminComponent', () => {
  let component: BussinessAdminComponent;
  let fixture: ComponentFixture<BussinessAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BussinessAdminComponent],
      imports: [
        AppMaterialModule,
        SharedModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        AppMaterialModule,
        MatSlideToggleModule,
        FormsModule,
        DragDropModule,
        ReactiveFormsModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
