import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs/internal/observable/of';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { UserService } from 'src/app/services/user.service';

import { DownloadDocumentsComponent } from './download-documents.component';

describe('DownloadDocumentsComponent', () => {
  let component: DownloadDocumentsComponent;
  let fixture: ComponentFixture<DownloadDocumentsComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['downloadFiles']);

  const response = {
    size: 13318,
    type: "application/octet-stream"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadDocumentsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AppMaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
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
      providers:[
        { provide: UserService, useValue: mockUserService },
      ]
    })
      .compileComponents();
      mockUserService.downloadFiles.and.returnValue(of(response));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('previewDocument IdentificationCard1', () => {
    component.dataFiles = {
      bankcertificate: '123465',
      identificationcard1: '123465',
      identificationcard2: '123465',
      rut: '123465',
    }
    component.data = {
      address: '',
      bank: '',
      bankAccountNumber: '',
      cellphone: '',
      createdondate: '',
      department: '',
      email: '',
      firstNames: '',
      firstsale: '',
      idclicker: '',
      identification: '',
      isEmployeeGrupoExito: '',
      lastNames: '',
      lastSale: '',
      municipality: '',
      receiveCommunications: '',
      responseaccountbank: '',
      score: '',
      state: '',
      stateId: 1,
      totalCommissions: 1,
      totalSales: 1,
      typeBankAccount: '',
      userId: 1,
      verified: '',
      bankcertificate: '',
      id: 1,
      identificationcard1: '',
      identificationcard2: '',
      maxdatebankcertificate: '',
      maxdateidentificationcard1: '',
      maxdateidentificationcard2: '',
      maxdaterut: '',
      maxextensiondatebankcertificate: '',
      maxextensiondateidentificationcard1: '.jpg',
      maxextensiondateidentificationcard2: '',
      maxextensiondaterut: '',
      mindatebankcertificate: '',
      mindateidentificationcard1: '',
      mindateidentificationcard2: '',
      mindaterut: '',
      rut: '',
    }
    component.previewDocument('IdentificationCard1');
    expect(component.data.maxextensiondateidentificationcard1).toContain('.jpg');
  });

  it('previewDocument IdentificationCard1 no document', () => {
    component.dataFiles = {
      bankcertificate: '123465',
      identificationcard1: '',
      identificationcard2: '123465',
      rut: '123465',
    }
    component.data = {
      address: '',
      bank: '',
      bankAccountNumber: '',
      cellphone: '',
      createdondate: '',
      department: '',
      email: '',
      firstNames: '',
      firstsale: '',
      idclicker: '',
      identification: '',
      isEmployeeGrupoExito: '',
      lastNames: '',
      lastSale: '',
      municipality: '',
      receiveCommunications: '',
      responseaccountbank: '',
      score: '',
      state: '',
      stateId: 1,
      totalCommissions: 1,
      totalSales: 1,
      typeBankAccount: '',
      userId: 1,
      verified: '',
      bankcertificate: '',
      id: 1,
      identificationcard1: '',
      identificationcard2: '',
      maxdatebankcertificate: '',
      maxdateidentificationcard1: '',
      maxdateidentificationcard2: '',
      maxdaterut: '',
      maxextensiondatebankcertificate: '',
      maxextensiondateidentificationcard1: '',
      maxextensiondateidentificationcard2: '',
      maxextensiondaterut: '',
      mindatebankcertificate: '',
      mindateidentificationcard1: '',
      mindateidentificationcard2: '',
      mindaterut: '',
      rut: '',
    }
    component.previewDocument('IdentificationCard1');
    expect(component.data.maxextensiondateidentificationcard1).toBe('');
  });


  it('previewDocument IdentificationCard2', () => {
    component.dataFiles = {
      bankcertificate: '123465',
      identificationcard1: '123465',
      identificationcard2: '123465',
      rut: '123465',
    }
    component.data = {
      address: '',
      bank: '',
      bankAccountNumber: '',
      cellphone: '',
      createdondate: '',
      department: '',
      email: '',
      firstNames: '',
      firstsale: '',
      idclicker: '',
      identification: '',
      isEmployeeGrupoExito: '',
      lastNames: '',
      lastSale: '',
      municipality: '',
      receiveCommunications: '',
      responseaccountbank: '',
      score: '',
      state: '',
      stateId: 1,
      totalCommissions: 1,
      totalSales: 1,
      typeBankAccount: '',
      userId: 1,
      verified: '',
      bankcertificate: '',
      id: 1,
      identificationcard1: '',
      identificationcard2: '',
      maxdatebankcertificate: '',
      maxdateidentificationcard1: '',
      maxdateidentificationcard2: '',
      maxdaterut: '',
      maxextensiondatebankcertificate: '',
      maxextensiondateidentificationcard1: '',
      maxextensiondateidentificationcard2: '.jpg',
      maxextensiondaterut: '',
      mindatebankcertificate: '',
      mindateidentificationcard1: '',
      mindateidentificationcard2: '',
      mindaterut: '',
      rut: '',
    }
    component.previewDocument('IdentificationCard2');
    expect(component.data.maxextensiondateidentificationcard2).toContain('.jpg');
  });

  it('previewDocument IdentificationCard2 no document', () => {
    component.dataFiles = {
      bankcertificate: '123465',
      identificationcard1: '123465',
      identificationcard2: '',
      rut: '123465',
    }
    component.data = {
      address: '',
      bank: '',
      bankAccountNumber: '',
      cellphone: '',
      createdondate: '',
      department: '',
      email: '',
      firstNames: '',
      firstsale: '',
      idclicker: '',
      identification: '',
      isEmployeeGrupoExito: '',
      lastNames: '',
      lastSale: '',
      municipality: '',
      receiveCommunications: '',
      responseaccountbank: '',
      score: '',
      state: '',
      stateId: 1,
      totalCommissions: 1,
      totalSales: 1,
      typeBankAccount: '',
      userId: 1,
      verified: '',
      bankcertificate: '',
      id: 1,
      identificationcard1: '',
      identificationcard2: '',
      maxdatebankcertificate: '',
      maxdateidentificationcard1: '',
      maxdateidentificationcard2: '',
      maxdaterut: '',
      maxextensiondatebankcertificate: '',
      maxextensiondateidentificationcard1: '',
      maxextensiondateidentificationcard2: '',
      maxextensiondaterut: '',
      mindatebankcertificate: '',
      mindateidentificationcard1: '',
      mindateidentificationcard2: '',
      mindaterut: '',
      rut: '',
    }
    component.previewDocument('IdentificationCard2');
    expect(component.data.maxextensiondateidentificationcard2).toBe('');
  });

  it('previewDocument BankCertificate', () => {
    component.dataFiles = {
      bankcertificate: '123465',
      identificationcard1: '123465',
      identificationcard2: '123465',
      rut: '123465',
    }
    component.data = {
      address: '',
      bank: '',
      bankAccountNumber: '',
      cellphone: '',
      createdondate: '',
      department: '',
      email: '',
      firstNames: '',
      firstsale: '',
      idclicker: '',
      identification: '',
      isEmployeeGrupoExito: '',
      lastNames: '',
      lastSale: '',
      municipality: '',
      receiveCommunications: '',
      responseaccountbank: '',
      score: '',
      state: '',
      stateId: 1,
      totalCommissions: 1,
      totalSales: 1,
      typeBankAccount: '',
      userId: 1,
      verified: '',
      bankcertificate: '',
      id: 1,
      identificationcard1: '',
      identificationcard2: '',
      maxdatebankcertificate: '',
      maxdateidentificationcard1: '',
      maxdateidentificationcard2: '',
      maxdaterut: '',
      maxextensiondatebankcertificate: '.jpg',
      maxextensiondateidentificationcard1: '',
      maxextensiondateidentificationcard2: '',
      maxextensiondaterut: '',
      mindatebankcertificate: '',
      mindateidentificationcard1: '',
      mindateidentificationcard2: '',
      mindaterut: '',
      rut: '',
    }
    component.previewDocument('BankCertificate');
    expect(component.data.maxextensiondatebankcertificate ).toContain('.jpg');
  });

  it('previewDocument BankCertificate no document', () => {
    component.dataFiles = {
      bankcertificate: '',
      identificationcard1: '123465',
      identificationcard2: '123456',
      rut: '123465',
    }
    component.data = {
      address: '',
      bank: '',
      bankAccountNumber: '',
      cellphone: '',
      createdondate: '',
      department: '',
      email: '',
      firstNames: '',
      firstsale: '',
      idclicker: '',
      identification: '',
      isEmployeeGrupoExito: '',
      lastNames: '',
      lastSale: '',
      municipality: '',
      receiveCommunications: '',
      responseaccountbank: '',
      score: '',
      state: '',
      stateId: 1,
      totalCommissions: 1,
      totalSales: 1,
      typeBankAccount: '',
      userId: 1,
      verified: '',
      bankcertificate: '',
      id: 1,
      identificationcard1: '',
      identificationcard2: '',
      maxdatebankcertificate: '',
      maxdateidentificationcard1: '',
      maxdateidentificationcard2: '',
      maxdaterut: '',
      maxextensiondatebankcertificate: '',
      maxextensiondateidentificationcard1: '',
      maxextensiondateidentificationcard2: '',
      maxextensiondaterut: '',
      mindatebankcertificate: '',
      mindateidentificationcard1: '',
      mindateidentificationcard2: '',
      mindaterut: '',
      rut: '',
    }
    component.previewDocument('BankCertificate');
    expect(component.data.maxextensiondatebankcertificate ).toBe('');
  });

  it('previewDocument rut', () => {
    component.dataFiles = {
      bankcertificate: '123465',
      identificationcard1: '123465',
      identificationcard2: '123465',
      rut: '123465',
    }
    component.data = {
      address: '',
      bank: '',
      bankAccountNumber: '',
      cellphone: '',
      createdondate: '',
      department: '',
      email: '',
      firstNames: '',
      firstsale: '',
      idclicker: '',
      identification: '',
      isEmployeeGrupoExito: '',
      lastNames: '',
      lastSale: '',
      municipality: '',
      receiveCommunications: '',
      responseaccountbank: '',
      score: '',
      state: '',
      stateId: 1,
      totalCommissions: 1,
      totalSales: 1,
      typeBankAccount: '',
      userId: 1,
      verified: '',
      bankcertificate: '',
      id: 1,
      identificationcard1: '',
      identificationcard2: '',
      maxdatebankcertificate: '',
      maxdateidentificationcard1: '',
      maxdateidentificationcard2: '',
      maxdaterut: '',
      maxextensiondatebankcertificate: '',
      maxextensiondateidentificationcard1: '',
      maxextensiondateidentificationcard2: '',
      maxextensiondaterut: '.jpg',
      mindatebankcertificate: '',
      mindateidentificationcard1: '',
      mindateidentificationcard2: '',
      mindaterut: '',
      rut: '',
    }
    component.previewDocument('Rut');
    expect(component.data.maxextensiondaterut).toContain('.jpg');
  });

  it('previewDocument BankCertificate no document', () => {
    component.dataFiles = {
      bankcertificate: '123456',
      identificationcard1: '123465',
      identificationcard2: '123456',
      rut: '',
    }
    component.data = {
      address: '',
      bank: '',
      bankAccountNumber: '',
      cellphone: '',
      createdondate: '',
      department: '',
      email: '',
      firstNames: '',
      firstsale: '',
      idclicker: '',
      identification: '',
      isEmployeeGrupoExito: '',
      lastNames: '',
      lastSale: '',
      municipality: '',
      receiveCommunications: '',
      responseaccountbank: '',
      score: '',
      state: '',
      stateId: 1,
      totalCommissions: 1,
      totalSales: 1,
      typeBankAccount: '',
      userId: 1,
      verified: '',
      bankcertificate: '',
      id: 1,
      identificationcard1: '',
      identificationcard2: '',
      maxdatebankcertificate: '',
      maxdateidentificationcard1: '',
      maxdateidentificationcard2: '',
      maxdaterut: '',
      maxextensiondatebankcertificate: '',
      maxextensiondateidentificationcard1: '',
      maxextensiondateidentificationcard2: '',
      maxextensiondaterut: '',
      mindatebankcertificate: '',
      mindateidentificationcard1: '',
      mindateidentificationcard2: '',
      mindaterut: '',
      rut: '',
    }
    component.previewDocument('Rut');
    expect(component.data.maxextensiondaterut ).toBe('');
  });

  it('previewDocument BankCertificate pdf', () => {
    component.dataFiles = {
      bankcertificate: '123456',
      identificationcard1: '123465',
      identificationcard2: '123456',
      rut: '123456',
    }
    component.data = {
      address: '',
      bank: '',
      bankAccountNumber: '',
      cellphone: '',
      createdondate: '',
      department: '',
      email: '',
      firstNames: '',
      firstsale: '',
      idclicker: '',
      identification: '',
      isEmployeeGrupoExito: '',
      lastNames: '',
      lastSale: '',
      municipality: '',
      receiveCommunications: '',
      responseaccountbank: '',
      score: '',
      state: '',
      stateId: 1,
      totalCommissions: 1,
      totalSales: 1,
      typeBankAccount: '',
      userId: 1,
      verified: '',
      bankcertificate: '',
      id: 1,
      identificationcard1: '',
      identificationcard2: '',
      maxdatebankcertificate: '',
      maxdateidentificationcard1: '',
      maxdateidentificationcard2: '',
      maxdaterut: '',
      maxextensiondatebankcertificate: '.pdf',
      maxextensiondateidentificationcard1: '.pdf',
      maxextensiondateidentificationcard2: '.pdf',
      maxextensiondaterut: '.pdf',
      mindatebankcertificate: '',
      mindateidentificationcard1: '',
      mindateidentificationcard2: '',
      mindaterut: '',
      rut: '',
    }
    component.previewDocument('IdentifiEcationCard1');
    component.previewDocument('identificationcard2 ');
    component.previewDocument('identificationcard2 ');
    component.previewDocument('Rut');
    expect(component.data.maxextensiondateidentificationcard1 ).toContain('.pdf');
    expect(component.data.maxextensiondateidentificationcard2 ).toContain('.pdf');
    expect(component.data.maxextensiondatebankcertificate ).toContain('.pdf');
    expect(component.data.maxextensiondaterut).toContain('.pdf');
  });

  it('change value true', () => {
    const event = {
      checked: true
    }
    component.changeValue(event, 'IdentifiEcationCard1')
    component.changeValue(event, 'IdentifiEcationCard2')
    expect(component.selectedFiles).toEqual([ 'IdentifiEcationCard1', 'IdentifiEcationCard2' ])
  });

  it('download select files', () => {
    component.data = {
      address: '',
      bank: '',
      bankAccountNumber: '',
      cellphone: '',
      createdondate: '',
      department: '',
      email: '',
      firstNames: '',
      firstsale: '',
      idclicker: '',
      identification: '',
      isEmployeeGrupoExito: '',
      lastNames: '',
      lastSale: '',
      municipality: '',
      receiveCommunications: '',
      responseaccountbank: '',
      score: '',
      state: '',
      stateId: 1,
      totalCommissions: 1,
      totalSales: 1,
      typeBankAccount: '',
      userId: 1,
      verified: '',
      bankcertificate: '',
      id: 1,
      identificationcard1: '',
      identificationcard2: '',
      maxdatebankcertificate: '',
      maxdateidentificationcard1: '',
      maxdateidentificationcard2: '',
      maxdaterut: '',
      maxextensiondatebankcertificate: '.pdf',
      maxextensiondateidentificationcard1: '.pdf',
      maxextensiondateidentificationcard2: '.pdf',
      maxextensiondaterut: '.pdf',
      mindatebankcertificate: '',
      mindateidentificationcard1: '2020-20-12',
      mindateidentificationcard2: '',
      mindaterut: '',
      rut: '',
    }
    component.selectedFiles = ['IdentifiEcationCard1'];
    component.downloadSelectedFiles();
    expect(mockUserService.downloadFiles).toHaveBeenCalled();
  });

  it('change value false', () => {
    const event = {
      checked: false
    }
    component.selectedFiles = ['IdentifiEcationCard1'];
    component.changeValue(event, 'IdentifiEcationCard1');
    expect(component.selectedFiles).toEqual([]);
  });


});
