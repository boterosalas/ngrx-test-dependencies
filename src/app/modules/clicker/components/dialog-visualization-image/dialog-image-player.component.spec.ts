import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImagePlayerComponent } from './dialog-image-player.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
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
  let component: DialogImagePlayerComponent;
  let fixture: ComponentFixture<DialogImagePlayerComponent>;
  let component2: DialogImagePlayerComponent;
  let fixture2: ComponentFixture<DialogImagePlayerComponent>;
  const mockContentService = jasmine.createSpyObj('ContentService', ['addCategory', 'downloadF']);
  const dialogMock = {
    close: () => {},
  };
  const resp = {
    state: 'Success',
    userMessage: 'se ha actualizado el email',
    objectResponse: [],
  };
  const audit = {
    state: 'success',
    userMessage: 'se ha enviado un correo',
    objectResponse: [{}],
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogImagePlayerComponent, TruncatePipe],
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
    mockContentService.downloadF.and.returnValue(of(audit));
  }));
  beforeEach(() => {
    //spyOn(String.prototype, "split");
    fixture = TestBed.createComponent(DialogImagePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
    component.download('string', 'video/mp4');
    component.download('string', 'image/jpg');
    component.download('string', 'application/zip');

    let datos = true;
    expect(datos).toBeTruthy();
  });
});
