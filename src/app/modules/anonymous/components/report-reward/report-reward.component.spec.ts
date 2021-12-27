import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

import { ReportRewardComponent } from './report-reward.component';

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

export class MockUserInfo {
  user = {
    aud: 'Estudiantes',
    documentType: 'Cédula de ciudadanía',
    exp: 1635458280,
    firstnames: 'ñañito',
    idclicker: 'ñañito77',
    identification: '1124587893',
    iss: 'practincanetcore.com',
    lastnames: 'betancur',
    role: 'CLICKER',
    userName: 'davidbet2@hotmail.com',
    userid: '77',
  };

  userInfo(){
    return this.user;
  }
}

fdescribe('ReportRewardComponent', () => {
  let component: ReportRewardComponent;
  let fixture: ComponentFixture<ReportRewardComponent>;

  const matDialog = new MatDialogMock();

  const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRewardComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatDialog, useValue: matDialog },
        { provide: TokenService, useClass: MockUserInfo },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
