import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';


import { HelpCenterGroupComponent } from './help-center-group.component';

describe('HelpCenterGroupComponent', () => {
  let component: HelpCenterGroupComponent;
  let fixture: ComponentFixture<HelpCenterGroupComponent>;

  const dialogMock = {
    close: () => {},
  };

  const mockDialog = jasmine.createSpyObj("MatDialog", ["open", "closeAll"]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpCenterGroupComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      schemas:[
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpCenterGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
