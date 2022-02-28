import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { ControlComponent } from './control.component';
import { ContentService } from '../../../../services/content.service';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



describe('ControlComponent', () => {
  let component: ControlComponent;
  let fixture: ComponentFixture<ControlComponent>;
  const mockContentService = jasmine.createSpyObj('ContentService', [
    'saveMaxReferredIds',
    'getMaximumReferredIds',
  ]);
  const dataResp = {
    state: 'Success',
  };
  const referredIds = 3;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlComponent],
      imports: [
        TranslateModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: ContentService, useValue: mockContentService },
      ]
    }).compileComponents();
    mockContentService.saveMaxReferredIds.and.returnValue(of(dataResp));
    mockContentService.getMaximumReferredIds.and.returnValue(of(3));
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
  });

});
