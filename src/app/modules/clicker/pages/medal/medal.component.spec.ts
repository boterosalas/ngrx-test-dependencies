import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalComponent } from './medal.component';
import { ClickerModule } from '../../clicker.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { UtilsService } from 'src/app/services/utils.service';

describe('MedalComponent', () => {
  let component: MedalComponent;
  let fixture: ComponentFixture<MedalComponent>;

  const mockUtilsService = jasmine.createSpyObj('UtilsService', ['medals']);

  let mockMedal = {
    classLevel: 'bronze',
    percent: 35,
    icon: '/assets/img/gamification/Icon-perfil-completo.svg',
    level: 'Bronce',
    title: 'Perfil Completo',
    nextLevel: 'Oro',
    titleMission: 'Completar tu perfil al 100%',
    banner: '/assets/img/gamification/banner-perfil-completo-pc.jpg',
    class: 'perfil-completo',
    missionDescription:
      'Así podamos hacer los pagos de forma correcta y podamos compartir contigo los productos y servicios mas afines a ti y así puedas ganar más dinero.',
    detail: [
      {
        icon: '/assets/img/gamification/Icon-cuenta.svg',
        title: 'Cuenta',
        description: 'Completa la información básica de tu cuenta',
        complete: true,
        progress: 5,
        totalProgress: 5,
      },
      {
        icon: '/assets/img/gamification/icon-informacion-bancaria.svg',
        title: 'Información Bancaria',
        description: 'Completa los datos bancarios para consignar tu comisión',
        complete: false,
        progress: 0,
        totalProgress: 9,
      },
      {
        icon: '/assets/img/gamification/icon-informacion-adicional.svg',
        title: 'Información Adicional',
        description: 'Completa esta información para el funcionamiento de tu cuenta',
        complete: false,
        progress: 4,
        totalProgress: 12,
      },
    ],
  };

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ClickerModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
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
      providers: [{ provide: UtilsService, useValue: mockUtilsService }],
    }).compileComponents();
    mockUtilsService.medals.and.returnValue(mockMedal);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
