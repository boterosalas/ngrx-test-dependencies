import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

import { TableNoveltiesComponent } from './table-novelties.component';

describe('TableNoveltiesComponent', () => {
  let component: TableNoveltiesComponent;
  let fixture: ComponentFixture<TableNoveltiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableNoveltiesComponent],
      imports: [AppMaterialModule, TranslateModule.forRoot({}), BrowserAnimationsModule, NgxPaginationModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableNoveltiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
