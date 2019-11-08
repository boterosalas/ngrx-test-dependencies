import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHistorialComponent } from './table-historial.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

describe('TableHistorialComponent', () => {
  let component: TableHistorialComponent;
  let fixture: ComponentFixture<TableHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableHistorialComponent ],
      imports: [
        TranslateModule.forRoot({}),
        AppMaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
