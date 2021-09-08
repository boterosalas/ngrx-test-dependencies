import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackNavigationComponent } from './back-navigation.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';

describe('BackNavigationComponent', () => {
  let component: BackNavigationComponent;
  let fixture: ComponentFixture<BackNavigationComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BackNavigationComponent],
      imports: [FlexLayoutModule, AppMaterialModule, TranslateModule.forRoot({})],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close component', () => {
    spyOn(component.close, 'emit');
    component.closeComponent();
    expect(component.close.emit).toHaveBeenCalled();
  });

});
