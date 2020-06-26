import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBussinessComponent } from './table-bussiness.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';

describe('TableBussinessComponent', () => {
  let component: TableBussinessComponent;
  let fixture: ComponentFixture<TableBussinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBussinessComponent ],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
