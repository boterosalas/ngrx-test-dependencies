import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHistorialComponent } from './table-historial.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NgxPaginationModule } from 'ngx-pagination';

describe('TableHistorialComponent', () => {
  let component: TableHistorialComponent;
  let fixture: ComponentFixture<TableHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableHistorialComponent],
      imports: [TranslateModule.forRoot({}), AppMaterialModule, NgxPaginationModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('table history', () => {
    spyOn(component.dataUser, 'emit');
    component.userInfo([]);
    expect(component.dataUser.emit).toHaveBeenCalled();
  });
});
