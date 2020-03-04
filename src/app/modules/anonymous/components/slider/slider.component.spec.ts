import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from './slider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContentService } from 'src/app/services/content.service';
import { of } from 'rxjs';
import { ProductComponent } from '../product/product.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getNews"
  ]);

  let news = {
    "state": "Success",
    "userMessage": "",
    "objectResponse": {
        "mobile": [
            {
                "imageurl": "https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-1-Clickam-mobile.jpg",
                "description": "Slider 1",
                "link": ""
            },
            {
                "imageurl": "https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-2-Clickam-mobile.jpg",
                "description": "Slider 2",
                "link": "#/click-academy"
            },
            {
                "imageurl": "https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-3-Clickam-mobile.jpg",
                "description": "Slider 3",
                "link": "#/click-academy"
            }
        ],
        "web": [
            {
                "imageurl": "https://webclickamdev.blob.core.windows.net/img-ofertas/slider-web/Slider-1-Clickam-web.jpg",
                "description": "Slider 1",
                "link": ""
            },
            {
                "imageurl": "https://webclickamdev.blob.core.windows.net/img-ofertas/slider-web/Slider-2-Clickam-web.jpg",
                "description": "Slider 2",
                "link": "#/click-academy"
            },
            {
                "imageurl": "https://webclickamdev.blob.core.windows.net/img-ofertas/slider-web/Slider-3-Clickam-web.jpg",
                "description": "Slider 3",
                "link": "#/click-academy"
            }
        ]
    }
}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderComponent, ProductComponent, TruncatePipe ],
      imports: [
        SlickCarouselModule,
        HttpClientTestingModule,
        FlexLayoutModule,
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        }),
      ],
      providers: [
        { provide: ContentService, useValue: mockContentService },
      ]
    })
    .compileComponents();
    mockContentService.getNews.and.returnValue(of(news));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
