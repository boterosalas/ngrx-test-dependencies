import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import moment from 'moment';
import { of } from 'rxjs';
import { TrimPipe } from 'src/app/pipes/trim.pipe';
import { ContentService } from 'src/app/services/content.service';

import { ListBlogsComponent } from './list-blogs.component';

describe('ListBlogsComponent', () => {
  let component: ListBlogsComponent;
  let fixture: ComponentFixture<ListBlogsComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['getBlogs']);

  const response = {
    Status: 'Success',
    objectResponse: {
      blogs: [
        {
          title: 'Any',
          content: 'Anyd',
          author: 'Any3',
          tags: 'Anss',
          visible: 'true',

          date: moment('12-01-2020'),
          imageurl: '',
        },
      ],
      total: 1,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBlogsComponent, TrimPipe ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [{ provide: ContentService, useValue: mockContentService }],
    })
    .compileComponents();
    mockContentService.getBlogs.and.returnValue(of(response));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
