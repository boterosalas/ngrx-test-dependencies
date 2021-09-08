import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBlogComponent } from './new-blog.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewBlogComponent', () => {
  let component: NewBlogComponent;
  let fixture: ComponentFixture<NewBlogComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NewBlogComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule.withRoutes([]), AppMaterialModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
