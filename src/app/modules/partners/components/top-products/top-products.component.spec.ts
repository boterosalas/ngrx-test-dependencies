import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

import { TopProductsComponent } from './top-products.component';

describe('TopProductsComponent', () => {
  let component: TopProductsComponent;
  let fixture: ComponentFixture<TopProductsComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['getTop']);

  const top = {
    state: 'Success',
    userMessage: null,
    objectResponse: [
      {
        id: 1,
        description: 'Protección',
        userscategory: 0,
        linkgenerated: 1,
        linkclicked: 0,
        sales: 376200.0,
        comision: 11286.0,
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopProductsComponent],
      imports: [TranslateModule.forRoot(), NgxPaginationModule, HttpClientTestingModule],
      providers: [
        { provide: ContentService, useValue: mockContentService },
      ]
    }).compileComponents();
    mockContentService.getTop.and.returnValue(of(top));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
