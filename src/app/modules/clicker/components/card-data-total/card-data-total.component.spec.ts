import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDataTotalComponent } from './card-data-total.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

describe('CardDataComponent', () => {
  let component: CardDataTotalComponent;
  let fixture: ComponentFixture<CardDataTotalComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardDataTotalComponent],
      imports: [TranslateModule.forRoot(), AppMaterialModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDataTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
