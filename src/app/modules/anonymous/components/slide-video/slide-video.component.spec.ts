import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideVideoComponent } from './slide-video.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ShareModule } from '@ngx-share/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { JwtModule } from '@auth0/angular-jwt';

describe('SlideVideoComponent', () => {
  let component: SlideVideoComponent;
  let fixture: ComponentFixture<SlideVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideVideoComponent ],
      imports: [
        SlickCarouselModule,
        FlexLayoutModule,
        AppMaterialModule,
        ShareModule,
        SharedModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem("ACCESS_TOKEN");
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
