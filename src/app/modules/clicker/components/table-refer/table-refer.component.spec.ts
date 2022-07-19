import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReferComponent } from './table-refer.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

describe('TableReferComponent', () => {
  let component: TableReferComponent;
  let fixture: ComponentFixture<TableReferComponent>;

beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [TableReferComponent],
      imports: [TranslateModule.forRoot(), AppMaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableReferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
