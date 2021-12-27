import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenService } from 'src/app/services/token.service';

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

  userInfo(){
    return this.user;
  }
}

fdescribe('SalesInfoComponent', () => {
  let component: SalesInfoComponent;
  let fixture: ComponentFixture<SalesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesInfoComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: TokenService, useClass: MockUserInfo },
      ]
    })
    .compileComponents();
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
