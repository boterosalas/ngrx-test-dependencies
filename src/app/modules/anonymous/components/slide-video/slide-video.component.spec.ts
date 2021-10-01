import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideVideoComponent } from './slide-video.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ShareModule } from '@ngx-share/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterTestingModule } from '@angular/router/testing';

describe('SlideVideoComponent', () => {
  let component: SlideVideoComponent;
  let fixture: ComponentFixture<SlideVideoComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SlideVideoComponent],
      imports: [
        SlickCarouselModule,
        FlexLayoutModule,
        AppMaterialModule,
        ShareModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            allowedDomains: [],
            disallowedRoutes: [],
          },
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open video', () => {
    let data = {
      video: 'RWQQ-OVkVpI',
      title: 'video modal',
      id: 'modal',
    };

    component.openVideo(data);
    expect(data).toBeDefined();
    component.next();
    expect(component.next).toBeTruthy();
    component.prev();
    expect(component.prev).toBeTruthy();
  });
});
