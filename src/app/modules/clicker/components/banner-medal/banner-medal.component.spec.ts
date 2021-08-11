import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerMedalComponent } from './banner-medal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

describe('BannerMedalComponent', () => {
  let component: BannerMedalComponent;
  let fixture: ComponentFixture<BannerMedalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BannerMedalComponent],
      imports: [RouterTestingModule.withRoutes([]), AppMaterialModule],
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
