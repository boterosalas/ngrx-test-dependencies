import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';
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

  userInfo() {
    return this.user;
  }
}

describe('ReportRewardComponent', () => {
  let component: ReportRewardComponent;
  let fixture: ComponentFixture<ReportRewardComponent>;

  const matDialog = new MatDialogMock();

  const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

  const mockLinksService = jasmine.createSpyObj('LinksService', ['getReportUser']);

  const infoMonth = {
    objectResponse: {
      money: {
        accumulated: 0,
        cutOffValue: 0,
        detailAccumulated: null,
        detailCutOff: null,
        detailRejected: [
          {
            commissionGenerationDate: '2020-04-08T15:40:30.69',
            commissionValue: 249,
            paymentDate: '2021-03-31T00:00:00',
            productName: 'AUDIFONOS',
            quantity: 1,
            statusCommission: 'Rechazado',
          },
        ],
        rejected: 249,
      },
      generalResume: {
        isSaver: false
      }
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportRewardComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatDialog, useValue: matDialog },
        { provide: TokenService, useClass: MockUserInfo },
        { provide: LinksService, useValue: mockLinksService },
      ],
    }).compileComponents();
    mockLinksService.getReportUser.and.returnValue(of(infoMonth));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('commissions', () => {
    let case1 = "commissions";
    component.break(case1);
    expect(case1).toBe('commissions');
  });

  it('balance', () => {
    let case2 = "balance";
    component.break(case2);
    expect(case2).toBe('balance');
  });

  it('rejected-commissions', () => {
    let case3 = "rejected-commissions";
    component.break(case3);
    expect(case3).toBe('rejected-commissions');
  });
  

});
