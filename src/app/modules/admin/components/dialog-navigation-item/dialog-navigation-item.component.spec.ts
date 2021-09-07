import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ContentService } from 'src/app/services/content.service';
import { DialogNavigationItemComponent } from './dialog-navigation-item.component';
import { of } from 'rxjs/internal/observable/of';
import { ListIcons } from 'src/app/services/icons';

describe('DialogNavigationItemComponent', () => {
  let component: DialogNavigationItemComponent;
  let fixture: ComponentFixture<DialogNavigationItemComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['saveFooterLink']);
  const dialogMock = {
    close: () => {},
  };
  const resp = {
    state: 'Success',
    userMessage: 'Se ha creado el enlace',
    objectResponse: [],
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNavigationItemComponent],
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
        ListIcons,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: ContentService, useValue: mockContentService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    mockContentService.saveFooterLink.and.returnValue(of(resp));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNavigationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add navigation item', () => {
    component.data = { edit: 0, orderby: 1 };
    component.dateForm.controls.description.setValue('Nuevo enlace');
    component.saveItem();
    expect(mockContentService.saveFooterLink).toHaveBeenCalled();
  });

  it('onNoClick', () => {
    component.onNoClick;
    expect(component).toBeTruthy();
  });

  it('loadSection', () => {
    component.loadItem;
    expect(component).toBeTruthy();
  });
});
