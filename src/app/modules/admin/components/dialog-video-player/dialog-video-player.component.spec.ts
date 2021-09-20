import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVideoPlayerComponent } from './dialog-video-player.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs/internal/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContentService } from 'src/app/services/content.service';

describe('DialogCategoryComponent', () => {
  let component: DialogVideoPlayerComponent;
  let fixture: ComponentFixture<DialogVideoPlayerComponent>;
  let component2: DialogVideoPlayerComponent;
  let fixture2: ComponentFixture<DialogVideoPlayerComponent>;
  const mockContentService = jasmine.createSpyObj('ContentService', ['addCategory']);
  const dialogMock = {
    close: () => {},
  };
  const resp = {
    state: 'Success',
    userMessage: 'se ha actualizado el email',
    objectResponse: [],
  };
beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogVideoPlayerComponent, TruncatePipe],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: [],
          },
        }),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: ContentService, useValue: mockContentService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    mockContentService.addCategory.and.returnValue(of(resp));
  }));
  beforeEach(() => {
    //spyOn(String.prototype, "split");
    fixture = TestBed.createComponent(DialogVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
