import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHistoricalLinksComponent } from './table-historical-links.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TableHistoricalLinksComponent', () => {
  let component: TableHistoricalLinksComponent;
  let fixture: ComponentFixture<TableHistoricalLinksComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TableHistoricalLinksComponent],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot(),
        SharedModule,
        NgxPaginationModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHistoricalLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
