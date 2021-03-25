import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBlogAdminComponent } from './add-edit-blog-admin.component';

describe('AddEditBlogAdminComponent', () => {
  let component: AddEditBlogAdminComponent;
  let fixture: ComponentFixture<AddEditBlogAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditBlogAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBlogAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
