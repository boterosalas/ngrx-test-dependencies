import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowWorksComponent } from './how-works.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../../../home/home.component';

describe('HowWorksComponent', () => {
  let component: HowWorksComponent;
  let fixture: ComponentFixture<HowWorksComponent>;

beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        TranslateModule.forRoot({}),
        SharedModule,
        AppMaterialModule,
        AnonymousModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
