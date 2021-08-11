import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableUsersComponent } from './table-users.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

describe('TableUsersComponent', () => {
  let component: TableUsersComponent;
  let fixture: ComponentFixture<TableUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableUsersComponent],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot({}),
        BrowserAnimationsModule,
        NgxPaginationModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('user info', () => {
    spyOn(component.dataUser, 'emit');
    component.userInfo([]);
    expect(component.dataUser.emit).toHaveBeenCalled();
  });

  it('sort data', () => {
    spyOn(component.sortDataUser, 'emit');
    component.sortData([]);
    expect(component.sortDataUser.emit).toHaveBeenCalled();
  });
});
