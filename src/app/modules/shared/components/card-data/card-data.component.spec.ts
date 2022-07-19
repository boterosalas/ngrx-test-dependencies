import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDataComponent } from './card-data.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';

describe('CardDataComponent', () => {
  let component: CardDataComponent;
  let fixture: ComponentFixture<CardDataComponent>;

beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [CardDataComponent],
      imports: [TranslateModule.forRoot(), AppMaterialModule, RouterTestingModule.withRoutes([
        { path: 'inicio', component: HomeComponent}
      ])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
