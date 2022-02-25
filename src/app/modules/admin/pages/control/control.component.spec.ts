import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { TranslateModule } from '@ngx-translate/core';

import { ControlComponent } from './control.component';



describe('ControlComponent', () => {
  let component: ControlComponent;
  let fixture: ComponentFixture<ControlComponent>;
  const mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open', 'closeAll', 'afterAllClosed']);
  const mockContentService = jasmine.createSpyObj('ContentService', ['saveMaxReferredIds',]);
  const dataResp = {
    state: 'Success',
  };

  const data = {
    id: 1,
    value: 300,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlComponent],
      imports: [
        TranslateModule.forRoot({}),
      ],
      providers: [
        FormBuilder,
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: ContentService, useValue: mockContentService },
      ]
    }).compileComponents();
    mockContentService.saveMaxReferredIds.and.returnValue(of(dataResp));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save the referals settings', () => {
    component.onSubmit();
    expect(mockContentService.saveMaxReferredIds).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

});
