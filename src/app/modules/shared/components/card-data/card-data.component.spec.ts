import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDataComponent } from './card-data.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

describe('CardDataComponent', () => {
  let component: CardDataComponent;
  let fixture: ComponentFixture<CardDataComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardDataComponent],
      imports: [TranslateModule.forRoot(), AppMaterialModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
