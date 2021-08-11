import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackNavigationComponent } from './back-navigation.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from '../../app-material/app-material.module';

describe('BackNavigationComponent', () => {
  let component: BackNavigationComponent;
  let fixture: ComponentFixture<BackNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BackNavigationComponent],
      imports: [FlexLayoutModule, AppMaterialModule],
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
