import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ContentService } from 'src/app/services/content.service';
import { AdminModule } from '../../admin.module';

import { DialogFaqGroupComponent } from './dialog-faq-group.component';

describe('DialogFaqGroupComponent', () => {
  let component: DialogFaqGroupComponent;
  let fixture: ComponentFixture<DialogFaqGroupComponent>;
  const mockContentService = jasmine.createSpyObj('ContentService', ['saveFaqgroups']);
  const dialogMock = {
    close: () => {},
  };

  const response = {
    state: 'Success',
    userMessage: '',
    objectResponse: [],
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DialogFaqGroupComponent],
        imports: [
          ReactiveFormsModule,
          FormsModule,
          HttpClientTestingModule,
          TranslateModule.forRoot({}),
          BrowserAnimationsModule,
          AppMaterialModule,
        ],
        providers: [
          { provide: MatDialogRef, useValue: dialogMock },
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: ContentService, useValue: mockContentService },
        ],
      }).compileComponents();
      mockContentService.saveFaqgroups.and.returnValue(of(response));
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFaqGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save faq group', () => {
    component.saveFaqGroup();
    expect(mockContentService.saveFaqgroups).toHaveBeenCalled();
  });
});
