import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';

import { TopRewardComponent } from './top-reward.component';

describe('TopRewardComponent', () => {
  let component: TopRewardComponent;
  let fixture: ComponentFixture<TopRewardComponent>;

  const mockLinksService = jasmine.createSpyObj('LinksService', ['getLinkHistory']);

  const dataHistory = {
    state: 'Success',
    userMessage: '',
    objectResponse: {
      total: 82,
      linkHistory: [
        {
          commission: 0,
          date: '2020-05-08T16:25:56.977',
          link: 'https://webclickamdev.z13.web.core.windows.net/#/url/pe6etseatL',
          productname: '100123688',
          products: 0,
          visits: 0,
        },
      ],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRewardComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: LinksService, useValue: mockLinksService }
      ]
    })
    .compileComponents();
    mockLinksService.getLinkHistory.and.returnValue(of(dataHistory));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
