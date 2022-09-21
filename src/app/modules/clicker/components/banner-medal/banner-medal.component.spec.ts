import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerMedalComponent } from './banner-medal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';

describe('BannerMedalComponent', () => {
  let component: BannerMedalComponent;
  let fixture: ComponentFixture<BannerMedalComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BannerMedalComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'inicio', component: HomeComponent}
      ]), AppMaterialModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerMedalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
