import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';
import { ClickerModule } from '../../../clicker.module';

import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ClickerModule,  RouterTestingModule.withRoutes([
        { path: 'inicio', component: HomeComponent}
      ]), HttpClientTestingModule, TranslateModule.forRoot({})],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
