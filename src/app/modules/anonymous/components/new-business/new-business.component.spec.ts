import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusinessComponent } from './new-business.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { HomeComponent } from '../../pages/home/home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NewBusinessComponent', () => {
  let component: NewBusinessComponent;
  let fixture: ComponentFixture<NewBusinessComponent>;

beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [NewBusinessComponent],
      imports: [TranslateModule.forRoot(), AppMaterialModule, RouterTestingModule.withRoutes([
        { path: 'inicio', component: HomeComponent}
      ])],
      schemas:[NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
