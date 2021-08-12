import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { UtilsService } from 'src/app/services/utils.service';
import { AdminModule } from '../../admin.module';

import { DialogFaqItemComponent } from './dialog-faq-item.component';

describe('DialogFaqItemComponent', () => {
  let component: DialogFaqItemComponent;
  let fixture: ComponentFixture<DialogFaqItemComponent>;

  const dialogMock = {
    close: () => {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFaqItemComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        BrowserAnimationsModule,
        AppMaterialModule,
        AngularEditorModule,
        RouterTestingModule,
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
        UtilsService,
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFaqItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
