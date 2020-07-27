import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActivateBusinessComponent } from './table-activate-business.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

describe('TableActivateBusinessComponent', () => {
  let component: TableActivateBusinessComponent;
  let fixture: ComponentFixture<TableActivateBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableActivateBusinessComponent ],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot(),
        MatSlideToggleModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableActivateBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});