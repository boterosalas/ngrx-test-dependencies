import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';
import { UserService } from 'src/app/services/user.service';

import { SavingComponent } from './saving.component';

export class MatDialogMock {
  close: () => {};
  closeAll() {
    return {
      closeAll: () => of(true),
    };
  }
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}

describe('SavingComponent', () => {
  let component: SavingComponent;
  let fixture: ComponentFixture<SavingComponent>;

  const matDialog = new MatDialogMock();
  const mockUserService = jasmine.createSpyObj('UserService', ['getReportsavers', 'saveSaver']);

  let resp = {
    state: 'Success',
    userMessage: 'correcto',
    objectResponse: true,
  };

  let getSaver = {
    state: 'Success',
    userMessage: '',
    objectResponse: [
      {
        isSaver: true,
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavingComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatDialog, useValue: matDialog },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();
    mockUserService.saveSaver.and.returnValue(of(resp));
    mockUserService.getReportsavers.and.returnValue(of(getSaver));
    fixture = TestBed.createComponent(SavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('saving', () => {
    component.savingAction();
    expect(mockUserService.saveSaver).toHaveBeenCalled();
  });

  it('saving modal', () => {
    component.saving();
    expect(component.templateSaving).toBeDefined();
  });

  it('cancel', () => {
    component.cancel();
    expect(component.savingToggle).toBeFalsy();
  });
});
