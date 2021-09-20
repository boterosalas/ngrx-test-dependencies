import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsersComponent } from './search-users.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchUsersComponent', () => {
  let component: SearchUsersComponent;
  let fixture: ComponentFixture<SearchUsersComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchUsersComponent],
      imports: [ReactiveFormsModule, FormsModule, AppMaterialModule, TranslateModule.forRoot({}), BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search product', () => {
    spyOn(component.search, 'emit');
    component.searchForm.controls.search.setValue('hello');
    // trigger the click
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.search.emit).toHaveBeenCalledWith('hello');
  });
});
