import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [ReactiveFormsModule, FormsModule, AppMaterialModule, BrowserAnimationsModule, TranslateModule.forRoot({})],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call cleanSearch when call handleSearch', () => {
    component.isSearching = true;
    const cleanSearchSpy = spyOn(component,'cleanSearch').and.callFake(()=>true);
    component.handleSearch();
    expect(cleanSearchSpy).toHaveBeenCalled();
  });

  it('Should call searchProduct when call handleSearch', () => {
    component.isSearching = false;
    const searchProductSpy = spyOn(component,'searchProduct').and.callFake(()=>true);
    component.handleSearch();
    expect(searchProductSpy).toHaveBeenCalled();
  });

  it('Should emit search', () => {
    component.searchForm.controls.search.setValue('leche');
    const searchSpy = spyOn(component.search,'emit').and.callFake(()=>true);
    component.searchProduct();
    expect(searchSpy).toHaveBeenCalled();
    expect(component.isSearching).toBe(true);
  });
  
  it('Should clean Search', () => {
    component.cleanSearch();
    expect(component.searchForm.controls.search.value).toBe('');
    expect(component.isSearching).toBe(false);
  })
});
