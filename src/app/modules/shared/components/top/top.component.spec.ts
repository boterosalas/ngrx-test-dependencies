import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopComponent } from './top.component';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TopComponent', () => {
  let component: TopComponent;
  let fixture: ComponentFixture<TopComponent>;

beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [TopComponent],
      imports: [AppMaterialModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopComponent);
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
