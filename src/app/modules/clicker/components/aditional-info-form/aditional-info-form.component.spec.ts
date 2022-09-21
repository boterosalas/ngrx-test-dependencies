import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AditionalInfoFormComponent } from './aditional-info-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs/internal/observable/of';
import { MasterDataService } from 'src/app/services/master-data.service';
import { BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';

describe('AditionalInfoFormComponent', () => {
  let component: AditionalInfoFormComponent;
  let fixture: ComponentFixture<AditionalInfoFormComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['getBasicData', 'updateUser', 'userInfo$']);

  const mockMasterDataService = jasmine.createSpyObj('MasterDataService', ['getDepartments', 'getBanks']);

  let dataBanks = {
    state: 'Success',
    userMessage: '',
    objectResponse: [
      {
        Id: 1,
        code: 'BANCOLOMBIA',
        description: ' Bancolombia',
      },
      {
        Id: 2,
        code: 'DAVIVIENDA',
        description: ' Davivienda',
      },
    ],
  };

  let basicData = {
    EducationLevel: [
      { id: 55, code: 'EducationLevel', description: 'Bachillerato' },
      { id: 56, code: 'EducationLevel', description: 'Técnico' },
      { id: 57, code: 'EducationLevel', description: 'Tecnólogo' },
      { id: 58, code: 'EducationLevel', description: 'Pregrado' },
      { id: 59, code: 'EducationLevel', description: 'Postgrado' },
    ],
    FixedIncome: [
      { id: 60, code: 'FixedIncome', description: 'Menos de 1.000.000' },
      {
        id: 61,
        code: 'FixedIncome',
        description: 'Entre 1.000.000 y 2.500.000',
      },
      {
        id: 62,
        code: 'FixedIncome',
        description: 'Entre 2.500.001 y 5.000.000',
      },
      { id: 63, code: 'FixedIncome', description: 'Mas de 5.000.000' },
    ],
    TypeHousing: [
      { id: 64, code: 'TypeHousing', description: 'Arrendada' },
      { id: 65, code: 'TypeHousing', description: 'Familiar' },
      { id: 66, code: 'TypeHousing', description: 'Propiedad hipotecada' },
      { id: 67, code: 'TypeHousing', description: 'Otra' },
      { id: 68, code: 'TypeHousing', description: 'Propiedad libre' },
    ],
    Mobility: [
      { id: 69, code: 'Mobility', description: 'Caminar' },
      { id: 70, code: 'Mobility', description: 'Bicicleta' },
      { id: 71, code: 'Mobility', description: 'Carro' },
      { id: 72, code: 'Mobility', description: 'Moto' },
      { id: 73, code: 'Mobility', description: 'Transporte público' },
    ],
    Occupation: [
      { id: 74, code: 'Occupation', description: 'Estudiante' },
      {
        id: 75,
        code: 'Occupation',
        description: 'Empresario / Profesional independiente',
      },
      {
        id: 76,
        code: 'Occupation',
        description: 'Empleado contrato termino indefinido',
      },
      {
        id: 77,
        code: 'Occupation',
        description: 'Empleado contrato termino definido',
      },
      { id: 78, code: 'Occupation', description: 'Desempleado' },
    ],
    MaritalStatus: [
      { id: 79, code: 'MaritalStatus', description: 'Casado' },
      { id: 80, code: 'MaritalStatus', description: 'Soltero' },
      { id: 81, code: 'MaritalStatus', description: 'Unión libre' },
      { id: 82, code: 'MaritalStatus', description: 'Divorciado' },
      { id: 83, code: 'MaritalStatus', description: 'Viudo' },
      { id: 84, code: 'MaritalStatus', description: 'Otro' },
    ],
    Gender: [
      { id: 85, code: 'Gender', description: 'Hombre' },
      { id: 86, code: 'Gender', description: 'Mujer' },
      { id: 87, code: 'Gender', description: 'Indistinto' },
    ],
  };

  let dataUser = {
    userId: 5277,
    email: 'eisner.puerta@pragma.com.co',
    firstNames: 'Eisner Camilo',
    lastNames: 'Puertas Carrillos',
    identification: '1050955208',
    cellphone: '3105009040',
    password: 'RXBjMTUyNygpOw==',
    idType: 1,
    stateId: 5,
    state: null,
    isEmployeeGrupoExito: false,
    verified: false,
    fileIdentificationCard1: '',
    fileIdentificationCard2: '',
    fileBankCertificate: '',
    bank: 'Bancolombia',
    typeBankAccount: 'Ahorros',
    bankAccountNumber: 'MTIzNDU2',
    receiveCommunications: true,
    address: 'Calle 2 #3 55-57',
    department: '5',
    municipality: '5001',
    acceptHabeasData: true,
    acceptTerms: true,
    educationlevel: 1259,
    fixedIncome: 1264,
    otherIncome: 2000000,
    numberPeopleLive: 3,
    dependents: 3,
    typeHousing: 1268,
    stratum: 5,
    mobility: 1273,
    occupation: 1281,
    maritalStatus: 1285,
    birthDate: '1990-11-26',
    gender: 1289,
    dateLastUpdate: '2019-12-10T18:30:16.368Z',
  };

  const resp = {
    state: 'Success',
    userMessage: 'se ha actualizado el email',
    objectResponse: [],
  };

  const routes = {
    path: 'inicio',
    component: HomeComponent,
  }

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AditionalInfoFormComponent],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([routes]),
        BrowserAnimationsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            allowedDomains: [],
            disallowedRoutes: [],
          },
        }),
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: MasterDataService, useValue: mockMasterDataService },
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
    mockUserService.getBasicData.and.returnValue(of(basicData));
    mockUserService.updateUser.and.returnValue(of(dataUser));
    mockMasterDataService.getBanks.and.returnValue(of(dataBanks));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AditionalInfoFormComponent);
    component = fixture.componentInstance;
    component.user.userInfo$ = new BehaviorSubject<any>({
      birthDate: '12/12/12',
      maritalStatusOb: { id: '2', description: 'casado' },
      genderOb: { id: '1', description: 'Masculino' },
      educationLevelOb: { id: '1', description: 'Bachiller' },
      occupationOb: { id: '1', description: 'prueba' },
      fixedIncomeOb: { id: '1', description: '1' },
      otherIncome: '11',
      stratumOb: { id: 1, description: 'otros' },
      typeHousingOb: { id: '1', description: 'propia' },
      numberPeopleLiveOb: { id: '1', description: 'personas' },
      dependantOb: { id: '1', description: 'personas' },
      mobilityOb: { id: '1', description: 'Bus' },
      address: 'calle falsa 123',
      receiveCommunications: true,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get basic data', () => {
    let service = fixture.debugElement.injector.get(UserService);
    component.getBasicData();
    expect(service.getBasicData).toHaveBeenCalled();
  });

  it('edit info', () => {
    let service = fixture.debugElement.injector.get(UserService);
    component.editInfo();
    expect(service.updateUser).toHaveBeenCalled();
  });

});
