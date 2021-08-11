import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCardComponent } from './popup-card.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PopupCardComponent', () => {
  let component: PopupCardComponent;
  let fixture: ComponentFixture<PopupCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupCardComponent],
      imports: [AppMaterialModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formatDate', () => {
    //component.formatDate("2021-06-04T21:44:47.48")
    fixture.detectChanges();
    expect(component.formatDate('2021-06-04T21:44:47.48')).toBe('2021/06/04');
  });

  it('openEdit', () => {
    spyOn(component.edit, 'emit');
    component.openEdit();
    fixture.detectChanges();
    expect(component.edit.emit).toHaveBeenCalledWith();
  });

  it('deletePopup', () => {
    spyOn(component.delete, 'emit');
    component.idPopup = '1';
    component.deletePopup();
    fixture.detectChanges();
    expect(component.delete.emit).toHaveBeenCalledWith({ id: '1' });
  });

  it('showHiddenPopup', () => {
    spyOn(component.setShowHidden, 'emit');
    component.idPopup = '1';
    component.showHidden = true;
    component.showHiddenPopup();
    fixture.detectChanges();
    expect(component.setShowHidden.emit).toHaveBeenCalledWith({
      id: '1',
      active: true,
    });
  });
});
