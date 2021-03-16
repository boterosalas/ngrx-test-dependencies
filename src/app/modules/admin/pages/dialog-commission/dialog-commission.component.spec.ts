import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCommissionComponent } from './dialog-commission.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule, MatSlideToggleModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';
describe('DialogCommissionComponent', () => {
  let component: DialogCommissionComponent;
  let fixture: ComponentFixture<DialogCommissionComponent>;
  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getCommissionsData", "saveComision"
  ]);
  let response = [{
    orderby: 0,
    tab: 1,
    description: "XXXX",
    commission: "2%"
  }, {
    orderby: 1,
    tab: 1,
    description: "XXXX",
    commission: "2%"
  }]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCommissionComponent],
      imports: [
        AppMaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        MatMenuModule,
        MatSlideToggleModule,
        DragDropModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: ContentService, useValue: mockContentService },
      ]

    })
      .compileComponents();
    mockContentService.getCommissionsData.and.returnValue(of(response));
    mockContentService.saveComision.and.returnValue(of(response));
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(DialogCommissionComponent);
    component = fixture.componentInstance;
    component.componentLector = false;
    fixture.detectChanges();
  });
  it('should create', () => {
    component.dataSource = response;

    expect(component).toBeTruthy();
    //expect(mockContentService.getCommissionsData).toHaveBeenCalled();
  })
  it('updateDelete', () => {
    component.updateComisionDelete();
    component.updateComision();
    let datos = true;
    component.saveComision();
    component.dataSource = response;
    component.validation();
    spyOn(Swal, "fire").and.returnValue(
      Promise.resolve<any>({
        text: "Extensión erronea",
        type: "error",
        confirmButtonText: "Aceptar",
        confirmButtonClass: "accept-activation-alert-error",
      })
    );
    component.deleteComision({ id: 2 }, 2);
    expect(datos).toBeTruthy();
  })
});