import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDetailComissionComponent } from './table-detail-comission.component';
import { TranslateModule } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

describe('TableDetailComissionComponent', () => {
  let component: TableDetailComissionComponent;
  let fixture: ComponentFixture<TableDetailComissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableDetailComissionComponent],
      imports: [TranslateModule.forRoot(), AppMaterialModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDetailComissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
