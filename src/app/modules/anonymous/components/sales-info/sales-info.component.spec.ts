import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

import { SalesInfoComponent } from './sales-info.component';

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

describe('SalesInfoComponent', () => {
  let component: SalesInfoComponent;
  let fixture: ComponentFixture<SalesInfoComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['getuserdata']);

  const mockLinksService = jasmine.createSpyObj('LinksService', ['getReportUser']);

  const infoMonth = {
    objectResponse: {
      generalResume: {
        conversionRate: 0.1,
        totalCommissions: 20249,
        totalLinks: 1022,
        totalProducts: 3,
      },
    }
  };

  const user = {
    firstnames: 'David',
    lastnames: 'Betancur',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesInfoComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: TokenService, useClass: MockUserInfo },
        { provide: UserService, useValue: mockUserService },
        { provide: LinksService, useValue: mockLinksService },
      ],
    }).compileComponents();
    mockUserService.getuserdata.and.returnValue(of(user));
    mockLinksService.getReportUser.and.returnValue(of(infoMonth));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
